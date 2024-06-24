import { BookCategory } from '#/@types/books';
import Button from '#/components/atoms/Button';
import Loading from '#/components/atoms/Loading';
import Modal from '#/components/atoms/Modal';
import BooksPagination from '#/components/molecules/BooksPagination';
import CreateBookModal from '#/components/molecules/CreateBookModal';
import EditBookCard from '#/components/molecules/EditBookCard';
import SearchForm, { SearchFormSchemaType } from '#/components/molecules/SearchForm';
import { useBooksContext } from '#/context/booksContext/useBooksContext';
import { getBooksWithFilter } from '#/services/books';
import Container from '#/templates/Container';
import { useState } from 'react';

const MyBooks = () => {
  const { books, loading, setBooks, setTotal, page, setPage, total } = useBooksContext();
  const [openModal, setOpenModal] = useState<boolean>();

  const onSearch = async ({ search, category, releaseDateBegin, releaseDateEnd }: SearchFormSchemaType) => {
    const searchItem = search
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    await getBooksWithFilter({
      page: 1,
      size: 8,
      author: searchItem,
      category: category as BookCategory,
      character: searchItem,
      title: searchItem,
      publishDateEnds: releaseDateEnd,
      publishDateStarts: releaseDateBegin,
    }).then((res) => {
      setBooks(res.data.books);
      setTotal(res.data.total);
    });
  };

  return (
    <Container>
      <div className="bg-yellow-500 p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <div className="flex w-full relative">
          <SearchForm onSearch={onSearch} />
        </div>
        <div className="self-end gap-2 flex flex-col">
          <Modal open={openModal} setOpen={setOpenModal} triggerButton={<Button>Cadastrar novo livro</Button>}>
            <CreateBookModal setOpenModal={setOpenModal} />
          </Modal>
          <div className="self-end">
            <BooksPagination page={page} setPage={setPage} total={total} size={8} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {loading ? (
            <Loading />
          ) : books.length === 0 ? (
            <h2 className="col-span-4">Não há livros cadastrados</h2>
          ) : (
            books.map((book) => <EditBookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyBooks;
