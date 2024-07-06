import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

type ButtonProps = {
  handleClick: () => void,
}

const SecondaryButton = ({handleClick}: ButtonProps): React.JSX.Element => {
  return (
    <TouchableHighlight style={styles.container} onPress={handleClick}>
      <Text style={styles.text}> Reiniciar </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#E9ECF2',
  },
  text: {
    color: '#2B3B69',
    fontWeight: '900',
    textTransform: 'capitalize',
  },
});

export default SecondaryButton;
