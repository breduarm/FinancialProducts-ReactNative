import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../theme/ColorSqueme';
import { ProductResponse } from '../types/responses/ProductReponse';

type ItemProps = {
  item: ProductResponse;
  onItemPress: (item: ProductResponse) => void;
};

const ProductItem = ({
  item,
  onItemPress,
}: ItemProps): React.JSX.Element => (
  <>
    <Pressable style={styles.itemContainer} onPress={() => {onItemPress(item)}}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Image style={styles.icon} source={require("../assets/imgs/chevron-right.png")} />
    </Pressable>
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
    color: Colors.primaryText,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
  },
  icon: {
    height: 16,
    width: 8,
  },
  divider: {
    height: 1,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: Colors.lightGray,
  },
});

export default ProductItem;
