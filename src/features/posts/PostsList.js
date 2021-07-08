import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {ListItem} from 'react-native-elements';

const PostsList = () => {
  const posts = useSelector(state => state.posts);

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => (
    <ListItem key={item.id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.content.substring(0, 100)}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={posts}
      renderItem={renderItem}
    />
  );
};

export default PostsList;
