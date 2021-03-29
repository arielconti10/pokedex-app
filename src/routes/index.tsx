import React from 'react';

import { Home } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

const Routes: React.FC = () => {
  const Router = createStackNavigator();

  return (
    <NavigationContainer>
      <Router.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <Router.Screen name="Home" component={Home} />
      </Router.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
