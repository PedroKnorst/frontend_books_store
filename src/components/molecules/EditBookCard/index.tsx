import BookCard from '#/components/atoms/BookCard';
import Modal from '#/components/atoms/Modal';
import { useState } from 'react';
import CreateBookModal from '../CreateBookModal';
import { IBook } from '#/@types/books';

interface Props {
  book: IBook;
}

const EditBookCard = ({ book }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>();

  return (
    <Modal
      open={openModal}
      triggerButton={<BookCard className="cursor-pointer text-left" {...book} imagePath={book.Image.path} />}
    >
      <CreateBookModal updatedBook={book} setOpenModal={setOpenModal} />
    </Modal>
  );
};

export default EditBookCard;
