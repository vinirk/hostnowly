import MobileMenu from 'components/Navigation/(mobile)/MobileMenu';
import Navigation from 'components/Navigation/(desktop)/Navigation';
import Logo from 'components/common/Logo';
import SwitchDarkMode from 'components/common/IconSwitchDarkMode/IconSwitchDarkMode';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import SearchMobile from 'components/Navigation/(mobile)/SearchMobile';

export interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className = '' }) => {
  return (
    <div
      className={`sticky top-0 w-full left-0 right-0 z-40 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl backdrop-filter ${className}`}
    >
      <nav className={`relative z-10 ${className}`}>
        <div className='px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center'>
          <div className='hidden md:flex justify-start items-center space-x-4 sm:space-x-10'>
            <div className='flex items-center gap-3'>
              <Logo />
              <Link to='/' className='font-bold text-3xl font-leagueSpartan'>
                Hostnowly
              </Link>
            </div>
            <div className='hidden lg:block'>
              <Navigation />
            </div>
          </div>

          <div className='flex flex-1 lg:hidden !mx-auto px-4 md:px-3'>
            <SearchMobile />
          </div>

          <div className='flex flex-shrink-0 items-center justify-end lg:flex-none text-neutral-700 dark:text-neutral-100'>
            <SwitchDarkMode />
            <div className='flex lg:hidden items-center'>
              <div className='px-0.5' />
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
