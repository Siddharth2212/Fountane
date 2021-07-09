import {createSlice} from '@reduxjs/toolkit';

// Dummy data inserted
const initialState = [
  {id: '1', title: 'First Post!', content: 'Hello!'},
  {id: '2', title: 'Second Post', content: 'More text'},
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
});

// Exporting action creators
export const {postAdded} = postsSlice.actions;

export default postsSlice.reducer;
