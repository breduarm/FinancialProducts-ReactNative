import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import InputWithError from '../../src/components/InputWithError';

describe('InputWithError', () => {
  const defaultProps = {
    label: 'Test Label',
    placeholder: 'Test Placeholder',
    value: '',
    error: '',
    setError: jest.fn(),
    onChangeText: jest.fn(),
    validateInput: jest.fn(),
    setHasBeenTouched: jest.fn(),
  };

  it('should render the component with given props', () => {
    const {getByText, getByPlaceholderText} = render(
      <InputWithError {...defaultProps} />,
    );

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByPlaceholderText('Test Placeholder')).toBeTruthy();
  });

  it('should show error when validation fails', () => {
    const validateInputMock = jest.fn().mockReturnValue('Error message');
    const props = {
      ...defaultProps,
      error: validateInputMock(),
      validateInput: validateInputMock,
      value: 'test',
    };

    const {getByText, getByPlaceholderText} = render(
      <InputWithError {...props} />,
    );
    const input = getByPlaceholderText('Test Placeholder');

    fireEvent(input, 'onBlur');

    expect(validateInputMock).toHaveBeenCalledWith('test');
    expect(getByText('Error message')).toBeTruthy();
  });

  it('should not show error when validation passes', () => {
    const validateInputMock = jest.fn().mockReturnValue('');
    const props = {
      ...defaultProps,
      validateInput: validateInputMock,
      value: 'test',
    };

    const {queryByText, getByPlaceholderText} = render(
      <InputWithError {...props} />,
    );
    const input = getByPlaceholderText('Test Placeholder');

    fireEvent(input, 'onBlur');

    expect(validateInputMock).toHaveBeenCalledWith('test');
    expect(queryByText('Error message')).toBeNull();
  });

  it('should call onPress when isDatePicker and not editable', () => {
    const onPressMock = jest.fn();
    const props = {
      ...defaultProps,
      isDatePicker: true,
      editable: false,
      value: 'test',
      onPress: onPressMock,
    };

    const {getByText} = render(<InputWithError {...props} />);
    const datePicker = getByText('test');

    fireEvent.press(datePicker);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('should update value when text is changed', () => {
    const onChangeTextMock = jest.fn();
    const props = {
      ...defaultProps,
      onChangeText: onChangeTextMock,
      value: 'test',
    };

    const {getByPlaceholderText} = render(<InputWithError {...props} />);
    const input = getByPlaceholderText('Test Placeholder');

    fireEvent.changeText(input, 'new value');

    expect(onChangeTextMock).toHaveBeenCalledWith('new value');
  });
});
