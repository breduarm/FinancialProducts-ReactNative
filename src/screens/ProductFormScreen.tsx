import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import Spacer from '../components/Spacer';
import Colors from '../theme/ColorSqueme';
import InputWithError from '../components/InputWithError';
import DatePicker from 'react-native-date-picker';
import ProductResponse from '../models/responses/ProductResponse';
import {addNewProduct, verifyID} from '../services/ProductService';
import useProductsContext from '../hooks/useProductsContext';
import {formatDateToLocale, formatDateToYearMonthDay} from '../utils/dateUtils';
import {
  validateDescription,
  validateID,
  validateLogo,
  validateName,
  validateReleaseDate,
} from '../utils/formUtils';
import {ButtonStyles} from '../enums/ButtonStyles';
import CustomButton from '../components/CustomButton';

const ProductFormScreen = ({navigation}): React.JSX.Element => {
  const [id, setID] = useState('');
  const [idError, setIdError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [logo, setLogo] = useState('');
  const [logoError, setLogoError] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [releaseDateError, setReleaseDateError] = useState('');
  const [reviewDate, setReviewDate] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);

  const {updateProducts} = useProductsContext();

  useEffect(() => {
    const startDate = new Date(releaseDate);
    const oneYearLater = startDate.setFullYear(startDate.getFullYear() + 1);
    setReviewDate(new Date(oneYearLater));
  }, [releaseDate]);

  const verifyProductID = async (id: string) => {
    try {
      const wasAlreadyRegistered: boolean = await verifyID(id);
      const errorMessage = wasAlreadyRegistered ? 'ID no válido' : '';
      setIdError(errorMessage);
    } catch (e) {
      console.error('There was a problem trying to verify an id: ' + id, e);
      setIdError('ID no válido');
    }
  };

  const handleSubmitForm = useCallback(() => {
    if (
      idError ||
      nameError ||
      descriptionError ||
      logoError ||
      releaseDateError
    ) {
      Alert.alert(
        'Error al enviar el Formulario',
        'Por favor, revise la información ingresada y corrija los errores antes enviar el formulario',
      );
    } else {
      createProduct();
    }
  }, [id, name, description, logo, releaseDate]);

  const handleClearForm = () => {
    setID('');
    setName('');
    setDescription('');
    setLogo('');
    setReleaseDate(new Date());
  };

  const createProduct = async () => {
    try {
      const newProduct = new ProductResponse(
        id,
        name,
        description,
        logo,
        formatDateToYearMonthDay(releaseDate),
        formatDateToYearMonthDay(reviewDate),
      );
      const productResponse = await addNewProduct(newProduct);
      updateProducts(productResponse);
      navigation.goBack();
    } catch (e) {
      console.error(
        'There was a problem trying to create a financial product: ',
        e,
      );
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}>
        <View>
          <InputWithError
            label="ID"
            placeholder="Ingrese el ID"
            value={id}
            error={idError}
            setError={setIdError}
            onChangeText={setID}
            validateInput={validateID}
            onBlur={verifyProductID}
          />

          <InputWithError
            label="Nombre"
            placeholder="Ingrese el nombre"
            value={name}
            error={nameError}
            setError={setNameError}
            onChangeText={setName}
            validateInput={validateName}
          />

          <InputWithError
            label="Descripción"
            placeholder="Ingrese una descripción"
            value={description}
            error={descriptionError}
            setError={setDescriptionError}
            onChangeText={setDescription}
            validateInput={validateDescription}
          />

          <InputWithError
            label="Logo"
            placeholder="Agrege un logo"
            value={logo}
            error={logoError}
            setError={setLogoError}
            onChangeText={setLogo}
            validateInput={validateLogo}
          />

          <InputWithError
            label="Fecha Liberación"
            placeholder="Ingrese la fecha de liberación"
            value={formatDateToLocale(releaseDate)}
            error={releaseDateError}
            setError={setReleaseDateError}
            editable={false}
            isDatePicker={true}
            onPress={() => {
              setShowDateModal(true);
            }}
          />

          <DatePicker
            date={releaseDate}
            mode="date"
            modal={true}
            open={showDateModal}
            onCancel={() => {
              setShowDateModal(false);
            }}
            onConfirm={(date: Date) => {
              setShowDateModal(false);
              setReleaseDate(date);
              const error = validateReleaseDate(date);
              setReleaseDateError(error);
            }}
          />

          <InputWithError
            label="Fecha Revisión"
            placeholder="Ingrese la fecha de revisión"
            value={formatDateToLocale(reviewDate)}
            editable={false}
          />
        </View>
      </ScrollView>

      <Spacer value={24} />

      <CustomButton
        label="Enviar"
        buttonStyle={ButtonStyles.Primary}
        handleClick={handleSubmitForm}
      />

      <Spacer value={12} />

      <CustomButton
        label="Reiniciar"
        buttonStyle={ButtonStyles.Secondary}
        handleClick={handleClearForm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#303034',
    marginBottom: 24,
  },
});

export default ProductFormScreen;
