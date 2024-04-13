import Cookies from "js-cookie";

const BASE_URL = "https://ufoodapi.herokuapp.com";

async function makeApiRequest(path, options) {
  const url = `${BASE_URL}${path}`;
  return fetch(url, options)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `HTTP status ${response.status}: ${response.statusText}`,
        );
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
    // Setting secure cookie attributes
    Cookies.set("token", user.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

//User logout
export const logout = async () => {
  try {
    await makeApiRequest("/logout", { method: "POST" });
    Cookies.remove("token", { secure: true, sameSite: "strict" });
    return "Successfully logged out";
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// User registration
export const signup = async (name, email, password) => {
  try {
    return await makeApiRequest("/signup", {
      method: "POST",
      body: new URLSearchParams({ name, email, password }),
    });
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

//Retrieve token-related user information
export const getTokenInfo = async (token) => {
  try {
    return await makeApiRequest("/tokenInfo", {
      method: "GET",
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error("Token info retrieval error:", error);
    throw error;
  }
};
