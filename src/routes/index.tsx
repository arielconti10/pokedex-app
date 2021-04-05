import React from 'react';

import { Home } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Pokemon from '../pages/Pokemon/Pokemon';

export type RouteParams = {
  Home: undefined;
  Pokemon: { pokemonName: string };
};

export type PokemonRouteProp = RouteProp<RouteParams, 'Pokemon'>;

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Moves" component={Home} />
      <Tabs.Screen name="Itens" component={Home} />
    </Tabs.Navigator>
  );
};

const Routes: React.FC = () => {
  const Router = createStackNavigator<RouteParams>();

  return (
    <NavigationContainer>
      <Router.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
      >
        <Router.Screen name="Tabs" component={TabNavigator} />
        <Router.Screen
          name="Pokemon"
          component={Pokemon}
          initialParams={{ pokemonName: '' }}
        />
      </Router.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
