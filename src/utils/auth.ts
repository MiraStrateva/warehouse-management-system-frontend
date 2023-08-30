import { redirect } from "react-router-dom";

export function getTokenDuration(): number {
  const expirationDateText: string = localStorage.getItem("expiration") ?? "";
  const expirationDate: Date = new Date(expirationDateText);

  return expirationDate.getTime() - new Date().getTime();
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  return !getAuthToken() ? redirect("/login") : null;
}
