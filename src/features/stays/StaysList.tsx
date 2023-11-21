import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "app/store";
import { StayCard } from "components/layout";
import { goToDetailByStayId } from "selectors/routes";
import { fetchStays } from "./staysSlice";

const StaysList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, status, error } = useSelector(
    (state: RootState) => state.stays,
  );

  useEffect(() => {
    dispatch(fetchStays());
  }, [dispatch]);

  const handleGoToDetail = (stayId: string) => {
    navigate(goToDetailByStayId(stayId));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((stay) => (
        <StayCard
          key={stay.id}
          onGoToDetail={() => handleGoToDetail(stay.id)}
          data={stay}
        />
      ))}
    </div>
  );
};

export default StaysList;
