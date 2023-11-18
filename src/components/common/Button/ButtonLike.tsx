import { HeartIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';

export interface ButtonLikeProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
}

const ButtonLike: FC<ButtonLikeProps> = ({
  className = '',
  colorClass = 'text-white bg-black bg-opacity-30 hover:bg-opacity-50',
  isLiked = false,
}) => {
  const [likedState, setLikedState] = useState(isLiked);

  return (
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${colorClass} ${className}`}
      title={likedState ? 'Unlike' : 'Like'}
      onClick={() => setLikedState(!likedState)}
    >
      <HeartIcon width={23} fill={likedState ? 'currentColor' : 'none'} />
    </div>
  );
};

export default ButtonLike;
