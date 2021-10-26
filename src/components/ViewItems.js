import { useEffect } from 'react';
import { itemsSelectors, getItems } from "../redux/itemsSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import GroceryItem from "./GroceryItem";

export default function ViewItems() {
  const allItems = useAppSelector((state) => itemsSelectors.selectAll(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const checkedItems = allItems.filter((item) => item.checked);
  const uncheckedItems = allItems.filter((item) => !item.checked);
  const renderedCheckedItems = checkedItems.map((item) => {
    return (
      <GroceryItem
        id={item.id}
        itemName={item.itemName}
        amount={item.amount}
        units={item.units}
        checked={item.checked}
      />
    );
  });

  const renderedUncheckedItems = uncheckedItems.map((item) => {
    return (
      <GroceryItem
        id={item.id}
        itemName={item.itemName}
        amount={item.amount}
        units={item.units}
        checked={item.checked}
      />
    );
  });

  const seperatorDisplayValue = (checkedItems.length==0)? "none" : "block";

  return (
    <div>
      <div>
        {renderedUncheckedItems}
      </div>
      <div className="seperator" style={{
        display: seperatorDisplayValue,
        height: "2px",
        width: "70vw", margin: "auto",
        backgroundColor: "black",
      }}></div>
      <div>
        {renderedCheckedItems}
      </div>
    </div>
  );
}