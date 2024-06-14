interface Props {
  title: string;
  description: string;
  author: string;
  character: string;
}

const BookCard = ({ author, character, description, title }: Props) => {
  return (
    <div className="p-8 bg-white grid gap-2 text-black rounded-lg shadow-xl">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Autore: {author}</p>
      <p>
        Personagen: {character}
      </p>
    </div>
  );
};

export default BookCard;
