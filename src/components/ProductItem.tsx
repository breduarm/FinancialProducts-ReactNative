import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../theme/ColorSqueme';

type ItemProps = {
  title: string;
  description: string;
  onItemPress: () => void;
};

const ProductItem = ({
  title,
  description,
  onItemPress,
}: ItemProps): React.JSX.Element => (
  <>
    <Pressable style={styles.itemContainer} onPress={onItemPress}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.icon} />
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
    fontWeight: '900',
  },
  description: {
    fontSize: 12,
  },
  icon: {
    height: 16,
    width: 8,
    backgroundColor: Colors.primaryGray,
  },
  divider: {
    height: 1,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: Colors.lightGray,
  },
});

export default ProductItem;
