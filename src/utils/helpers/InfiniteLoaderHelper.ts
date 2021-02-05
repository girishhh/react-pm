export const formatListData = <T>(list: T[], columnCount: number) => {
  const newList = [];
  let j = 0;
  for (let i = 0; i < Math.ceil(list.length / columnCount); i++) {
    const tmp = [];
    for (let k = 0; k < columnCount; j++, k++) {
      if (list[j]) tmp.push(list[j]);
    }
    newList.push(tmp);
  }
  console.log("NEW LIST", newList);
  return newList;
};
