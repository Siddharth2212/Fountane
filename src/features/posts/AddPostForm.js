import React, {useState} from 'react';
import {View, TextInput, Alert} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {nanoid} from '@reduxjs/toolkit';
import {postAdded} from './postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const onTitleChanged = title => setTitle(title);
  const onContentChanged = value => setContent(value);

  const onSavePostClicked = () => {
    if (title && content) {
      // Dispatch postAdded action to redux when a new post is submitted
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        }),
      );

      //Reset the form once the post is submitted successfully
      setTitle('');
      setContent('');

      Alert.alert('Success!', 'Post added successfully');
    }
  };

  return (
    <View>
      <Header leftComponent={{text: 'Add Post', style: {color: '#fff'}}} />
      <View>
        <TextInput
          value={title}
          onChangeText={onTitleChanged}
          placeholder="Title"
        />
        <TextInput
          value={content}
          onChangeText={onContentChanged}
          placeholder="Content"
        />
        <Button onPress={onSavePostClicked} title="Add Post" />
      </View>
    </View>
  );
};

export default AddPostForm;
