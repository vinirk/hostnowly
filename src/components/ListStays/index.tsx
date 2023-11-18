import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import RentalCard from './StayCard';
import { StayType } from 'types';
import { goToDetailByStayId } from 'selectors/routes';
import { Heading } from 'components/common';

export interface SectionGridRentalCardProps {
  data?: StayType[];
  heading?: ReactNode;
  subHeading?: ReactNode;
  href?: string;
}

const SectionGridRentalCard: FC<SectionGridRentalCardProps> = ({
  data = [],
  heading = 'Featured places to stay',
  subHeading = 'Explore our curated selection of top-rated accommodations. Below, find a variety of stunning locations perfect for any getaway. Book your ideal stay today!',
}) => {
  const navigate = useNavigate();

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

  return (
    <div className='relative'>
      <Heading desc={subHeading}>{heading}</Heading>
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
      >
        {data.map((stay: StayType) => renderCard(stay))}
      </div>
    </div>
  );
};

export default SectionGridRentalCard;
