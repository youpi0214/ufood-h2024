const BASE_URL = "https://ufoodapi.herokuapp.com//unsecure"; // Assuming your API base URL

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  });
  return await response.json();
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
  });
  return await response.json();
};

export const signup = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  });
  return await response.json();
};

export const getTokenInfo = async (token) => {
  const response = await fetch(`${BASE_URL}/tokenInfo`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
};
