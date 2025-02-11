import { useContext, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useIntl } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';

import {
  BULK_VISIBLE_COLUMNS,
  PREVIEW_LIMITS,
} from '../../constants';
import { getMappedTableData } from '../../utils/mappers';
import { RootContext } from '../../context/RootContext';

export const useRecordsPreview = ({
  id,
  step,
  queryOptions,
  capabilities,
}) => {
  const intl = useIntl();
  const { setVisibleColumns } = useContext(RootContext);
  const ky = useOkapiKy();

  const { data, refetch, isLoading } = useQuery(
    {
      queryKey: ['records', id, step],
      cacheTime: 0,
      queryFn: () => {
        return ky.get(`bulk-operations/${id}/preview`, { searchParams: { limit: PREVIEW_LIMITS.RECORDS, step } }).json();
      },
      ...queryOptions,
    },
  );

  const { contentData, columnMapping, columns } = useMemo(() => getMappedTableData({
    data,
    intl,
    capabilities,
  }), [data]);

  // set initial and visible columns
  useEffect(() => {
    if (columns.length) {
      const storageKey = `${BULK_VISIBLE_COLUMNS}_${capabilities}`;
      let storedVisibleColumns = JSON.parse(localStorage.getItem(storageKey) || null);

      if (columns.length !== storedVisibleColumns?.length) {
        storedVisibleColumns = columns;
        localStorage.setItem(storageKey, JSON.stringify(storedVisibleColumns));
      }

      // force selected columns to be visible
      const mappedVisibleColumns = storedVisibleColumns.map(column => ({
        ...column,
        selected: column.forceSelected || column.selected,
      }));

      setVisibleColumns(mappedVisibleColumns);
    }
  }, [columns]);

  return {
    isLoading,
    refetch,

    contentData,
    columnMapping,
    columns,
  };
};
