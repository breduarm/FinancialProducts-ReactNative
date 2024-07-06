import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './navigation/AppNavigator';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return <AppNavigator />;
};

export default App;
