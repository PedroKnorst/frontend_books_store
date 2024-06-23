import { fireEvent, render, screen } from '@testing-library/react';
import BooksPagination from '.';
import { Mock, describe, expect, it, vi } from 'vitest';

let setPage: Mock;

const renderComponent = (page: number, total: number) => {
  setPage = vi.fn();

  render(<BooksPagination page={page} setPage={setPage} size={4} total={total} />);
};

describe('BooksPagination', () => {
  it('should call "setPage" when right icon is clicked', () => {
    renderComponent(1, 8);

    const rightIcon = screen.getByTestId('rightIcon');

    fireEvent.click(rightIcon);

    expect(setPage).toHaveBeenCalledOnce();
  });

  it('should call "setPage" when left icon is clicked', () => {
    renderComponent(2, 8);

    const leftIcon = screen.getByTestId('leftIcon');

    fireEvent.click(leftIcon);

    expect(setPage).toHaveBeenCalledOnce();
  });

  it('should not call "setPage" when right icon is clicked', () => {
    renderComponent(2, 8);

    const rightIcon = screen.getByTestId('rightIcon');

    fireEvent.click(rightIcon);

    expect(setPage).not.toHaveBeenCalled();
  });

  it('should not call "setPage" when left icon is clicked', () => {
    renderComponent(1, 8);

    const leftIcon = screen.getByTestId('leftIcon');

    fireEvent.click(leftIcon);

    expect(setPage).not.toHaveBeenCalled();
  });

  it('should divide the total by the size of the prop', () => {
    renderComponent(1, 8);

    const paginationCounter = screen.getByTestId('paginationCounter');

    expect(paginationCounter.textContent).toBe('1 de 2');
  });

  it('should change right icon opacity when page and total are the same', () => {
    renderComponent(1, 8);

    const leftIcon = screen.getByTestId('leftIcon');

    expect(leftIcon.className).toContain('opacity-30');
  });

  it('should change left icon opacity when page is equal 1', () => {
    renderComponent(2, 8);

    const rightIcon = screen.getByTestId('rightIcon');

    expect(rightIcon.className).toContain('opacity-30');
  });

  it('should change left icon and right icon opacity when page and total are 0', () => {
    renderComponent(0, 0);

    const rightIcon = screen.getByTestId('rightIcon');
    const leftIcon = screen.getByTestId('leftIcon');

    expect(rightIcon.className).toContain('opacity-30');
    expect(leftIcon.className).toContain('opacity-30');
  });
});
