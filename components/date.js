import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <div className='mx-3 text-center'>
      <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
    </div>);
}