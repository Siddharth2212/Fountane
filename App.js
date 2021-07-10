import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {store} from './src/app/store';
import PostsList from './src/features/posts/PostsList';
import AddPostForm from './src/features/posts/AddPostForm';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Add Post') {
                iconName = focused ? 'pen-square' : 'pen-square';
              } else if (route.name === 'All Posts') {
                iconName = focused ? 'list' : 'list';
              }

              // Icon for each screen here
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Add Post" component={AddPostForm} />
          <Tab.Screen name="All Posts" component={PostsList} />
        </Tab.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
