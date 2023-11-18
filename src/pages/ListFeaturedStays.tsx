import { RootState } from 'app/store';
import RentalCard from 'components/ListStays/StayCard';
import { StayType } from 'types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { goToDetailByStayId } from 'selectors/routes';

export interface ListFeaturedStaysProps {
  className?: string;
}

const ListFeaturedStays: FC<ListFeaturedStaysProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const listings = useSelector((state: RootState) => state.general.stays);

  const handleGoToDetail = (stayId: string) => {
    navigate(goToDetailByStayId(stayId));
  };
  const renderCard = (stay: StayType) => {
    return (
      <RentalCard
        key={stay.id}
        onGoToDetail={() => handleGoToDetail(stay.id)}
        data={stay}
      />
    );
  };
  const renderContent = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl space-y-8 px-0 sm:p-6 xl:p-0'>
        <h2 className='text-3xl lg:text-3xl font-semibold'>
          Featured places 🏖️
        </h2>

        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>

        <div
          className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        >
          {listings.map((stay: StayType) => renderCard(stay))}
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <main className='container'>
        <div className='mx-auto px-6 py-8'>{renderContent()}</div>
      </main>
    </div>
  );
};

export default ListFeaturedStays;
