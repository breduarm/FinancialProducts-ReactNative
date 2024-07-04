import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = (): React.JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.icon} />
        <Text style={styles.title}>Banco</Text>
      </View>
      <View style={styles.divider}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 10,
    width: 10,
    backgroundColor: '#2B3B69',
  },
  title: {
    color: '#2B3B69',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  divider: {
    height: 2,
    backgroundColor: '#F1F2F7',
  },
});

export default Header;
