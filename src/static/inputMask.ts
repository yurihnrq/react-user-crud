// Mascara uma string de CPF para o formato 123.123.123-11.
export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

// Mascara uma string de telefone para o formato (11) 11111-1111.
export const phoneMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

// Remove caracteres inseridos pelas máscaras de CPF e Telefone.
export const removeMaskChars = (value: string): string => {
  return value.replace(/[-.]/g, '').replace(/[()-]/g, '').replace(' ', '');
};

export const nameMask = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9 ]/g, '');
};
