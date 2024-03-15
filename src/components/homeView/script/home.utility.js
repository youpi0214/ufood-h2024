import { RestaurantQueryOptions } from "@/api/api.utility";

export function generateRestaurantFetchOptions(selectedCategory, selectedPrice, currentPage) {
  const priceMapping = {
    $: 1,
    $$: 2,
    $$$: 3,
  };
  const options = [];

  options.push([RestaurantQueryOptions.PAGE, currentPage]);

  // Check if selectedCategory is not "All"
  if (selectedCategory !== "All") {
    // Split the selectedCategory string into an array of categories
    const categories = selectedCategory.split(',').map(category => category.trim());
    // Filter out the "All" category and push the remaining categories into the options array
    const filteredCategories = categories.filter(category => category !== "All");
    if (filteredCategories.length > 0) {
      options.push([RestaurantQueryOptions.GENRES, filteredCategories]);
    }
  }

  // Check if selectedPrice is not "All"
  if (selectedPrice !== "All") {
    // Split the selectedPrice string into an array of prices
    const prices = selectedPrice.split(',').map(price => price.trim());
    // Filter out the "All" price and push the remaining prices into the options array
    const filteredPrices = prices.filter(price => price !== "All");
    if (filteredPrices.length > 0) {
      // Map the filtered prices to their corresponding numeric values using the priceMapping object
      const priceValues = filteredPrices.map(price => priceMapping[price]);
      options.push([RestaurantQueryOptions.PRICE_RANGE, priceValues]);
    }
  }

  // If no filters are applied, return an empty array
  if (options.length === 0) {
    return [];
  }
  return options;
}
