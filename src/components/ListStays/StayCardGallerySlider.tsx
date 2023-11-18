import Glide from '@glidejs/glide';
import NextPrev from 'components/common/NextPrev';
import { ImageWithLoading } from 'components/common';
import { FC, useEffect, useMemo } from 'react';
import generateTimestampId from 'utils/idGenerator';

export interface RentalCardGallerySliderProps {
  className?: string;
  galleryImgs: string[];
  ratioClass?: string;
  uniqueID: string;
  href?: string;
}

const RentalCardGallerySlider: FC<RentalCardGallerySliderProps> = ({
  className = '',
  galleryImgs,
  ratioClass = 'aspect-w-4 aspect-h-3',
}) => {
  const UNIQUE_CLASS = `RentalCardGallerySlider__${generateTimestampId()}`;

  let glide = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: 1,
      gap: 0,
      keyboard: false,
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    if (glide) {
      glide.mount();
    }
  }, [glide, UNIQUE_CLASS, galleryImgs]);

  const renderDots = () => {
    return (
      <div
        className='glide__bullets flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5'
        data-glide-el='controls[nav]'
      >
        {galleryImgs.map((_, i) => (
          <button
            className='glide__bullet w-1.5 h-1.5 rounded-full bg-neutral-300'
            key={i}
            data-glide-dir={`=${i}`}
          />
        ))}
      </div>
    );
  };

  const renderSliderGallery = () => {
    return (
      <div className={`${UNIQUE_CLASS} relative group overflow-hidden`}>
        <div className='glide__track' data-glide-el='track'>
          <ul className='glide__slides'>
            {galleryImgs.map((item, index) => (
              <li key={index} className='glide__slide'>
                <div className={`block ${ratioClass}`}>
                  <ImageWithLoading src={item} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='absolute -bottom-4 inset-x-0 h-10 bg-gradient-to-t from-neutral-900'></div>
        {renderDots()}
        <div className='absolute opacity-0 group-hover:opacity-100 transition-opacity flex top-1/2 transform -translate-y-1/2 inset-x-2 justify-between'>
          <NextPrev className='w-full justify-between' btnClassName='w-8 h-8' />
        </div>
      </div>
    );
  };

  return (
    <div className={`gallery-slider ${className}`}>{renderSliderGallery()}</div>
  );
};

export default RentalCardGallerySlider;
