import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import DeleteProductModal from '../components/DeleteProductModal';
import Spacer from '../components/Spacer';
import SecondaryButton from '../components/SecondaryButton';
import ErrorButton from '../components/ErrorButton ';
import ProductResponse from '../models/responses/ProductResponse';
import Colors from '../theme/ColorSqueme';
import {deleteProductById} from '../services/ProductService';
import useProductsContext from '../hooks/useProductsContext';

const DetailScreen = ({route, navigation}): React.JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const product: ProductResponse = route.params;
  const {deleteProduct} = useProductsContext();

  const handleClick = () => {};

  const confirmDeleteProduct = async () => {
    setShowModal(false);
    try {
      const messageResponse: string = await deleteProductById(product.id);
      deleteProduct(product.id);
      navigation.goBack();
    } catch (e) {
      console.error(
        'There was a problem trying to delete a financial product id: ' + product.id,
        e,
      );
    }
  };

  return (
    <View style={styles.content}>
      <DeleteProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmDeleteProduct={confirmDeleteProduct}
      />
      <View style={{flex: 1}}>
        <Text style={[styles.text, styles.title]}>ID: {product.id}</Text>
        <Text style={[styles.text, styles.subtitle]}>Información extra</Text>

        <Spacer value={40} />

        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.label]}>Nombre</Text>
          <Text style={[styles.text, styles.value]}>{product.name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.label]}>Descripción</Text>
          <Text style={[styles.text, styles.value]}>{product.description}</Text>
        </View>

        <View style={styles.logoContainer}>
          <Text style={[styles.text, styles.logoText]}>Logo</Text>
          <Image style={styles.logo} source={{uri: product.logo}} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.label]}>Fecha liberación</Text>
          <Text style={[styles.text, styles.value]}>
            {product.date_release}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.label]}>Fecha revisión</Text>
          <Text style={[styles.text, styles.value]}>
            {product.date_revision}
          </Text>
        </View>
      </View>

      <Spacer value={24} />
      <SecondaryButton handleClick={handleClick} />

      <Spacer value={12} />
      <ErrorButton
        handleClick={() => {
          setShowModal(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 56,
    marginBottom: 32,
  },
  text: {
    color: Colors.primaryText,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  label: {
    flex: 1,
  },
  value: {
    fontWeight: '900',
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  logoText: {
    alignSelf: 'flex-start',
  },
  logo: {
    width: 200,
    height: 120,
  },
});

export default DetailScreen;
