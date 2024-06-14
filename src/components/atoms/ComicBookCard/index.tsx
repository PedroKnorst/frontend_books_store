interface Props {
  title: string;
  description: string;
  authors: string[];
  characters: string[];
}

const ComicBookCard = ({ authors, characters, description, title }: Props) => {
  return (
    <div className="p-8 bg-white grid gap-2 text-black rounded-lg">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Autores: {authors.map((author, index) => author + (authors.length - 1 === index ? '' : ', '))}</p>
      <p>
        Personagens: {characters.map((character, index) => character + (characters.length - 1 === index ? '' : ', '))}
      </p>
    </div>
  );
};

export default ComicBookCard;
