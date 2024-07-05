import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

type ButtonProps = {
  handleClick: () => void,
}

const ErrorButton = ({handleClick}: ButtonProps): React.JSX.Element => {
  return (
    <TouchableHighlight style={styles.container} onPress={handleClick}>
      <Text style={styles.text}> Eliminar </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#C32B1F',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '900',
    textTransform: 'capitalize',
  },
});

export default ErrorButton;
