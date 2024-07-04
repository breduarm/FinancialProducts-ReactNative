import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './components/Header';
import Search from './components/Search';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View >
          <Header />
          <View style={styles.content}>
            <Search />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'lightgreen',
  },
  content: {
    // backgroundColor: 'lightblue',
    marginHorizontal: 24,
    marginTop: 56,
  },
});

export default App;
