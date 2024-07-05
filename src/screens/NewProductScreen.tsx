import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import Spacer from '../components/Spacer';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Colors from '../theme/ColorSqueme';
import InputWithError from '../components/InputWithError';

const NewProductScreen = (): React.JSX.Element => {
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [reviewDate, setReviewDate] = useState('');

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

          <View>
            <Text style={styles.label}>Logo</Text>
            <TextInput
              style={[styles.input, styles.inputError]}
              placeholder="Añada un logo"
            />
            <Text style={styles.textError}>Este campo es requerido!</Text>
          </View>

          <InputWithError
            label="Fecha Liberación"
            placeholder="Ingrese la fecha de liberación"
            value={releaseDate}
            onChangeText={setReleaseDate}
            validateInput={validateReleaseDate}
          />

          <InputWithError
            label="Fecha Revisión"
            placeholder="Ingrese la fecha de revisión"
            value={reviewDate}
            onChangeText={setReviewDate}
          />
        </View>
      </ScrollView>

      <Spacer value={24} />

      <PrimaryButton handleClick={handleClick} />

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
  label: {
    marginVertical: 8,
    fontWeight: '900',
    fontSize: 12,
    color: '#303034',
  },
  // This input has the same styles than the one in the Search
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ECECED',
    padding: 10,
    borderRadius: 4,
  },
  inputError: {
    borderColor: '#C32B1F',
  },
  textError: {
    marginVertical: 4,
    fontWeight: '700',
    fontSize: 10,
    color: '#C32B1F',
  },
});

export default NewProductScreen;
