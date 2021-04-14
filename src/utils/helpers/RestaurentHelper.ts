import { uniqBy } from "lodash";
import { FoodCategoryInterface } from "../../interfaces/FoodCategoryInterface";
import { MenuInterface } from "../../interfaces/MenuInterface";
import { RestaurentInterface } from "../../interfaces/RestaurentInterface";

const getCategories = (restaurentDetails: RestaurentInterface) => {
  let categories: FoodCategoryInterface[] = [];
  const activeMenu = restaurentDetails.activeMenu as MenuInterface;
  const menuItems = activeMenu?.menuItems;
  if (activeMenu && menuItems) {
    menuItems.map((menuItem) => {
      categories = categories.concat(menuItem.categories);
    });
    return uniqBy(categories, "_id");
  } else {
    return [];
  }
};

export { getCategories };
