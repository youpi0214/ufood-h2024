import {
  getRestaurantById,
  getRestaurants,
  getVisitsByRestaurantId,
} from "./restaurant.js";

export const RestaurantQueryOptions = {
  LIMIT: "limit",
  PAGE: "page",
  Q: "q",
  GENRES: "genres",
  PRICE_RANGE: "price_range",
  LON: "lon",
  LAT: "lat",
};

export const KEY = 0,
  VALUE = 1;

export const convertQueryOptionsToString = function (options) {
  let optionsResult = "";
  let index = 0;

  options.forEach((option) => {
    if (option !== null && option && option !== "undefined") {
      optionsResult += index === 0 ? "?" : "&";
      optionsResult += `${option[KEY]}=${option[VALUE]}`;
    }

    index++;
  }, this);

  return optionsResult;
};
