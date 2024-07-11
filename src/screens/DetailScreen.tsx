import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import DeleteProductModal from '../components/DeleteProductModal';
import Spacer from '../components/Spacer';
import {ButtonStyles} from '../enums/ButtonStyles';
import {NavDirections} from '../enums/NavDirections';
import useProductsContext from '../hooks/useProductsContext';
import ProductResponse from '../models/responses/ProductResponse';
import {DetailScreenProps} from '../navigation/StackNavigatorTypes';
import {deleteProductById} from '../services/ProductService';
import Colors from '../theme/ColorSqueme';

const DetailScreen = ({
  route,
  navigation,
}: DetailScreenProps): React.JSX.Element => {
  const product: ProductResponse = route.params.product;
  const {deleteProduct} = useProductsContext();

  const [showModal, setShowModal] = useState(false);
  const [imageSource, setImageSource] = useState(product.logo);

  const handleImageError = () => {
    setImageSource(
      'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    );
  };

  const handleEditProduct = () => {
    navigation.navigate(NavDirections.PRODUCT_FORM);
  };

  const confirmDeleteProduct = async () => {
    setShowModal(false);
    try {
      const messageResponse: string = await deleteProductById(product.id);
      deleteProduct(product.id);
      navigation.goBack();
    } catch (e) {
      console.error(
        'There was a problem trying to delete a financial product id: ' +
          product.id,
        e,
      );
    }
  };

  return (
    <View style={styles.content}>
      <DeleteProductModal
        showModal={showModal}
        productName={product.name}
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
          <Image
            style={styles.logo}
            source={{uri: imageSource}}
            onError={handleImageError}
          />
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
      <CustomButton
        label="Editar"
        buttonStyle={ButtonStyles.Secondary}
        handleClick={handleEditProduct}
      />

      <Spacer value={12} />
      <CustomButton
        label="Eliminar"
        buttonStyle={ButtonStyles.Error}
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
