export const isEmpty = (value: string) => value.trim() === "";

export const isMinLength = (value: string, minLength: number) =>
  value.trim().length >= minLength;
  
export const isEmail = (value: string) => value.includes("@");
