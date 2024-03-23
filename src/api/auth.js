// TODO remove this line and change all END_POINT to BASE_URL from api.utility.js when secure handling is implemented throughout the app
const END_POINT = "https://ufoodapi.herokuapp.com";

export const login = async (email, password) => {
  return fetch(`${END_POINT}/login`, {
    method: "POST",
    body: new URLSearchParams({ email: email, password: password }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to login");
      else if (response.status === 401)
        throw new Error("Invalid email or password");

      return response.json();
    })
    .then((user) => user) // attributes: email, name, token, id, followers [], following [], rating
    .catch((error) => error);
};
export const logout = async () => {
  return fetch(`${END_POINT}/logout`, {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to logout");
      else return "Successfully logged out";
    })
    .catch((error) => console.error(error));
};

export const signup = async (name, email, password) => {
  return fetch(`${END_POINT}/signup`, {
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
  return fetch(`${END_POINT}/tokenInfo`, {
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
