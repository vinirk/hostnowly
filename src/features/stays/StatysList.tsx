import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { fetchStays } from './staysSlice';

const StaysList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stays, status, error } = useSelector(
    (state: RootState) => state.stays
  );

  useEffect(() => {
    dispatch(fetchStays());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {stays.map((stay) => (
        <div key={stay.id}>{stay.title}</div>
      ))}
    </div>
  );
};

export default StaysList;
