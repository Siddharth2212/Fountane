import axios from 'axios';
import Config from 'react-native-config';

// Create a new post by hitting the API call
export const addPost = async data => {
  try {
    const resp = await axios.post(`${Config.API_HOST}/posts`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Get all posts from the API call
export const getPosts = async () => {
  try {
    const response = await axios.get(`${Config.API_HOST}/posts`);
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
      `${Config.API_HOST}/posts?searchQuery=${searchQuery}`,
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
