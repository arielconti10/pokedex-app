import React from 'react';

import { Home } from '../pages';

import { createStackNavigator } from '@react-navigation/stack';

const Routes: React.FC = () => {
  const Router = createStackNavigator();

  return (
    <Router.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Router.Screen name="Home" component={Home} />
    </Router.Navigator>
  );
};

export default Routes;
