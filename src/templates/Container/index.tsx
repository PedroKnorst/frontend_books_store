import Header from '#/components/organisms/Header';
import { ReactElement } from 'react';

const Container = ({ children }: { children: ReactElement }) => {
  return (
    <main className="p-10">
      <Header />
      {children}
    </main>
  );
};

export default Container;
