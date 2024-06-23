import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '.';

describe('Button', () => {
  it('shold change the title to "Carregando..." when loading prop is true ', () => {
    render(<Button loading>Click here</Button>);

    const button = screen.getByRole('button');

    expect(button.textContent).toBe('Carregando...');
  });

  it('shold change the opacity of button when loading prop is true ', () => {
    render(<Button loading>Click here</Button>);

    const button = screen.getByRole('button');

    expect(button.className).toContain('opacity-40');
  });
});
