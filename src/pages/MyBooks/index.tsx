import Button from '#/components/atoms/Button';
import Loading from '#/components/atoms/Loading';
import Modal from '#/components/atoms/Modal';
import CreateBookModal from '#/components/molecules/CreateBookModal';
import EditBookCard from '#/components/molecules/EditBookCard';
import { useBooksContext } from '#/context/booksContext/useBooksContext';
import Container from '#/templates/Container';
import { useState } from 'react';

const MyBooks = () => {
  const { books, loading } = useBooksContext();
  const [openModal, setOpenModal] = useState<boolean>();

  return (
    <Container>
      <div className="bg-yellow-500 p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <div className="self-end">
          <Modal open={openModal} triggerButton={<Button>Cadastrar novo livro</Button>}>
            <CreateBookModal setOpenModal={setOpenModal} />
          </Modal>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {loading ? (
            <Loading />
          ) : books.length === 0 ? (
            <h2>Não há livros cadastrados</h2>
          ) : (
            books.map((book) => <EditBookCard book={book} />)
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyBooks;
