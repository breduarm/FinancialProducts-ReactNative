import React, {ReactNode, createContext, useEffect, useState} from 'react';
import ProductResponse from '../models/responses/ProductResponse';
import { fetchProducts } from '../services/ProductService';

type ProductsContextProps = {
  products: ProductResponse[];
  updateProducts: (newProduct: ProductResponse) => void;
};

export const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
);

type ProductsProviderProps = {
  children: ReactNode;
};

export const ProductsProvider = ({children}: ProductsProviderProps) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsResponse: ProductResponse[] = await fetchProducts();
        setProducts(productsResponse)
      } catch (e) {
        console.error(
          'There was a problem trying to get financial products: ',
          e,
        );
      }
    };

    fetchProductsData();
  }, []);

  const updateProducts = (newProduct: ProductResponse) => {
    setProducts([...products, newProduct]);
  };

  return (
    <ProductsContext.Provider value={{products, updateProducts}}>
      {children}
    </ProductsContext.Provider>
  );
};
