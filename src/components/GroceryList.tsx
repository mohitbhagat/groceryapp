import AddItem from './AddItem';
import ResetList from './ResetList';
import ViewItems from './ViewItems';

export default function GroceryList() {
  return (
    <div>
      <div className="listOptions">
        <ResetList/>
      </div>
      <div className="addItem">
        <AddItem />
      </div>
      <div>
        <ViewItems/>
      </div>
    </div>
  );
};
