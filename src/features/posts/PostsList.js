import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {ListItem, Header} from 'react-native-elements';

const PostsList = () => {
  const posts = useSelector(state => state.posts);

  const keyExtractor = (_, index) => index.toString();

  // Render each item in the list
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
    <React.Fragment>
      <Header leftComponent={{text: 'Posts', style: {color: '#fff'}}} />
      <FlatList
        keyExtractor={keyExtractor}
        data={posts}
        renderItem={renderItem}
      />
    </React.Fragment>
  );
};

export default PostsList;
