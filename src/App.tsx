import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {ProductsProvider} from './contexts/ProductsContext';

const App = (): React.JSX.Element => {
  return (
    <ProductsProvider>
      <AppNavigator />
    </ProductsProvider>
  );
};

export default App;
