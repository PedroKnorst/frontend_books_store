interface Props {
  title: string;
  description: string;
  authors: string[];
  characters: string[];
  imagePath: string;
}

const ComicBookCard = ({ authors, characters, description, title, imagePath }: Props) => {
  return (
    <div className="p-8 bg-white flex gap-2 text-black rounded-lg">
      <span className="h-[200px] w-40">
        <img className="h-[200px]" src={`http://localhost:3333/static/${imagePath}`} alt={title} />
      </span>
      <div className="grid gap-2">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          Autores:{' '}
          {authors.length === 0
            ? 'Marvel'
            : authors.map((author, index) => author + (authors.length - 1 === index ? '' : ', '))}
        </p>
        <p>
          Personagens:{' '}
          {characters.length === 0
            ? 'Não há personagens neste livro'
            : characters.map((character, index) => character + (characters.length - 1 === index ? '' : ', '))}
        </p>
      </div>
    </div>
  );
};

export default ComicBookCard;
