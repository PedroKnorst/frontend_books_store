import { ICart } from '#/@types/cart';
import { addOrRemoveBookOfCart, findCartById } from '#/services/cart';
import { ReactElement, createContext, useState } from 'react';

type TCartContext = {
  cart: ICart;
  loading: boolean;
  getCurrentCart: () => void;
  manageBookToCart: (bookId: string, deleteBook?: boolean) => void;
  loadingManageBookToCart: boolean;
};

export const CartContext = createContext<TCartContext>({} as TCartContext);

const CartStorage = ({ children }: { children: ReactElement }) => {
  const [cart, setCart] = useState<ICart>({} as ICart);
  const [loading, setLoading] = useState(false);
  const [loadingManageBookToCart, setLoadingManageBookToCart] = useState(false);

  const getCurrentCart = async () => {
    if (sessionStorage.getItem('user')) {
      console.log('aq');

      const user = JSON.parse(sessionStorage.getItem('user') as string);

      const { clientId } = user;

      setLoading(true);
      await findCartById(clientId)
        .then((res) => {
          console.log(res.data);

          setCart(res.data);
        })
        .catch((error) => console.log({ error }))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const manageBookToCart = async (bookId: string, deleteBook?: boolean) => {
    setLoadingManageBookToCart(true);
    await addOrRemoveBookOfCart({ bookId, deleteBook })
      .then((res) => {
        setCart(res.data);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoadingManageBookToCart(false);
      });
  };

  return (
    <CartContext.Provider
      value={{
        getCurrentCart,
        loading,
        cart,
        manageBookToCart,
        loadingManageBookToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartStorage };
