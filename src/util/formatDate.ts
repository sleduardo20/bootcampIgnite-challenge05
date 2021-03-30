import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const getFormatDate = (date: string) => {
  const day = format(new Date(date), 'd', { locale: ptBR });
  const month = format(new Date(date), 'MMM', { locale: ptBR });
  const year = format(new Date(date), 'yyyy', { locale: ptBR });

  return `${day} ${month} ${year} `;
};
