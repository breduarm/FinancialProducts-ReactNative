import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import {NavDirections} from '../enums/NavDirections';
import ProductFormScreen from '../screens/ProductFormScreen';
import Colors from '../theme/ColorSqueme';

const Stack = createNativeStackNavigator();

const AppNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={NavDirections.HOME}
        screenOptions={{
          title: 'Banco',
          headerTitleAlign: 'center',
          headerTintColor: Colors.onSecondary,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}>
        <Stack.Screen name={NavDirections.HOME} component={HomeScreen} />
        <Stack.Screen name={NavDirections.DETAIL} component={DetailScreen} />
        <Stack.Screen
          name={NavDirections.NEW_PRODUCT}
          component={ProductFormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
