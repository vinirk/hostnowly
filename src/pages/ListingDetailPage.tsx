import { RootState } from 'app/store';
import MobileFooterSticky from 'components/Navigation/(mobile)/MobileFooterSticker';
import SidebarStayDetail from 'components/SidebarStayDetail';
import SectionDateRange from 'components/StayDateRangeCard';
import SectionStayDetail from 'components/StayDetailCard';
import SectionStayGuests from 'components/StayDetailGuestsCard';
import ImageModal from 'components/common/SimpleImageModal/SimpleImageModal';
import { setFilters } from 'features/filters/filtersSlice';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StayType } from 'types';

interface ListingDetailPageProps {
  className?: string;
}

const StayDetailPageContainer: FC<ListingDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const currentStay = useSelector((state: RootState) =>
    state.stays.items.find((item: StayType) => item.id === id)
  );
  const filter = useSelector((state: RootState) => state.filters);
  const blockedDates = useSelector(
    (state: RootState) => state.booking?.blockedDates
  );
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [currentSelectedImage, setCurrentSelectedImage] = useState('');

  const handleChangeDate = (startDate: Date, endDate: Date) => {
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();
    dispatch(
      setFilters({
        startDate: startDateString,
        endDate: endDateString,
        price: currentStay?.price,
      })
    );
  };

  const renderGalleryImages = () => (
    <div className='relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2'>
      <div
        className='col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer '
        onClick={() => {
          setShowModal(true);
          setCurrentSelectedImage(currentStay?.galleryImgs[0] ?? '');
        }}
      >
        <img
          className='absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full'
          src={currentStay?.galleryImgs[0]}
          alt=''
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
        />
        <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
      </div>
      {currentStay?.galleryImgs.map((item, index) => (
        <div
          key={index}
          className={`relative rounded-md sm:rounded-xl overflow-hidden ${
            index >= 3 ? 'hidden sm:block' : ''
          }`}
        >
          <div className='aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5'>
            <img
              className='absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full'
              src={item || ''}
              alt=''
              sizes='400px'
            />
          </div>

          <div
            className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
            onClick={() => {
              setShowModal(true);
              setCurrentSelectedImage(item);
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <ImageModal
        imageUrl={currentSelectedImage}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <header className='rounded-md sm:rounded-xl mt-10'>
        {renderGalleryImages()}
      </header>

      <main className='relative z-10 mt-11 flex flex-col lg:flex-row '>
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10 mb-10'>
          <SectionStayDetail
            title={currentStay?.title}
            address={currentStay?.address}
            category={currentStay?.category}
            description={currentStay?.description}
            host={currentStay?.host}
            maxGuests={currentStay?.maxGuests}
          />
          <SectionStayGuests title="Who's coming?" />
          <SectionDateRange
            startDate={filter?.startDate}
            endDate={filter?.endDate}
            onChangeDate={handleChangeDate}
            blockedDates={blockedDates.filter((item) => item.stayId === id)}
          />
        </div>

        <div className='hidden lg:block flex-grow mt-14 lg:mt-0'>
          <div className='sticky top-28'>
            <SidebarStayDetail
              price={currentStay?.price}
              stars={currentStay?.stars}
              stayId={id}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function ListingStayDetailPage() {
  return (
    <div className='container'>
      <StayDetailPageContainer />
      <MobileFooterSticky />
    </div>
  );
}
