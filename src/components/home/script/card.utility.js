export class Restaurant {
  constructor({
    name,
    id,
    address,
    tel,
    location,
    opening_hours,
    pictures,
    genres,
    price_range,
    rating,
  }) {
    this.name = name;
    this.id = id;
    this.address = address;
    this.tel = tel;
    this.location = location;
    this.opening_hours = opening_hours;
    this.pictures = pictures;
    this.genres = genres;
    this.price_range = price_range;
    this.rating = rating;
  }
}
