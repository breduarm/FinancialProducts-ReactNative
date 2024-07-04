import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

const PrimaryButton = () => {
  return (
    <TouchableHighlight style={styles.container}>
      <Text style={styles.text}> Agregar </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#F9DE4A',
    },
    text: {
      fontWeight: '900',
      textTransform: 'capitalize',
    },
});

export default PrimaryButton;
