import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { NavDirections } from '../enums/NavDirections';
import NewProductScreen from '../screens/NewProductScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavDirections.HOME}>
        <Stack.Screen name={NavDirections.HOME} component={HomeScreen} />
        <Stack.Screen name={NavDirections.DETAIL} component={DetailScreen} />
        <Stack.Screen name={NavDirections.NEW_PRODUCT} component={NewProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
