/* eslint-disable */
import Cookies from "js-cookie";

const BASE_URL = "https://ufoodapi.herokuapp.com";

async function makeApiRequest(path, options) {
  const url = `${BASE_URL}${path}`;
  return fetch(url, options)
    .then(async (response) => {
      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("API request failed:", error);
      throw error;
    });
}

// User login
export const login = async (email, password) => {
  try {
    const user = await makeApiRequest("/login", {
      method: "POST",
      body: new URLSearchParams({ email, password }),
    });

    return [user.token, { name: user.name, email: user.email, id: user.id }];
  } catch (error) {
    throw error;
  }
};

//User logout
export const logout = async () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { Authorization: Cookies.get("token") },
  })
    .then(async (response) => {
      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      Cookies.remove("token");
      Cookies.remove("userName");
      Cookies.remove("userId");
      Cookies.remove("userEmail");
      return "Logged out successfully";
    })
    .catch((error) => {
      throw error;
    });
};

// User registration
export const signup = async (name, email, password) => {
  return await makeApiRequest("/signup", {
    method: "POST",
    body: new URLSearchParams({ name, email, password }),
  });
};

//Retrieve token-related user information
export const getTokenInfo = async (token) => {
  try {
    return await makeApiRequest("/tokenInfo", {
      method: "GET",
      headers: { Authorization: token },
    });
  } catch (error) {
    throw error;
  }
};
