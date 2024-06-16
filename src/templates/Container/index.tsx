import Header from '#/components/organisms/Header';
import { CartStorage } from '#/context/cartContext';
import { ReactElement } from 'react';

const Container = ({ children }: { children: ReactElement }) => {
  return (
    <CartStorage>
      <main className="p-10 m-auto max-w-[1400px]">
        <Header />
        {children}
      </main>
    </CartStorage>
  );
};

export default Container;
