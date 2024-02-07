export type CustomError = {
  message: string;
  response: {
    data: {
      error: string;
    };
  };
};
