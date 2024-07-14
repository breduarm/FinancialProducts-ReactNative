import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonStyles } from '../enums/ButtonStyles';
import Colors from '../theme/ColorSqueme';

type CustomButtonProps = {
  label: string;
  buttonStyle: ButtonStyles;
  handleClick: () => void;
};

const CustomButton = ({
  label,
  buttonStyle,
  handleClick,
}: CustomButtonProps): React.JSX.Element => {
  let containerStyle = {};
  let textStyle = {};
  switch (buttonStyle) {
    case ButtonStyles.Primary:
      containerStyle = styles.primaryContainer;
      textStyle = styles.primaryText;
      break;
    case ButtonStyles.Secondary:
      containerStyle = styles.secondaryContainer;
      textStyle = styles.secondaryText;
      break;
    case ButtonStyles.Error:
      containerStyle = styles.errorContainer;
      textStyle = styles.errorText;
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handleClick}
      testID="CustomButton">
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  primaryContainer: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    color: Colors.onPrimary,
  },
  secondaryContainer: {
    backgroundColor: Colors.secondary,
  },
  secondaryText: {
    color: Colors.onSecondary,
  },
  errorContainer: {
    backgroundColor: Colors.error,
  },
  errorText: {
    color: Colors.onError,
  },
});

export default CustomButton;
