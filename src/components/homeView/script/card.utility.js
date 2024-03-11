export class Restaurant {
  constructor({ name, id, address, tel, location, opening_hours, pictures, genres, price_range, rating }) {
    this.name = name;
    this.id = id;
    this.address = address;
    this.tel = tel;
    this.location = location;
    this.openingHours = opening_hours;
    this.pictures = pictures;
    this.genres = genres;
    this.priceRange = price_range;
    this.rating = rating;
  }
}
