import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import Header from './components/Header';
import PrimaryButton from './components/PrimaryButton';
import Products from './components/Products';
import Search from './components/Search';
import Spacer from './components/Spacer';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header />
      <View style={styles.content}>
        <Search />
        <Spacer value={44} />
        <Products />
        <Spacer value={24} />
        <PrimaryButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 56,
    marginBottom: 32,
  },
});

export default App;
