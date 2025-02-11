import useFilters from '@folio/stripes-acq-components/lib/AcqList/hooks/useFilters';
import { useCallback, useEffect } from 'react';
import { buildFiltersObj } from '@folio/stripes-acq-components/lib/AcqList/utils';
import { buildSearch } from '@folio/stripes-acq-components';
import { SEARCH_INDEX_PARAMETER } from '@folio/stripes-acq-components/lib/AcqList/constants';

export const useLocationFilters = ({
  resetData = () => {},
  location,
  history,
  initialFilter,
}) => {
  const {
    filters,
    applyFilters,
    resetFilters,
    setFilters,
    setSearchIndex,
    searchIndex,
  } = useFilters(resetData, initialFilter);

  useEffect(
    () => {
      const initialFilters = buildFiltersObj(location.search);

      setFilters(initialFilters);
      setSearchIndex(initialFilters[SEARCH_INDEX_PARAMETER] || '');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const applyLocationFilters = useCallback(
    (type, value) => {
      const newFilters = applyFilters(type, value);
      const search = new URLSearchParams(location.search);
      const criteria = search.get('criteria');
      const capabilities = search.get('capabilities');
      const fileName = search.get('fileName');
      const step = search.get('step');

      history.replace({
        pathname: '',
        search: `${buildSearch({ ...newFilters, capabilities, criteria, fileName, step }, location.search)}`,
      });

      return newFilters;
    },
    [applyFilters, history, location.search],
  );

  const resetLocationFilters = useCallback(
    () => {
      resetFilters();

      history.push({
        pathname: '',
        search: buildSearch({
          capabilities: initialFilter.capabilities,
          criteria: initialFilter.criteria,
          step: initialFilter.step,
          fileName: initialFilter.fileName,
        }),
      });
    },
    [history, resetFilters],
  );

  return [
    filters,
    applyLocationFilters,
    resetLocationFilters,
    searchIndex,
  ];
};
