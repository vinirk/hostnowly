import { RootState } from 'app/store';
import { useSelector } from 'react-redux';
import { BackgroundSection } from 'components/common';
import { HomepageBanner } from 'components/layout';
import SectionGridRentalCard from 'components/ListStays';

const Homepage = () => {
  const listings = useSelector((state: RootState) => state.general.stays);
  return (
    <div className='relative overflow-hidden'>
      <div className='container relative space-y-18 lg:space-y-20 mb-8 m-8 mx-auto'>
        <HomepageBanner />
        <div className='relative py-10'>
          <BackgroundSection>
            <SectionGridRentalCard data={listings} />
          </BackgroundSection>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
