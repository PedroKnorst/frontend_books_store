import { ReloadIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface Props {
  className?: string;
}

const Loading = ({ className }: Props) => {
  return (
    <div className={clsx('animate-spin w-full flex items-center justify-center', className)}>
      <ReloadIcon height={50} width={50} />
    </div>
  );
};

export default Loading;
