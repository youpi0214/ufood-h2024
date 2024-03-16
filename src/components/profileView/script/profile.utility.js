export class Owner {
  constructor({ email, id, name }) {
    this.email = email;
    this.id = id;
    this.name = name;
  }
}

export const filterUniqueRestaurantIds = (visitList) => {
  return visitList.reduce((accumulator, currator) => {
    const existing = accumulator.find(
      (visitInAccumulator) =>
        visitInAccumulator.restaurant_id === currator.restaurant_id,
    );
    if (!existing) {
      accumulator.push(currator);
    }
    return accumulator;
  }, []);
}
