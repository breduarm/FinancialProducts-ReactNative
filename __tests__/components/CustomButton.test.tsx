import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import CustomButton from '../../src/components/CustomButton';
import {ButtonStyles} from '../../src/enums/ButtonStyles';
import Colors from '../../src/theme/ColorSqueme';

describe('CustomButton', () => {
  const testId = 'CustomButton';
  const defaultProps = {
    label: 'Test label',
    handleClick: jest.fn(),
  };

  it('should render primary button correctly', () => {
    const {getByTestId} = render(
      <CustomButton {...defaultProps} buttonStyle={ButtonStyles.Primary} />,
    );

    const touchableHighlight = getByTestId(testId);

    expect(touchableHighlight).toBeTruthy();
    expect(touchableHighlight.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: Colors.primary}),
      ]),
    );

    const {getByText} = render(
      <CustomButton {...defaultProps} buttonStyle={ButtonStyles.Primary} />,
    );

    const text = getByText(defaultProps.label);

    expect(text).toBeTruthy();
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: Colors.onPrimary}),
      ]),
    );
  });

  it('should render secondary button correctly', () => {
    const {getByTestId} = render(
      <CustomButton {...defaultProps} buttonStyle={ButtonStyles.Secondary} />,
    );

    const touchableHighlight = getByTestId(testId);

    expect(touchableHighlight).toBeTruthy();
    expect(touchableHighlight.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: Colors.secondary}),
      ]),
    );

    const {getByText} = render(
      <CustomButton {...defaultProps} buttonStyle={ButtonStyles.Secondary} />,
    );
    const button = getByText(defaultProps.label);

    expect(button).toBeTruthy();
    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: Colors.onSecondary}),
      ]),
    );
  });

  it('should render error button correctly', () => {
    const {getByTestId} = render(
        <CustomButton {...defaultProps} buttonStyle={ButtonStyles.Error} />,
    );

    const touchableHighlight = getByTestId(testId);

    expect(touchableHighlight).toBeTruthy();
    expect(touchableHighlight.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: Colors.error}),
      ]),
    );

    const {getByText} = render(
      <CustomButton {...defaultProps} buttonStyle={ButtonStyles.Error} />,
    );
    const button = getByText(defaultProps.label);

    expect(button).toBeTruthy();
    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: Colors.onError}),
      ]),
    );
  });

  it('should call handleClick when pressed', () => {
    const handleClickMock = jest.fn();
    const {getByText} = render(
      <CustomButton
        {...defaultProps}
        buttonStyle={ButtonStyles.Primary}
        handleClick={handleClickMock}
      />,
    );
    const button = getByText(defaultProps.label);

    fireEvent.press(button);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});
