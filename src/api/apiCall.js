import axios from 'axios';
import {BASE_URL} from './apiConstant';

// Create a new post by hitting the API call
export const addPost = async data => {
  try {
    const resp = await axios.post(`${BASE_URL}/posts`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Get all posts from the API call
export const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Filter  posts based on title from the API call
export const filterPosts = async searchQuery => {
  try {
    const response = await axios.get(
      `${BASE_URL}/posts?searchQuery=${searchQuery}`,
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
