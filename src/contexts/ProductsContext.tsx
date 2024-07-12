import React, {ReactNode, createContext, useEffect, useState} from 'react';
import ProductResponse from '../models/responses/ProductResponse';
import {fetchProducts} from '../services/ProductService';

type ProductsContextProps = {
  products: ProductResponse[];
  addProduct: (newProduct: ProductResponse) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (updatedProduct: ProductResponse) => void;
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
        setProducts(productsResponse);
      } catch (e) {
        console.error(
          'There was a problem trying to get financial products: ',
          e,
        );
      }
    };

    fetchProductsData();
  }, []);

  const addProduct = (newProduct: ProductResponse) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  const updateProduct = (updatedProduct: ProductResponse) => {
    const updatedProducts = products.map((product: ProductResponse) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  }

  return (
    <ProductsContext.Provider value={{products, addProduct, deleteProduct, updateProduct}}>
      {children}
    </ProductsContext.Provider>
  );
};
