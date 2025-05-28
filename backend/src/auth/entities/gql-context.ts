import { Request, Response } from 'express';

export interface GqlContext {
  req: Request & {
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
  res: Response;
}
