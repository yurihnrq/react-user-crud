const validateCPF = (cpf: string): boolean => {
  if (typeof cpf !== 'string') return false;

  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const values = cpf.split('').map(el => +el);
  const rest = (count: number) =>
    ((values
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;

  return rest(10) === values[9] && rest(11) === values[10];
};

// Valida os dados do formulário com dados do usuário.
// Retorna verdadeiro caso todos os dados estejam corretos.
export const validateUserForm = (data: FormData): boolean => {
  if (data.get('name') === '') return false;

  if (data.get('email') === '') return false;

  const cpf = data.get('cpf');
  if (cpf !== null) {
    if (!validateCPF(cpf.toString())) return false;
  } else return false;

  if (data.get('phone') === '') return false;

  if (data.get('address') === '') return false;

  const note = data.get('note');
  if (note !== null) {
    if (note.toString().length > 300) return false;
  } else return false;

  return true;
};
