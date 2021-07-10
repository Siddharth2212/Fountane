import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectAllPosts,
  selectFilteredPosts,
  fetchPosts,
  filterFetchedPosts,
} from './postsSlice';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ListItem, Header, SearchBar} from 'react-native-elements';
import {useDebounce} from 'use-debounce';

export const PostsList = () => {
  const dispatch = useDispatch();

  // Read posts data from the Redux store
  const posts = useSelector(selectAllPosts);
  const postsFromSearch = useSelector(selectFilteredPosts);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const [keyword, setKeyword] = useState('');

  // Debounce the search operation by 1.5 second
  const [value] = useDebounce(keyword, 1500);

  // fetch posts data when component mounts
  useEffect(() => {
    // only starting the fetch if the status is 'idle'
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // fetch posts data when component mounts
  useEffect(() => {
    // alert("Aegaeg");
    if (value.trim() !== '') {
      dispatch(filterFetchedPosts(value));
    }
  }, [value, dispatch]);

  // fetch all posts if search is cleared
  const onClearSearch = () => {
    dispatch(fetchPosts());
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <ListItem key={item.title} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.body}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  let content;

  if (postStatus === 'loading') {
    content = (
      <View style={styles.spinnerContainer}>
        <View style={styles.loading}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </View>
    );
  } else if (postStatus === 'succeeded') {
    // If posts from search exist show them otherwise show all posts
    const postsToShow = postsFromSearch.length > 0 ? postsFromSearch : posts;
    content = (
      <>
        <SearchBar
          onClear={onClearSearch}
          lightTheme
          placeholder="Type Here..."
          onChangeText={text => setKeyword(text)}
          value={keyword}
        />
        <FlatList
          keyExtractor={keyExtractor}
          data={postsToShow}
          renderItem={renderItem}
        />
      </>
    );
  } else if (postStatus === 'failed') {
    content = <Text>{error}</Text>;
  }

  return (
    <React.Fragment>
      <Header leftComponent={{text: 'All Posts', style: {color: '#fff'}}} />
      <View style={styles.container}>{content}</View>
    </React.Fragment>
  );
};

// Styles for loading spinner
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default PostsList;
