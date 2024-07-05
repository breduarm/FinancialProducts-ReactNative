import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import DeleteProductModal from '../components/DeleteProductModal'
import Spacer from '../components/Spacer';
import SecondaryButton from '../components/SecondaryButton';
import ErrorButton from '../components/ErrorButton ';

const DetailScreen = (): React.JSX.Element => {
    const [showModal, setShowModal] = useState(false);

  const handleDeleteProduct = () => {
    setShowModal(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      <DeleteProductModal showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.content}>
        <Text style={styles.title}>ID: 123455</Text>
        <Text style={styles.subtitle}>Información extra</Text>

        <Spacer value={40} />

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>Nombre registrado</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>Descripción registrada</Text>
        </View>

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Logo</Text>
          <View style={styles.logo} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Fecha liberación</Text>
          <Text style={styles.value}>Fecha liberación registrada</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Fecha revisión</Text>
          <Text style={styles.value}>Fecha revisión registrada</Text>
        </View>
      </View>

      <Spacer value={24} />
      <SecondaryButton />

      <Spacer value={12} />
      <ErrorButton handleClick={handleDeleteProduct} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      content: {
        flex: 1,
        marginHorizontal: 24,
        marginTop: 56,
        marginBottom: 32,
      },


    //   content: {
    //     flex: 1,
    //   },
      title: {
        color: '#303034',
        fontSize: 24,
        fontWeight: '700',
      },
      subtitle: {
        color: '#303034',
        fontSize: 12,
      },
      infoContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 24,
      },
      label: {
        color: '#303034',
        flex: 1,
      },
      value: {
        color: '#303034',
        fontWeight: '900',
      },
      logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
      },
      logoText: {
        color: '#303034',
        alignSelf: 'flex-start',
      },
      logo: {
        width: 200,
        height: 120,
        backgroundColor: '#FAE54C',
        borderRadius: 6,
      },
})

export default DetailScreen