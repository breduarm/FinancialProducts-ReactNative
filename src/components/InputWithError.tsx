import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import Colors from '../theme/ColorSqueme';

type InputWithErrorProps = {
  label: string;
  placeholder: string;
  value: string;
  editable?: boolean;
  isDatePicker?: boolean;
  inputRef?: RefObject<TextInput>;
  nextInputRef?: RefObject<TextInput>;
  error?: string;
  setError?: Dispatch<SetStateAction<string>>;
  onChangeText?: Dispatch<SetStateAction<string>>;
  onPress?: () => void;
  validateInput?: (value: string) => string;
  setHasBeenTouched: Dispatch<SetStateAction<boolean>>;
};

const InputWithError = ({
  label,
  placeholder,
  value,
  editable,
  isDatePicker,
  inputRef,
  nextInputRef,
  error,
  setError,
  onChangeText,
  onPress,
  validateInput,
  setHasBeenTouched,
}: InputWithErrorProps): React.JSX.Element => {
  const handleBlur = async () => {
    setHasBeenTouched(true);
    const validationError = validateInput ? validateInput(value) : '';
    setError && setError(validationError);
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      {isDatePicker && !editable ? (
        <Pressable
          style={[styles.input, error ? styles.inputError : null]}
          onPress={onPress}>
          <Text>{value}</Text>
        </Pressable>
      ) : (
        <TextInput
          ref={inputRef}
          style={[styles.input, error ? styles.inputError : null]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          editable={editable}
          onSubmitEditing={() => nextInputRef?.current?.focus()}
        />
      )}
      {error && <Text style={styles.textError}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 8,
    fontWeight: '900',
    fontSize: 12,
    color: Colors.primaryText,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    borderRadius: 4,
  },
  inputError: {
    borderColor: Colors.error,
  },
  textError: {
    marginVertical: 4,
    fontWeight: '700',
    fontSize: 10,
    color: Colors.error,
  },
});

export default InputWithError;
