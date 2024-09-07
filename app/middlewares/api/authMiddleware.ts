const validate = (token: any) => {
  const validToken = true;
  if (!validToken || !token) {
    return false;
  }
  return true;
};

export function authMiddleware(req: Request): any {
  const token = "bearer jkjkjkjkjkjkjk"; //For testing purposes
  console.log("Token: ", token);
  return { isValid: validate(token) };
}
