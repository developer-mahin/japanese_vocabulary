export interface ZodIssue {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}

export interface ZodError extends Error {
  issues: ZodIssue[];
}

export type TErrorSources = {
  field: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
