import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import Spacer from '../components/Spacer';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Colors from '../theme/ColorSqueme';
import InputWithError from '../components/InputWithError';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../utils';

const NewProductScreen = (): React.JSX.Element => {
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [releaseDate, setReleaseDate] = useState(formatDate(new Date()));
  const [releaseDateStr, setReleaseDateStr] = useState(new Date());
  const [reviewDate, setReviewDate] = useState('');
  const [showDateModal, setShowDateModal] = useState(false);

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

  const handleModalReleaseDate = () => {
    setShowDateModal(true);
  }

  const handleSubmit = () => {
    const idError = validateID(id);
    const nameError = validateID(id);
    const descriptionError = validateID(id);
    const logoError = validateID(id);
    const releaseDateError = validateID(id);

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
      // TODO
    }
  };

  const handleClick = () => {};

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
            value={releaseDate}
            editable={false}
            isDatePicker={true}
            onChangeText={setReleaseDate}
            onPress={handleModalReleaseDate}
            validateInput={validateReleaseDate}
          />

          <DatePicker
            date={releaseDateStr}
            onDateChange={setReleaseDateStr}
            mode="date"
            modal={true}
            open={showDateModal}
            onCancel={() => {setShowDateModal(false)}}
            onConfirm={(date: Date) => {
              setShowDateModal(false);
              setReleaseDate(formatDate(date));
            }}
          />

          <InputWithError
            label="Fecha Revisión"
            placeholder="Ingrese la fecha de revisión"
            value={reviewDate}
            editable={false}
            onChangeText={setReviewDate}
          />
        </View>
      </ScrollView>

      <Spacer value={24} />

      <PrimaryButton handleClick={handleSubmit} />

      <Spacer value={12} />

      <SecondaryButton />
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

export default NewProductScreen;
