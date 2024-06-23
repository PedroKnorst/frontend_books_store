import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';
import BooksQuantity from '.';

let decreaseQuantity: Mock;
let increaseQuantity: Mock;

const renderComponent = (quantity: number, booksStorage: number) => {
  increaseQuantity = vi.fn();
  decreaseQuantity = vi.fn();

  render(
    <BooksQuantity
      quantity={quantity}
      bookStorage={booksStorage}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
    />,
  );
};

describe('BooksQuantity', () => {
  it('should call "decreaseQuantity" prop when down button is clicked', () => {
    renderComponent(3, 10);

    const downIcon = screen.getByTestId('downIcon');

    fireEvent.click(downIcon);

    expect(decreaseQuantity).toHaveBeenCalledTimes(1);
  });

  it('should call "increaseQuantity" prop when up button is clicked', () => {
    renderComponent(1, 10);

    const upIcon = screen.getByTestId('upIcon');

    fireEvent.click(upIcon);

    expect(increaseQuantity).toHaveBeenCalledTimes(1);
  });

  it('should not call "increaseQuantity" prop when maximum storage is reached', () => {
    renderComponent(10, 10);

    const upIcon = screen.getByTestId('upIcon');

    fireEvent.click(upIcon);

    expect(increaseQuantity).not.toHaveBeenCalled();
  });

  it('should not call "decreaseQuantity" prop when quantity is 1', () => {
    renderComponent(1, 10);

    const downIcon = screen.getByTestId('downIcon');

    fireEvent.click(downIcon);

    expect(decreaseQuantity).not.toHaveBeenCalled();
  });

  it('should change up icon opacity when maximum storage is reached', () => {
    renderComponent(10, 10);

    const upIcon = screen.getByTestId('upIcon');

    expect(upIcon.className).toContain('opacity-30');
  });

  it('should change down icon opacity when quantity is 1', () => {
    renderComponent(1, 10);

    const downIcon = screen.getByTestId('downIcon');

    expect(downIcon.className).toContain('opacity-30');
  });
});
