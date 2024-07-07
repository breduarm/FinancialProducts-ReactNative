import {AxiosResponse} from 'axios';
import {Routes} from '../enums/Routes';
import axiosInstance from '../configs/axiosConfig';
import ProductResponse from '../models/responses/ProductResponse';

export const fetchProducts = async (): Promise<ProductResponse[]> => {
  const url = Routes.PRODUCTS;
  const response: AxiosResponse = await axiosInstance.get(url);
  const productsResponse: ProductResponse[] = response.data.data;

  return productsResponse;
};

export const addNewProduct = async (
  newProduct: ProductResponse,
): Promise<ProductResponse> => {
  const url = Routes.PRODUCTS;
  const response: AxiosResponse = await axiosInstance.post(url, newProduct);
  const productResponse: ProductResponse = response.data.data;

  return productResponse;
};
