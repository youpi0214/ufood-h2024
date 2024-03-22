import { BASE_URL } from "./api.utility.js";

export const login = async (email, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: new URLSearchParams({ email: email, password: password }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to login");

      return response.json();
    })
    .then((user) => user) // attributes: email, name, token, id, followers [], following [], rating
    .catch((error) => console.error(error));
};

export const logout = async () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to logout");
      else return "Successfully logged out";
    })
    .catch((error) => console.error(error));
};

export const signup = async (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: new URLSearchParams({ name: name, email: email, password: password }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to signup");

      return response.json();
    })
    .then((newUser) => newUser) // attributes: email, name, id, followers [], following [], rating
    .catch((error) => console.error(error));
};

export const getTokenInfo = async (token) => {
  return fetch(`${BASE_URL}/tokenInfo`, {
    method: "GET",
    headers: { Authorization: token },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to get token info");

      return response.json();
    })
    .then((userLinkedToToken) => userLinkedToToken) // attributes: email, name, token, id, followers [], following [], rating
    .catch((error) => console.error(error));
};
