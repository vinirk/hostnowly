import { StayType } from 'types';
import __stays from '../../data/jsons/__stays.json';

// Mock data for stays
const mockStays: StayType[] = __stays;

const getStays = async (): Promise<StayType[]> => {
  // Simulating an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockStays;
};

const StaysService = {
  getStays,
};

export default StaysService;
