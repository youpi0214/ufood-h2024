import {RestaurantQueryOptions} from "@/api/api.utility";

export class Owner {
  constructor({email, id, name}) {
    this.email = email;
    this.id = id;
    this.name = name;
  }
}

export const extractUniqueAttributeListFromExistingList = (unfilteredList, filterAttribute) => {
  return unfilteredList.reduce((accumulator, currator) => {
    const existing = accumulator.find(
      (visitInAccumulator) => visitInAccumulator[filterAttribute] === currator[filterAttribute]
    );
    if (!existing) {
      accumulator.push(currator);
    }
    return accumulator;
  }, []);
};


// Because the API only allows to fetch limited items at a time, we need to fetch all the available data

export const getAllAvailableDataWithQueryFunction = async (queryFunction, functionParameters, queryQuantity) =>
{
  let updatedList = [];
  const [_, total] = await queryFunction(...functionParameters);
  const totalQueries = total / queryQuantity;

  for (let i = 0; i < totalQueries; i++) {
    const options = [
      [RestaurantQueryOptions.LIMIT, queryQuantity],
      [RestaurantQueryOptions.PAGE, i],
    ];
    const [instancelist, _] = await queryFunction(...functionParameters,options);
    for (let j = 0; j < instancelist.length; j++) {
      updatedList.push(instancelist[j]);
    }
  }
  return [updatedList, total];
}


