import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

type ButtonProps = {
  handleClick: () => void,
}

const PrimaryButton = ({handleClick}: ButtonProps): React.JSX.Element => {
  return (
    <TouchableHighlight style={styles.container} onPress={handleClick}>
      <Text style={styles.text}> Agregar </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
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
