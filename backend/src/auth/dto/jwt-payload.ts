export interface JwtPayload {
  sub: number;
  username: string; // optional or whatever fields you include in the token
}
