import { useState } from 'react';
import { Item, updateItem, deleteItem, itemsSelectors } from "../redux/itemsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import '../styles/GroceryItem.scss';

export default function GroceryItem({id, itemName, amount, units, checked: isChecked}: Item) {
  const checkedState = useAppSelector((state) => itemsSelectors.selectById(state, id))
  const checked = (checkedState)? checkedState.checked : false;

  console.log(itemName, amount, units, isChecked);
  const dispatch = useAppDispatch();

  const handleCheck = () => {
    dispatch(updateItem({id: id, itemName: itemName, amount: amount, units: units, checked: !checked}));
  }

  const handleTrash = () => {
    dispatch(deleteItem(id));
  }

  return (
    <div className={`groceryItem ${(checked) ? "checked" : ""}`}>
      <div className="container">
        <input type="checkbox" checked={checked} onChange={handleCheck}/>
        <div className="text">
          <div className={(checked)? "strikeText" : ""}>{itemName}</div>
          <div className="quantity">{amount} {units}</div>
        </div>
      </div>
      <div className="trash" onClick={handleTrash}>Delete</div>
    </div>
  );
}