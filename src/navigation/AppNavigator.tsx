import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NavDirections } from '../enums/NavDirections';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductFormScreen from '../screens/ProductFormScreen';
import Colors from '../theme/ColorSqueme';
import { RootStackParamList } from './StackNavigatorTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name={NavDirections.PRODUCT_FORM}
          component={ProductFormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
