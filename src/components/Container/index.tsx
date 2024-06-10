import { ReactElement } from 'react';

const Container = ({ children }: { children: ReactElement }) => {
  return <main className="bg-amber-300">{children}</main>;
};

export default Container;
