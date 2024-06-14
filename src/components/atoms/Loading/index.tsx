import { ReloadIcon } from '@radix-ui/react-icons';

const Loading = () => {
  return (
    <div className="animate-spin flex h-screen w-screen items-center justify-center">
      <ReloadIcon height={50} width={50} />
    </div>
  );
};

export default Loading;
