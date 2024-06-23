import { ICart } from '#/@types/cart';
import { addOrRemoveBookOfCart, findCartById } from '#/services/cart';
import { ReactElement, createContext, useEffect, useState } from 'react';
import { useAuthContext } from '../authContext/useAuthContext';
import { useMessageContext } from '../messageContext/useMessageContext';

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
  const { user } = useAuthContext();
  const { setMessage } = useMessageContext();

  useEffect(() => {
    if (user) getCurrentCart();
  }, [user]);

  const getCurrentCart = async () => {
    const { clientId } = user;

    if (clientId) {
      setLoading(true);
      await findCartById(clientId)
        .then((res) => {
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

        if (deleteBook) {
          setMessage({ content: 'Livro removido do carrinho!', severity: 'success', title: 'Sucesso!' });
        } else {
          setMessage({ content: 'Livro adicionado ao carrinho!', severity: 'success', title: 'Sucesso!' });
        }

        getCurrentCart();
      })
      .catch((error) => {
        console.log({ error });
        if (deleteBook) {
          setMessage({
            content: 'Erro ao remover livro do carrinho, tente novamente mais tarde!',
            severity: 'success',
            title: 'Erro!',
          });
        } else {
          setMessage({
            content: 'Erro ao adicionar livro ao carrinho, tente novamente mais tarde!',
            severity: 'success',
            title: 'Erro!',
          });
        }
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
