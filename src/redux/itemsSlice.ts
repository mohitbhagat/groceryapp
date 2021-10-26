import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState, store } from './store';

//const API = "http://127.0.0.1:5000";
const API = "";

export type Item = {
  id: number,
  itemName: string,
  amount: number,
  units: string,
  checked: boolean
}

export const getItems = createAsyncThunk(
  'items/getItems',
  async () => {
    const response = await fetch(`${API}/items`);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async (item: Item) => {
    const response = await fetch(`${API}/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    });
    const data: any = await response.json()
    console.log(data);
    item.id = data["id"];
    console.log("Added item with id ", item.id);
    console.log(item);
    return item;
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async (item: Item) => {
    const response = await fetch(`${API}/update`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    }); 
    return item; 
  }
)

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: number) => {
    const response = await fetch(`${API}/delete`,{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    });
    return id;
  }
)

export const deleteAll = createAsyncThunk(
  'items/deleteall',
  async () => {
    await fetch(`${API}/deleteall`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
  }
)

const itemsAdapter = createEntityAdapter<Item>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => (a.id == b.id) ? 0 : ((a.id < b.id) ? 1 : -1)
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(),
  reducers: {
  },

  extraReducers: (builder) => {
    builder
    .addCase(getItems.fulfilled, (state, action) => {
      itemsAdapter.removeAll(state); 
      let itemsArray = [];
      for(let i = 0; i < action.payload["items"].length; i++) {
        let curItem = action.payload["items"][i];
        itemsArray.push({
          id: curItem[0],
          itemName: curItem[1],
          amount: curItem[2],
          units: curItem[3],
          checked: (curItem[4] == 0) ? false : true
        });
      }
      itemsAdapter.addMany(state, itemsArray);
    })
    .addCase(addItem.fulfilled, (state, action) => {
      console.log(action.payload);
      itemsAdapter.setOne(state, action.payload);
    })
    .addCase(updateItem.fulfilled, (state, action) => {
      itemsAdapter.setOne(state, action.payload);
    })
    .addCase(deleteItem.fulfilled, (state, action) => {
      itemsAdapter.removeOne(state, action.payload);
    })
    .addCase(deleteAll.fulfilled, (state) => {
      itemsAdapter.removeAll(state);
    })
  }
});

export const itemsSelectors = itemsAdapter.getSelectors<RootState>((state: RootState) => state.items);
export default itemsSlice.reducer;
