import { toMoney } from 'vanilla-masker';

export const inputMasks = (value: string | number, mask: 'MONEY') => {
  switch (mask) {
    case 'MONEY':
      if (typeof value === 'string') {
        value = value.replace(/\W/g, '');
        return toMoney(value.replace('R$', ''), { precision: 2, separator: ',', delimiter: '.', unit: 'R$' });
      } else if (typeof value === 'number') {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      }
      return value;
    default:
      return value;
  }
};
