const BASE_URL = "https://ufoodapi.herokuapp.com//unsecure"; // Assuming your API base URL

export const getRestaurants = async (token, options = {}) => {
  const {
    limit = 10,
    page = 0,
    q = "",
    genres = "",
    price_range = "",
    lon = "",
    lat = "",
  } = options;
  const queryString = `?limit=${limit}&page=${page}&q=${encodeURIComponent(q)}&genres=${encodeURIComponent(genres)}&price_range=${encodeURIComponent(price_range)}&lon=${lon}&lat=${lat}`;
  const response = await fetch(`${BASE_URL}/restaurants${queryString}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
};

export const getRestaurantById = async (token, id) => {
  const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
};

export const getVisitsByRestaurantId = async (token, id, options = {}) => {
  const { limit = 10, page = 0 } = options;
  const queryString = `?limit=${limit}&page=${page}`;
  const response = await fetch(
    `${BASE_URL}/restaurants/${id}/visits${queryString}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return await response.json();
};

const restaurants = getRestaurants("", { limit: 10, page: 0, q: "burger" });
console.log(restaurants);
