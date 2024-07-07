import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import Spacer from '../components/Spacer';
import Colors from '../theme/ColorSqueme';
import InputWithError from '../components/InputWithError';
import DatePicker from 'react-native-date-picker';
import ProductResponse from '../models/responses/ProductResponse';
import {addNewProduct} from '../services/ProductService';
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [reviewDate, setReviewDate] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);

  const {updateProducts} = useProductsContext();

  useEffect(() => {
    const startDate = new Date(releaseDate);
    const oneYearLater = startDate.setFullYear(startDate.getFullYear() + 1);
    setReviewDate(new Date(oneYearLater));
  }, [releaseDate]);

  const handleSubmitForm = useCallback(() => {
    const idError = validateID(id);
    const nameError = validateName(name);
    const descriptionError = validateDescription(description);
    const logoError = validateLogo(logo);
    const releaseDateError = validateReleaseDate(
      formatDateToLocale(releaseDate),
    );

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
            onChangeText={setID}
            validateInput={validateID}
          />

          <InputWithError
            label="Nombre"
            placeholder="Ingrese el nombre"
            value={name}
            onChangeText={setName}
            validateInput={validateName}
          />

          <InputWithError
            label="Descripción"
            placeholder="Ingrese una descripción"
            value={description}
            onChangeText={setDescription}
            validateInput={validateDescription}
          />

          <InputWithError
            label="Logo"
            placeholder="Agrege un logo"
            value={logo}
            onChangeText={setLogo}
            validateInput={validateLogo}
          />

          <InputWithError
            label="Fecha Liberación"
            placeholder="Ingrese la fecha de liberación"
            value={formatDateToLocale(releaseDate)}
            editable={false}
            isDatePicker={true}
            onChangeText={value => {
              setReleaseDate(new Date(value));
            }}
            onPress={() => {
              setShowDateModal(true);
            }}
            validateInput={validateReleaseDate}
          />

          <DatePicker
            date={releaseDate}
            onDateChange={setReleaseDate}
            mode="date"
            modal={true}
            open={showDateModal}
            onCancel={() => {
              setShowDateModal(false);
            }}
            onConfirm={(date: Date) => {
              setShowDateModal(false);
              setReleaseDate(date);
            }}
          />

          <InputWithError
            label="Fecha Revisión"
            placeholder="Ingrese la fecha de revisión"
            value={formatDateToLocale(reviewDate)}
            editable={false}
            onChangeText={setReviewDate}
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
