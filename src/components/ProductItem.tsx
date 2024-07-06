import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type ItemProps = {title: string; description: string};

const ProductItem = ({title, description}: ItemProps): React.JSX.Element => (
  <>
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.icon} />
    </View>
    <View style={styles.divider} />
  </>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontWeight: '900',
  },
  description: {
    fontSize: 12,
  },
  icon: {
    height: 16,
    width: 8,
    backgroundColor: '#C9C9CA',
  },
  divider: {
    height: 1,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: '#ECECED',
  },
});

export default ProductItem;
