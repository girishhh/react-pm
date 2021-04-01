import { uniqBy } from "lodash";
import { FoodCategoryInterface } from "../../interfaces/FoodCategoryInterface";
import { MenuInterface } from "../../interfaces/MenuInterface";
import { RestaurentInterface } from "../../interfaces/RestaurentInterface";

const getCategories = (restaurentDetails: RestaurentInterface) => {
  let categories: FoodCategoryInterface[] = [];
  (restaurentDetails.activeMenu as MenuInterface).menuItems.map((menuItem) => {
    categories = categories.concat(menuItem.categories);
  });
  return uniqBy(categories, "_id");
};

export { getCategories };
