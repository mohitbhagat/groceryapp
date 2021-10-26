import React from 'react';
import react, { useState } from 'react';
import { addItem } from '../redux/itemsSlice';
import { useAppDispatch } from '../redux/hooks';
import '../styles/AddItem.scss';

export default function AddItem() {
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [units, setUnits] = useState("pcs");

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if(itemName === ""){
      return;
    }
    dispatch(addItem({id: -1, itemName: itemName, amount: amount, units: units, checked: false}));
    setItemName("");
    setAmount(0);
  } 

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className="addItem">
      <input className="itemName" onKeyPress={handleKeyPress} placeholder="Item name" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
      <input className="amount" onKeyPress={handleKeyPress} type="number" value={amount} min={0} onChange={(e) => setAmount(Number(e.target.value))}/>
      <select value={units} onChange={(e) => setUnits(e.target.value)}>
        <option value="pcs">pcs</option>
        <option value="L">L</option>
        <option value="mL">mL</option>
        <option value="g">g</option>
        <option value="kg">kg</option>
      </select>
      <div className="addItemButton" onClick={handleClick}>ENTER</div>
    </div>
  );
};
