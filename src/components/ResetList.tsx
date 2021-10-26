import { deleteAll } from '../redux/itemsSlice';
import { useAppDispatch } from '../redux/hooks';
import '../styles/ResetButton.scss';

export default function ResetList() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteAll());
  } 

  return (
    <div>
      <div className="resetListButton" onClick={handleClick}>RESET</div>
    </div>
  );
};
