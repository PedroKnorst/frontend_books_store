import { useContext } from 'react';
import { CartContext } from '.';

const useCartContext = () => {
  const context = useContext(CartContext);

  return context;
};

export { useCartContext };
