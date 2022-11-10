import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';

import {
  AccordionSet,
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import {
  createClearFilterHandler,
  DATE_FORMAT, ResetButton,
} from '@folio/stripes-acq-components';
import {
  CheckboxFilter,
  DateRangeFilter,
} from '@folio/stripes/smart-components';

import React from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import {
  FILTERS,
  FILTER_OPTIONS,
} from '../../../../constants';

export const LogsFilters = ({
  onChange,
  activeFilters,
  resetFilter,
}) => {
  const location = useLocation();
  const getDateRange = filterValue => {
    let dateRange = {
      startDate: '',
      endDate: '',
    };

    if (filterValue) {
      const [startDateString, endDateString] = filterValue[0].split(':');
      const endDate = moment.utc(endDateString);
      const startDate = moment.utc(startDateString);

      dateRange = {
        startDate: startDate.isValid()
          ? startDate.format(DATE_FORMAT)
          : '',
        endDate: endDate.isValid()
          ? endDate.subtract(1, 'days').format(DATE_FORMAT)
          : '',
      };
    }

    return dateRange;
  };

  const getDateFilter = (startDate, endDate) => {
    const endDateCorrected = moment.utc(endDate).add(1, 'days').format(DATE_FORMAT);

    return `${startDate}:${endDateCorrected}`;
  };

  const getIsDisabled = () => Object.values(FILTERS).some((el) => location.search.includes(el));

  return (
    <div data-testid="logsFilters">
      <AccordionSet>
        <ResetButton
          id="reset-export-filters"
          disabled={!getIsDisabled()}
          reset={resetFilter}
          label={<FormattedMessage id="ui-bulk-edit.resetFilters" />}
        />
        <Accordion
          closedByDefault={false}
          displayClearButton={!!activeFilters[FILTERS.STATUS]}
          header={FilterAccordionHeader}
          id={FILTERS.STATUS}
          label={<FormattedMessage id="ui-bulk-edit.logs.filter.title.status" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.STATUS)}
        >
          <CheckboxFilter
            dataOptions={FILTER_OPTIONS.STATUS}
            name={FILTERS.STATUS}
            selectedValues={activeFilters[FILTERS.STATUS]}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          closedByDefault={false}
          displayClearButton={!!activeFilters[FILTERS.CAPABILITY]}
          header={FilterAccordionHeader}
          id={FILTERS.CAPABILITY}
          label={<FormattedMessage id="ui-bulk-edit.logs.filter.title.capability" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.CAPABILITY)}
        >
          <CheckboxFilter
            dataOptions={FILTER_OPTIONS.CAPABILITY}
            name={FILTERS.CAPABILITY}
            selectedValues={activeFilters[FILTERS.CAPABILITY]}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          closedByDefault={false}
          displayClearButton={!!activeFilters[FILTERS.OPERATION_TYPE]}
          header={FilterAccordionHeader}
          id={FILTERS.OPERATION_TYPE}
          label={<FormattedMessage id="ui-bulk-edit.logs.filter.title.types" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.OPERATION_TYPE)}
        >
          <CheckboxFilter
            dataOptions={FILTER_OPTIONS.OPERATION_TYPE}
            name={FILTERS.OPERATION_TYPE}
            selectedValues={activeFilters[FILTERS.OPERATION_TYPE]}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          closedByDefault
          displayClearButton={!!activeFilters[FILTERS.START_DATE]}
          header={FilterAccordionHeader}
          id={FILTERS.START_DATE}
          label={<FormattedMessage id="ui-bulk-edit.logs.filter.startDate" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.START_DATE)}
        >
          <DateRangeFilter
            name={FILTERS.START_DATE}
            selectedValues={getDateRange(activeFilters[FILTERS.START_DATE])}
            makeFilterString={getDateFilter}
            dateFormat={DATE_FORMAT}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          closedByDefault
          displayClearButton={!!activeFilters[FILTERS.END_DATE]}
          header={FilterAccordionHeader}
          id={FILTERS.END_DATE}
          label={<FormattedMessage id="ui-bulk-edit.logs.filter.endDate" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.END_DATE)}
        >
          <DateRangeFilter
            name={FILTERS.END_DATE}
            selectedValues={getDateRange(activeFilters[FILTERS.END_DATE])}
            makeFilterString={getDateFilter}
            dateFormat={DATE_FORMAT}
            onChange={onChange}
          />
        </Accordion>
      </AccordionSet>
    </div>
  );
};

LogsFilters.propTypes = {
  onChange: PropTypes.func,
  activeFilters: PropTypes.object,
  resetFilter: PropTypes.func,
};