import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {addNewPost, fetchPosts} from './postsSlice';

const AddPostForm = props => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  const onTitleChanged = value => setTitle(value);
  const onContentChanged = value => setBody(value);

  const canSave = [title, body].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');

        // Dispatch addNewPost thunk
        const resultAction = await dispatch(addNewPost({title, body}));
        unwrapResult(resultAction);
        setTitle('');
        setBody('');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        Alert.alert('Success', 'Post added successfully!');
        //Refresh posts after the post is added
        dispatch(fetchPosts());
        setAddRequestStatus('idle');
      }
    }
  };

  // Show spinner while we are waiting for the request
  if (addRequestStatus === 'pending') {
    return (
      <View style={styles.container}>
        <Header leftComponent={{text: 'Add Post', style: {color: '#fff'}}} />
        <View style={styles.spinnerContainer}>
          <View style={styles.loading}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        </View>
      </View>
    );
  }

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
          value={body}
          onChangeText={onContentChanged}
          placeholder="Content"
        />
        <Button onPress={onSavePostClicked} title="Add Post" />
      </View>
    </View>
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

export default AddPostForm;
