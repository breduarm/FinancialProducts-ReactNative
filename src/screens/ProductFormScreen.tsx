import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import Spacer from '../components/Spacer';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Colors from '../theme/ColorSqueme';
import InputWithError from '../components/InputWithError';
import DatePicker from 'react-native-date-picker';
import ProductResponse from '../models/responses/ProductResponse';
import {addNewProduct} from '../services/ProductService';
import useProductsContext from '../hooks/useProductsContext';
import { formatDateToLocale, formatDateToYearMonthDay } from '../utils/dateUtils';

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

  const validateID = (value: string) => {
    let error = '';
    if (value.trim() === '') {
      error = 'Este campo es requerido';
    } else if (value.length < 3 || value.length > 10) {
      error = 'Mínimo 3 caracteres, máximo 10';
    } else if (false) {
      error = 'ID no válido';
    }
    return error;
  };

  const validateName = (value: string) => {
    let error = '';
    if (value.trim() === '') {
      error = 'Este campo es requerido';
    } else if (value.length < 5 || value.length > 100) {
      error = 'Mínimo 5 caracteres, máximo 100';
    }
    return error;
  };

  const validateDescription = (value: string) => {
    let error = '';
    if (value.trim() === '') {
      error = 'Este campo es requerido';
    } else if (value.length < 10 || value.length > 200) {
      error = 'Mínimo 10 caracteres, máximo 200';
    }
    return error;
  };

  const validateLogo = (value: string) => {
    let error = '';
    if (value.trim() === '') {
      error = 'Este campo es requerido';
    }
    return error;
  };

  const validateReleaseDate = (value: string) => {
    const currentDate = new Date();
    const valueDate = new Date(value);
    let error = '';
    if (!valueDate) {
      error = 'Este campo es requerido';
    } else if (valueDate.valueOf() < currentDate.setHours(0, 0, 0, 0)) {
      error = 'La fecha debe ser igual o mayor a la fecha actual';
    }
    return error;
  };

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

      <PrimaryButton handleClick={handleSubmitForm} />

      <Spacer value={12} />

      <SecondaryButton handleClick={handleClearForm} />
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
