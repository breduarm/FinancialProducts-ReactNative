import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteProductModal from '../../src/components/DeleteProductModal';

describe('DeleteProductModal', () => {
  const setShowModalMock = jest.fn();
  const onConfirmDeleteProductMock = jest.fn();

  const defaultProps = {
    showModal: true,
    productName: 'Product name',
    setShowModal: setShowModalMock,
    onConfirmDeleteProduct: onConfirmDeleteProductMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal when showModal is true', () => {
    const expectedText = `¿Estás seguro de eliminar el producto ${defaultProps.productName}?`
    const { getByText } = render(<DeleteProductModal {...defaultProps} />);

    expect(getByText(expectedText)).toBeTruthy();
  });

  it('should close the modal when the close button is pressed', () => {
    const { getByText } = render(<DeleteProductModal {...defaultProps} />);

    fireEvent.press(getByText('X'));
    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });

  it('should call onConfirmDeleteProduct when the confirm button is pressed', () => {
    const { getByText } = render(<DeleteProductModal {...defaultProps} />);
    fireEvent.press(getByText('Confirmar'));

    expect(onConfirmDeleteProductMock).toHaveBeenCalled();
  });

  it('should close the modal when the cancel button is pressed', () => {
    const { getByText } = render(<DeleteProductModal {...defaultProps} />);
    fireEvent.press(getByText('Cancelar'));
    
    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });
});