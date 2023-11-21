import React from "react";
import NotFoundImage from "images/not-found.png";
import ButtonPrimary from "../Button/ButtonPrimary";

const Page404: React.FC = () => (
  <div className="flex flex-1 flex-col items-center justify-center relative">
    <span className="block text-[20px] text-center mt-16 font-semibold text-neutral-800 dark:text-neutral-200 tracking-wider">
      THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.
    </span>
    <div className="w-full relative">
      <img src={NotFoundImage} alt="404" className="mx-auto w-[500px]" />
    </div>
    <ButtonPrimary
      className="mt-16 font-semibold"
      onClick={() => window.history.back()}
    >
      Go back
    </ButtonPrimary>
  </div>
);

export default Page404;
