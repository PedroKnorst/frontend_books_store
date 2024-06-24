import BookCard from '#/components/atoms/BookCard';
import Button from '#/components/atoms/Button';
import Loading from '#/components/atoms/Loading';
import ViewBookCartCard from '#/components/molecules/ViewBookCartCard';
import { useCartContext } from '#/context/cartContext/useCartContext';
import Container from '#/templates/Container';
import { useNavigate } from 'react-router-dom';

const MyCart = () => {
  const { cart, loading, getCurrentCart } = useCartContext();

  const navigate = useNavigate();

  return (
    <Container>
      <div className="bg-yellow-500 p-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-4 rounded-lg">
        {loading ? (
          <Loading />
        ) : cart?.BooksCart?.length === 0 ? (
          <h2 className="col-span-4">Nenhum item foi adicionado ao carrinho</h2>
        ) : (
          cart?.BooksCart?.map((bookCart) => (
            <BookCard
              imagePath={bookCart.Book.Image.path}
              icon={
                <ViewBookCartCard
                  bookId={bookCart.bookId}
                  bookCartId={bookCart.id}
                  bookInitialQuantity={bookCart.quantity}
                  bookStorage={bookCart.Book.storage}
                />
              }
              {...bookCart.Book}
            />
          ))
        )}
        {cart?.BooksCart?.length > 0 && (
          <div className="col-span-4 w-full flex justify-end">
            <Button
              onClick={() => {
                getCurrentCart();
                navigate('/meu-carrinho/finalizar-compra');
              }}
            >
              Finalizar compra
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default MyCart;
