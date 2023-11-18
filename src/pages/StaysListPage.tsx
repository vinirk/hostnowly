import { FC } from 'react';
import { Heading } from 'components/common';
import StaysList from 'features/stays/StatysList';

export interface StaysListPageProps {}

const StaysListPage: FC<StaysListPageProps> = () => {
  return (
    <main className='container'>
      <div className='mx-auto px-6 py-8'>
        <div className='w-full flex flex-col sm:rounded-2xl space-y-8 px-0 sm:p-6 xl:p-0'>
          <Heading desc='Find your perfect stay'>Find your stay 🏖️</Heading>
          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <StaysList />
        </div>
      </div>
    </main>
  );
};

export default StaysListPage;
