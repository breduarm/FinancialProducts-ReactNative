import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavDirections } from '../enums/NavDirections';
import { ProductResponse } from '../types/responses/ProductReponse';

// Define the type for the stack parameter list
export type RootStackParamList = {
  Home: undefined;
  Detail: { product: ProductResponse };
  ProductForm?: { product?: ProductResponse };
};

// Combine both route and navigation props for a screen component
export type HomeScreenProps = {
  route: RouteProp<RootStackParamList, NavDirections.HOME>;
  navigation: NativeStackNavigationProp<RootStackParamList, NavDirections.HOME>;
};

export type DetailScreenProps = {
  route: RouteProp<RootStackParamList, NavDirections.DETAIL>;
  navigation: NativeStackNavigationProp<RootStackParamList, NavDirections.DETAIL>;
};

export type ProductFormScreenProps = {
  route: RouteProp<RootStackParamList, NavDirections.PRODUCT_FORM>;
  navigation: NativeStackNavigationProp<RootStackParamList, NavDirections.PRODUCT_FORM>;
};
