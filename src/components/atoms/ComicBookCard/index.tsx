interface Props {
  title: string;
  imagePath: string;
}

const ComicBookCard = ({ title, imagePath }: Props) => {
  return (
    <div className="p-4 h-[350px] justify-center items-center bg-white flex flex-col gap-2 text-black rounded-lg shadow-xl">
      <div className="flex gap-2 text-center flex-col">
        <span className="h-[200px] flex justify-center">
          <img className="h-[200px]" src={imagePath} alt={title} />
        </span>
        <h3 className="font-[600] line-clamp-3">{title}</h3>
      </div>
    </div>
  );
};

export default ComicBookCard;
