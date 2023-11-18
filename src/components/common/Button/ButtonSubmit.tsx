import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  href?: string;
  onClick?: () => void;
}

const ButtonSubmit: FC<Props> = ({ href = '/', onClick }) => {
  return (
    <Link
      to={href}
      type='button'
      onClick={onClick}
      className='h-12 md:h-14 w-full md:w-14 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none'
    >
      <span className='mr-3 md:hidden'>Search</span>
      <svg
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
    </Link>
  );
};

export default ButtonSubmit;
