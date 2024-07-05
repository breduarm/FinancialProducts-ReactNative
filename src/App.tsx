import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Header from './components/Header';
import {AxiosResponse} from 'axios';
import axiosInstance from './configs/axiosConfig';
import Description from './components/Description';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './navigation/AppNavigator';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsUrl = '/bp/products';
        const response: AxiosResponse = await axiosInstance.get(productsUrl);
        const dataResponse = response.data;

        console.log('==== dataResponse: ', JSON.stringify(dataResponse));
      } catch (e) {
        console.error(
          'There was a problem trying to get financial products: ',
          e,
        );
      }
    };

    getProducts();
  }, []);

  return <AppNavigator />;
};

export default App;
