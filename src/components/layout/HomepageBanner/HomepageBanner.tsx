import { FC } from "react";
import ButtonPrimary from "components/common/Button/ButtonPrimary";
import SearchBar from "components/layout/DesktopSearchBar/DesktopSearchBar";
import { goToStays } from "selectors/routes";

export interface HomePageBannerProps {
  className?: string;
  title?: string;
  description?: string;
}

const ImagesBanner = () => (
  <div className="mx-auto">
    <div className="-m-1 flex flex-wrap md:-m-2">
      <div className="flex w-1/2 flex-wrap">
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
          />
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
          />
        </div>
        <div className="w-full p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
          />
        </div>
      </div>
      <div className="flex w-1/2 flex-wrap">
        <div className="w-full p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
          />
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
          />
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
          />
        </div>
      </div>
    </div>
  </div>
);

const HomePageBanner: FC<HomePageBannerProps> = ({
  className = "",
  title = "Your complete experience!",
  description = "Discover your next dream destination with us. Whether its venturing" +
    "into exotic landscapes, relaxing on paradisiacal beaches, or exploring" +
    "vibrant cities, we have the perfect stay for every special moment.",
}) => (
  <div
    className={`flex flex-col-reverse lg:flex-col relative p-10 ${className}`}
  >
    <div className="flex flex-col lg:flex-row lg:items-start">
      <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 xl:pr-14 lg:mr-10 xl:mr-0">
        <h2 className="font-bold text-4xl md:text-5xl xl:text-7xl !leading-[114%] font-leagueSpartan">
          {title}
        </h2>
        <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
          {description}
        </span>
        <ButtonPrimary href={goToStays()}>Start exploring</ButtonPrimary>
      </div>

      <div className="hidden sm:flex">
        <ImagesBanner />
      </div>
    </div>
    <div className="hidden lg:block z-10 w-full">
      <SearchBar />
    </div>
  </div>
);

export default HomePageBanner;
