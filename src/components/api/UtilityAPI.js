import { getRestaurantById, getRestaurants } from "./restaurant.js";

export const Constants = {
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

/***********  request examples **********/

// get list of restaurants
const options = [[Constants.LIMIT, 15]];
const [restaurants, total] = await getRestaurants(options);

// console.log(total, restaurants);

// get restaurant by id
const id = "5f31fc7155d7790550c08b02";
const restaurant = await getRestaurantById(id);

console.log(restaurant);
