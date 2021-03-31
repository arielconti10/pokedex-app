import React from 'react';

import { Home } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Pokemon from '../pages/Pokemon/Pokemon';

export type RouteParams = {
  Home: undefined;
  Pokemon: { pokemonName: string };
};

export type PokemonRouteProp = RouteProp<RouteParams, 'Pokemon'>;

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
        <Router.Screen name="Home" component={Home} />
        <Router.Screen
          name="Pokemon"
          component={Pokemon}
          initialParams={{ pokemon: '' }}
        />
      </Router.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
