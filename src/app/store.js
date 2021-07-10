import {configureStore} from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';

// Configure Redux Store and pass postsReducer function to a field named posts
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
