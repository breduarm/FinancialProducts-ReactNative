import React, {Dispatch, SetStateAction} from 'react';
import {Modal, Pressable, StyleSheet, View, Text} from 'react-native';
import PrimaryButton from './PrimaryButton';
import Spacer from './Spacer';
import SecondaryButton from './SecondaryButton';

type DeleteProductModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteProductModal = ({
  showModal,
  setShowModal,
}: DeleteProductModalProps): React.JSX.Element => {
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.modalCloseButton}
            onPress={() => {
              setShowModal(false);
            }}>
            <Text style={{fontSize: 20, fontWeight: '900'}}>X</Text>
          </Pressable>
          <View style={styles.divider} />
          <Text style={styles.modalTitle}>
            ¿Estás seguro de eliminar el producto [titulo del producto]?
          </Text>
          <View style={styles.divider} />

          <View style={styles.modalButtonsContainer}>
            <PrimaryButton />
            <Spacer value={12} />
            <SecondaryButton />
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
    backgroundColor: 'white',
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
    backgroundColor: '#F1F2F7',
  },
});

export default DeleteProductModal;
