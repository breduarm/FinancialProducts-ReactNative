import React, {Dispatch, SetStateAction} from 'react';
import {Modal, Pressable, StyleSheet, View, Text, Button} from 'react-native';
import Spacer from './Spacer';
import Colors from '../theme/ColorSqueme';
import CustomButton from './CustomButton';
import {ButtonStyles} from '../enums/ButtonStyles';

type DeleteProductModalProps = {
  showModal: boolean;
  productName: string,
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onConfirmDeleteProduct: () => void;
};

const DeleteProductModal = ({
  showModal,
  productName,
  setShowModal,
  onConfirmDeleteProduct,
}: DeleteProductModalProps): React.JSX.Element => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Pressable style={styles.modalCloseButton} onPress={closeModal}>
            <Text style={{fontSize: 20, fontWeight: '900'}}>X</Text>
          </Pressable>
          <View style={styles.divider} />
          <Text style={styles.modalTitle}>
            ¿Estás seguro de eliminar el producto {productName}?
          </Text>
          <View style={styles.divider} />

          <View style={styles.modalButtonsContainer}>
            <CustomButton
              label="Confirmar"
              buttonStyle={ButtonStyles.Primary}
              handleClick={onConfirmDeleteProduct}
            />
            <Spacer value={12} />
            <CustomButton
              label="Cancelar"
              buttonStyle={ButtonStyles.Secondary}
              handleClick={closeModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCloseButton: {
    height: 44,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontWeight: '700',
    fontSize: 16,
    padding: 24,
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: Colors.background,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '100%',
    maxHeight: '50%',
  },
  modalButtonsContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.lightGray,
  },
});

export default DeleteProductModal;
