interface Props {
  title: string;
  description: string;
  author: string;
  character: string;
}

const BookCard = ({ author, character, description, title }: Props) => {
  return (
    <div className="p-8 bg-white grid gap-2 text-black rounded-lg shadow-xl">
      <h3 className="font-[600]">{title}</h3>
      <p className="max-w-44 truncate line-clamp-3">{description}</p>
      <p>
        <span className="font-[600]">Autor:</span> {author}
      </p>
      <p>
        <span className="font-[600]">Personagem principal:</span> {character}
      </p>
    </div>
  );
};

export default BookCard;
