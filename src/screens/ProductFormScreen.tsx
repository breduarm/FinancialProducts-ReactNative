import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../components/CustomButton';
import InputWithError from '../components/InputWithError';
import Spacer from '../components/Spacer';
import { ButtonStyles } from '../enums/ButtonStyles';
import { NavDirections } from '../enums/NavDirections';
import useProductsContext from '../hooks/useProductsContext';
import { ProductFormScreenProps } from '../navigation/StackNavigatorTypes';
import {
  addNewProduct,
  updateProductById,
  verifyID,
} from '../services/ProductService';
import Colors from '../theme/ColorSqueme';
import { ProductResponse } from '../types/responses/ProductReponse';
import { formatDateToLocale, formatDateToYearMonthDay } from '../utils/dateUtils';
import {
  validateDescription,
  validateID,
  validateLogo,
  validateName,
  validateReleaseDate,
} from '../utils/formUtils';

const ProductFormScreen = ({
  route,
  navigation,
}: ProductFormScreenProps): React.JSX.Element => {
  const product: ProductResponse | undefined = route?.params?.product;

  const [isToEdit] = useState(product !== undefined);
  const [id, setID] = useState(product ? product.id : '');
  const [idError, setIdError] = useState('');
  const [name, setName] = useState(product ? product.name : '');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState(
    product ? product.description : '',
  );
  const [descriptionError, setDescriptionError] = useState('');
  const [logo, setLogo] = useState(product ? product.logo : '');
  const [logoError, setLogoError] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [releaseDateError, setReleaseDateError] = useState('');
  const [reviewDate, setReviewDate] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);
  const [hasUserTouchedForm, setHasUserTouchedForm] = useState(false);

  const debounceRef = useRef<number | undefined>();
  const isIDFirstRender = useRef(true);
  const idInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const logoInputRef = useRef<TextInput>(null);

  const {addProduct, updateProduct} = useProductsContext();

  useEffect(() => {
    if (isToEdit) {
      return;
    }

    if (isIDFirstRender.current) {
      isIDFirstRender.current = false;
      return;
    }

    handleIDChange(id);
  }, [id]);

  useEffect(() => {
    const startDate = new Date(releaseDate);
    const oneYearLater = startDate.setFullYear(startDate.getFullYear() + 1);
    setReviewDate(new Date(oneYearLater));
  }, [releaseDate]);

  const verifyProductID = async (id: string) => {
    try {
      const idError = validateID(id);
      if (idError !== '') {
        setIdError(idError);
      } else {
        const wasAlreadyRegistered: boolean = await verifyID(id);
        const errorMessage = wasAlreadyRegistered ? 'ID no válido' : '';
        setIdError(errorMessage);
      }
    } catch (e) {
      console.log('There was a problem trying to verify an id: ' + id, e);
      setIdError('Hubo un problema al verificar el ID');
    }
  };

  const createProduct = async () => {
    try {
      const date_release = formatDateToYearMonthDay(releaseDate);
      const date_revision = formatDateToYearMonthDay(reviewDate);
      const newProduct: ProductResponse = {
        id,
        name,
        description,
        logo,
        date_release,
        date_revision,
      };
      const productResponse = await addNewProduct(newProduct);
      addProduct(productResponse);
      navigation.goBack();
    } catch (e) {
      console.error(
        'There was a problem trying to create a financial product: ',
        e,
      );
    }
  };

  const editProduct = async () => {
    try {
      const date_release = formatDateToYearMonthDay(releaseDate);
      const date_revision = formatDateToYearMonthDay(reviewDate);
      const editedProduct: ProductResponse = {
        id,
        name,
        description,
        logo,
        date_release,
        date_revision,
      };
      const messageResponse = await updateProductById(id, editedProduct);
      updateProduct(editedProduct);
      navigation.navigate(NavDirections.DETAIL, {product: editedProduct});
    } catch (e) {
      console.error(
        'There was a problem trying to edit a financial product: ',
        e,
      );
    }
  };

  const handleSubmitForm = () => {
    if (isToEdit) {
      validateFormToEditProduct();
    } else {
      validateFormToCreateProduct();
    }
  };

  const validateFormToCreateProduct = useCallback(() => {
    const newIdError = idError !== '' ? idError : validateID(id);
    const nameError = validateName(name);
    const descriptionError = validateDescription(description);
    const logoError = validateLogo(logo);
    const releaseDateError = validateReleaseDate(releaseDate);

    const isFormValid =
      hasUserTouchedForm &&
      newIdError === '' &&
      nameError === '' &&
      descriptionError === '' &&
      logoError === '' &&
      releaseDateError === '';

    if (isFormValid) {
      createProduct();
    } else {
      setIdError(newIdError);
      setNameError(nameError);
      setDescriptionError(descriptionError);
      setLogoError(logoError);
      setReleaseDateError(releaseDateError);

      Alert.alert(
        'Error al enviar el Formulario',
        'Por favor, revise la información ingresada y corrija los errores antes de enviar el formulario',
      );
    }
  }, [id, idError, name, description, logo, releaseDate, hasUserTouchedForm]);

  const validateFormToEditProduct = useCallback(() => {
    const nameError = validateName(name);
    const descriptionError = validateDescription(description);
    const logoError = validateLogo(logo);

    const isFormValid =
      hasUserTouchedForm &&
      nameError === '' &&
      descriptionError === '' &&
      logoError === '';

    if (isFormValid) {
      editProduct();
    } else {
      setNameError(nameError);
      setDescriptionError(descriptionError);
      setLogoError(logoError);

      const title = hasUserTouchedForm
        ? 'Error al enviar el Formulario'
        : 'Formulario de edición';
      const body = hasUserTouchedForm
        ? 'Por favor, revise la información ingresada y corrija los errores antes de enviar el formulario'
        : 'No se ha detectado cambios en el formulario';

      Alert.alert(title, body);
    }
  }, [name, description, logo, hasUserTouchedForm]);

  const handleClearForm = () => {
    setID('');
    setName('');
    setDescription('');
    setLogo('');
    setReleaseDate(new Date());
  };

  const debounce = (callback: () => void, delay: number) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(callback, delay);
  };

  const handleIDChange = useCallback((value: string) => {
    debounce(() => {
      verifyProductID(value);
    }, 500);
  }, []);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>
        {isToEdit ? 'Formulario de Edición' : 'Formulario de Registro'}
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}>
        <View>
          <InputWithError
            inputRef={idInputRef}
            nextInputRef={nameInputRef}
            label="ID"
            placeholder="Ingrese el ID"
            editable={!isToEdit}
            value={id}
            error={idError}
            onChangeText={setID}
            setHasBeenTouched={setHasUserTouchedForm}
          />

          <InputWithError
            inputRef={nameInputRef}
            nextInputRef={descriptionInputRef}
            label="Nombre"
            placeholder="Ingrese el nombre"
            value={name}
            error={nameError}
            setError={setNameError}
            onChangeText={setName}
            validateInput={validateName}
            setHasBeenTouched={setHasUserTouchedForm}
          />

          <InputWithError
            inputRef={descriptionInputRef}
            nextInputRef={logoInputRef}
            label="Descripción"
            placeholder="Ingrese una descripción"
            value={description}
            error={descriptionError}
            setError={setDescriptionError}
            onChangeText={setDescription}
            validateInput={validateDescription}
            setHasBeenTouched={setHasUserTouchedForm}
          />

          <InputWithError
            inputRef={logoInputRef}
            label="Logo"
            placeholder="Agrege un logo"
            value={logo}
            error={logoError}
            setError={setLogoError}
            onChangeText={setLogo}
            validateInput={validateLogo}
            setHasBeenTouched={setHasUserTouchedForm}
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
            setHasBeenTouched={setHasUserTouchedForm}
          />

          <DatePicker
            date={releaseDate}
            mode="date"
            modal={true}
            open={showDateModal}
            onCancel={() => {
              setHasUserTouchedForm(true);
              setShowDateModal(false);
            }}
            onConfirm={(date: Date) => {
              setHasUserTouchedForm(true);
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
            setHasBeenTouched={setHasUserTouchedForm}
          />
        </View>
      </ScrollView>

      <Spacer value={24} />

      <CustomButton
        label={isToEdit ? 'Editar' : 'Enviar'}
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
    color: Colors.primaryText,
    marginBottom: 24,
  },
});

export default ProductFormScreen;
