import Header from '#/components/organisms/Header';
import { ReactElement } from 'react';

const Container = ({ children }: { children: ReactElement }) => {
  return (
    <main className="bg-amber-300">
      <Header />
      {children}
    </main>
  );
};

export default Container;
