import React, { ReactNode, createContext, useEffect, useState } from 'react';
import ProductResponse from '../models/responses/ProductResponse';
import { AxiosResponse } from 'axios';
import axiosInstance from '../configs/axiosConfig';

type ProductsContextProps = {
    products: ProductResponse[];
    updateProducts: (newProduct: ProductResponse) => void;
}

export const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

type ProductsProviderProps = {
    children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = '/bp/products';
        const response: AxiosResponse = await axiosInstance.get(url);
        const productsResponse: ProductResponse[] = response.data.data;

        console.log("==== D: productsResponse");
        setProducts(productsResponse);
      } catch (e) {
        console.error(
          'There was a problem trying to get financial products: ',
          e,
        );
      }
    };

    getProducts();
  }, []);

  const updateProducts = (newProduct: ProductResponse) => {
    setProducts([...products, newProduct]);
  };

  return (
    <ProductsContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};