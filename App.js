import React from 'react';
import {View} from 'react-native';
import PostsList from './src/features/posts/PostsList';
import {store} from './src/app/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <PostsList />
      </View>
    </Provider>
  );
};

export default App;
