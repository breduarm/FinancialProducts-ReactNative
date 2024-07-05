import React, {useState} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

type InputWithErrorProps = {
  label: string;
  placeholder: string;
  value: any;
  onChangeText;
  validateInput?: (value) => string;
};

const InputWithError = ({
  label,
  placeholder,
  value,
  onChangeText,
  validateInput,
}: InputWithErrorProps): React.JSX.Element => {
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');

    const handleBlur = () => {
        setTouched(true);
        const validationError = validateInput ? validateInput(value) : '';
        setError(validationError);
      };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={handleBlur}
      />
      {touched && error && <Text style={styles.textError}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 8,
    fontWeight: '900',
    fontSize: 12,
    color: '#303034',
  },
  // This input has the same styles than the one in the Search
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ECECED',
    padding: 10,
    borderRadius: 4,
  },
  inputError: {
    borderColor: '#C32B1F',
  },
  textError: {
    marginVertical: 4,
    fontWeight: '700',
    fontSize: 10,
    color: '#C32B1F',
  },
});

export default InputWithError;
