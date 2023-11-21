import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl?: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-black bg-opacity-60 absolute inset-0"
          onClick={onClose}
        ></div>
        <div className="relative z-10 max-w-5xl max-h-full overflow-auto">
          <img
            src={imageUrl}
            alt="Full Screen"
            className="rounded-lg shadow-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 font-bold bg-gray-600 bg-opacity-75 rounded-full w-10 h-10 text-white hover:bg-gray-700 transition"
          >
            &#10005;
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
