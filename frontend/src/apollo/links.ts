import { ApolloLink, createHttpLink, Observable, type FetchResult } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export async function fetchNewAccessToken(): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation {
              refreshAccessToken
            }
          `,
      }),
    });
    const json = await response.json();
    const newToken = json?.data?.refreshAccessToken;
    accessToken = newToken;
    return newToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
}

export const authLink = new ApolloLink((operation, forward) => {
  if (accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }));
  }
  return forward(operation);
});

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const isUnauthenticated = graphQLErrors?.some((err) => err.extensions?.code === "UNAUTHENTICATED");

  if (isUnauthenticated) {
    return new Observable<FetchResult>((observer) => {
      (async () => {
        const newAccessToken = await fetchNewAccessToken();
        if (newAccessToken) {
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          }));
        }

        const subscriber = {
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        };

        forward(operation).subscribe(subscriber);
      })();
    });
  }

  return forward(operation);
});

export const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});
