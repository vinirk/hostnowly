import { FC, ImgHTMLAttributes, useEffect, useState } from "react";
import LoadingIcon from "icons/LoadingIcon";

export interface ImageWithLoadingProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

const ImageWithLoading: FC<ImageWithLoadingProps> = ({
  containerClassName = "",
  alt = "alt-img",
  src = "",
  className = "object-cover w-full h-full",
  ...args
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoaded;
    }
  }, [src]);

  return (
    <div className={`${containerClassName}`}>
      {imageLoaded && src ? (
        <img
          src={src}
          className={className}
          alt={alt}
          {...args}
          onLoad={handleImageLoaded}
        />
      ) : (
        <div
          className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
        >
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};

export default ImageWithLoading;
