import { AxiosResponse } from 'axios';
import axiosInstance from '../configs/axiosConfig';
import { Routes } from '../enums/Routes';
import ProductResponse from '../models/responses/ProductResponse';

/**
 * Fetches products from the server.
 *
 * @returns {Promise<ProductResponse[]>} A promise that resolves to an array of ProductResponse objects.
 * @throws {Error} Will throw an error if the network request fails or the response data format is incorrect.
 */
export const fetchProducts = async (): Promise<ProductResponse[]> => {
  const url = Routes.FETCH_PRODUCTS;

  try {
    const response: AxiosResponse = await axiosInstance.get(url);
    // Validate the response structure
    if (response && response.data && Array.isArray(response.data.data)) {
      const productsResponse: ProductResponse[] = response.data.data;
      return productsResponse;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (e) {
    console.error('Error fetching products:', e);
    throw e;
  }
};

export const addNewProduct = async (
  newProduct: ProductResponse,
): Promise<ProductResponse> => {
  const url = Routes.ADD_NEW_PRODUCT;
  const response: AxiosResponse = await axiosInstance.post(url, newProduct);
  const productResponse: ProductResponse = response.data.data;

  return productResponse;
};

export const deleteProductById = async (id: string): Promise<string> => {
  const url = Routes.DELETE_PRODUCT.replace(':id', id);
  const response: AxiosResponse = await axiosInstance.delete(url);
  const messageResponse: string = response.data.message;

  return messageResponse;
};

export const updateProductById = async (
  id: string,
  editedProduct: ProductResponse,
): Promise<string> => {
  const url = Routes.UPDATE_PRODUCT.replace(':id', id);
  const response: AxiosResponse = await axiosInstance.put(url, editedProduct);
  const messageResponse = response.data.data.message;

  return messageResponse;
};

export const verifyID = async (id: string): Promise<boolean> => {
  const url = Routes.VERIFY_ID.replace(':id', id);
  const response: AxiosResponse = await axiosInstance.get(url);

  return response.data;
};
