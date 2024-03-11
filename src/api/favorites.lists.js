const BASE_URL = 'https://ufoodapi.herokuapp.com/unsecure';

export const createFavoriteList = async (token, userId, listName) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: listName }),
  });
  return await response.json();
};

export const renameFavoriteList = async (token, listId, newName) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  });
  return await response.json();
};

export const addRestaurantToFavoriteList = async (token, listId, restaurantId) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId }),
  });
  return await response.json();
};

export const removeRestaurantFromFavoriteList = async (token, listId, restaurantId) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId }),
  });
  return await response.json();
};

export const deleteFavoriteList = async (token, listId) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
