import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { FiltersState, setFilters } from "features/filters/filtersSlice";

/**
 * Custom hook to handle filter changes.
 * It provides a function to update filter state based on changed fields,
 * utilizing Redux dispatch and selectors.
 */
export const useFilterChange = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filters);

  /**
   * Updates the filter state based on changed fields.
   *
   * @param {Partial<FiltersState>} updatedFields - An object containing the filter fields that have been changed.
   */
  const handleChangeFilter = (updatedFields: Partial<FiltersState>) => {
    dispatch(setFilters({ ...filter, ...updatedFields }));
  };

  return handleChangeFilter;
};
