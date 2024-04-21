import { RestaurantQueryOptions } from "@/api/api.utility";

export function generateRestaurantFetchOptions(
  selectedCategory,
  selectedPrice,
  currentPage,
) {
  const priceMapping = {
    $: 1,
    $$: 2,
    $$$: 3,
    $$$$: 4,
    $$$$$: 5,
  };
  const options = [];

  options.push([RestaurantQueryOptions.PAGE, currentPage]);

  // Check if selectedCategory is not empty
  if (selectedCategory !== "") {
    // Split the selectedCategory string into an array of categories
    const categories = selectedCategory
      .split(",")
      .map((category) => category.trim());
    if (categories.length > 0) {
      options.push([RestaurantQueryOptions.GENRES, categories]);
    }
  }

  // Check if selectedPrice is not empty
  if (selectedPrice !== "") {
    // Split the selectedPrice string into an array of prices
    const prices = selectedPrice.split(",").map((price) => price.trim());
    if (prices.length > 0) {
      // Map the filtered prices to their corresponding numeric values using the priceMapping object
      const priceValues = prices.map((price) => priceMapping[price]);
      options.push([RestaurantQueryOptions.PRICE_RANGE, priceValues]);
    }
  }

  // If no filters are applied, return an empty array
  if (options.length === 0) {
    return [];
  }
  return options;
}

export function formatRestaurantName(name) {
  if (name.length > 47) {
    const trimmedName = name.substring(0, 47);
    const lastDashIndex = trimmedName.lastIndexOf(" -");
    return lastDashIndex !== -1
      ? trimmedName.substring(0, lastDashIndex)
      : trimmedName;
  } else {
    return name;
  }
}
