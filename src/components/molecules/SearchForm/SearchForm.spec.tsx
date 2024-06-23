import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchForm from '.';

const onSearch = vi.fn();

describe('SearchForm', () => {
  it('should change search input value when typed', () => {
    render(<SearchForm onSearch={onSearch} />);

    const searchInput = screen.getByTestId('search');

    fireEvent.input(searchInput, { target: { value: 'teste' } });

    expect(searchInput).toHaveValue('teste');
  });

  it('should not show category selection when comicBookFilter prop is true', () => {
    render(<SearchForm onSearch={onSearch} comicBookFilter={true} />);

    const selectCategory = screen.queryByTestId('category');

    expect(selectCategory).not.toBeInTheDocument();
  });

  it('should not show releaseDateBegin input when comicBookFilter prop is false', () => {
    render(<SearchForm onSearch={onSearch} comicBookFilter={true} />);

    const releaseDateBegin = screen.queryByTestId('releaseDateBegin');

    expect(releaseDateBegin).not.toBeInTheDocument();
  });

  it('should not show releaseDateEnd input when comicBookFilter prop is false', () => {
    render(<SearchForm onSearch={onSearch} comicBookFilter={true} />);

    const releaseDateEnd = screen.queryByTestId('releaseDateEnd');

    expect(releaseDateEnd).not.toBeInTheDocument();
  });

  it('should not show startYear input when comicBookFilter prop is false', () => {
    render(<SearchForm onSearch={onSearch} comicBookFilter={false} />);

    const startYear = screen.queryByTestId('startYear');

    expect(startYear).not.toBeInTheDocument();
  });

  it('should call "onSearch" prop and clean input value when clean filter button is clicked', () => {
    render(<SearchForm onSearch={onSearch} comicBookFilter={false} />);

    const searchInput = screen.getByTestId('search');

    fireEvent.input(searchInput, { target: { value: 'teste' } });

    expect(searchInput).toHaveValue('teste');

    const cleanFilterButton = screen.getByTestId('cleanFilterButton');

    fireEvent.click(cleanFilterButton);

    expect(searchInput).not.toHaveValue('teste');
    expect(onSearch).toHaveBeenCalledOnce();
  });
});
