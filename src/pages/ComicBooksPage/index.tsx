import { IMarvelComicBook } from '#/@types/books';
import BookCard from '#/components/atoms/BookCard';
import { getMarvelComicBooksWithFilter } from '#/services/books';
import Container from '#/templates/Container';
import { useEffect, useState } from 'react';

const ComicBooksPage = () => {
  const [marvelBooks, setMarvelBooks] = useState<IMarvelComicBook[]>([]);

  useEffect(() => {
    getMarvelComicBooksWithFilter()
      .then((res) => {
        console.log({ res });

        setMarvelBooks(res.data.books);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <div className="w-full grid grid-cols-4 gap-6 p-11">
        {marvelBooks.map((book) => (
          <BookCard
            authors={book.authors}
            characters={book.characters}
            description={book.description}
            title={book.title}
          />
        ))}
      </div>
    </Container>
  );
};

export default ComicBooksPage;
