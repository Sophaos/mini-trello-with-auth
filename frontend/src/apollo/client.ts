import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { httpLink, errorLink, authLink } from "./links";

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
  credentials: "include",
});
