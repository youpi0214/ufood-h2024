export class Restaurant {
  constructor({ name, id, pictures, genres, price_range, rating }) {
    this.name = name;
    this.id = id;
    this.pictures = pictures;
    this.genres = genres;
    this.priceRange = price_range;
    this.rating = rating;
  }
}
