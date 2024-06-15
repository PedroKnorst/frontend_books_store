import BookCard from '#/components/atoms/BookCard';
import Button from '#/components/atoms/Button';
import Loading from '#/components/atoms/Loading';
import { useCartContext } from '#/context/cartContext/useCartContext';
import Container from '#/templates/Container';
import { useEffect } from 'react';

const MyCart = () => {
  const { cart, getCurrentCart, loading } = useCartContext();

  useEffect(() => {
    getCurrentCart();
  }, []);

  return (
    <Container>
      <div className="bg-yellow-500 p-10 grid grid-cols-2 gap-6 mt-4 rounded-lg">
        {loading ? <Loading /> : cart?.BooksCart.map((bookCart) => <BookCard {...bookCart.Book} />)}
        <div className="col-span-2 w-full flex justify-end">
          <Button>Finalizar compra</Button>
        </div>
      </div>
    </Container>
  );
};

export default MyCart;
