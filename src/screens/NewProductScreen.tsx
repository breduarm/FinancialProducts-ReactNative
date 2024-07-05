import React from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import Spacer from '../components/Spacer';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const NewProductScreen = (): React.JSX.Element => {
  const handleClick = () => {}

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}>
        <View>
          <View>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={[styles.input, styles.inputError]}
              placeholder="Ingrese el ID"
            />
            <Text style={styles.textError}>ID no válido</Text>
          </View>

          <View>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={[styles.input, styles.inputError]}
              placeholder="Ingrese el nombre"
            />
            <Text style={styles.textError}>Nombre no válido</Text>
          </View>

          <View>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.inputError]}
              placeholder="Ingrese una descripción"
            />
            <Text style={styles.textError}>Este campo es requerido!</Text>
          </View>

          <View>
            <Text style={styles.label}>Logo</Text>
            <TextInput
              style={[styles.input, styles.inputError]}
              placeholder="Añada un logo"
            />
            <Text style={styles.textError}>Este campo es requerido!</Text>
          </View>

          <View>
            <Text style={styles.label}>Fecha Liberación</Text>
            <TextInput
              style={[styles.input, styles.inputError]}
              placeholder="Ingrese la fecha de liberación"
            />
            <Text style={styles.textError}>Este campo es requerido!</Text>
          </View>

          <View>
            <Text style={styles.label}>Fecha Revisión</Text>
            <TextInput
              style={[styles.input, styles.inputError]}
              placeholder="Ingrese la fecha de Revisión"
            />
            <Text style={styles.textError}>Este campo es requerido!</Text>
          </View>
        </View>
      </ScrollView>

      <Spacer value={24} />

      <PrimaryButton handleClick={handleClick}/>

      <Spacer value={12} />

      <SecondaryButton />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
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
