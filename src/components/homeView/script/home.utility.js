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

  if (selectedPrice !== "All") {
    options.push([
      RestaurantQueryOptions.PRICE_RANGE,
      priceMapping[selectedPrice],
    ]);
  }

  // If no filters are applied, return an empty array
  if (options.length === 0) {
    return [];
  }
  return options;
}
