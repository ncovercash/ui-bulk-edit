export const bulkEditLogsData = Array(50).fill(null).map((_, index) => [
  {
    jobId: index,
    bulkOperationType: 'Edit',
    recordType: 'Item',
    status: 'New',
    runBy: 'Smith, Josh S',
    startedRunning: '11/12/2023 2:35AM',
    endedRunning: '10/12/2022 7:34AM',
    numberOfRecords: 100,
    processed: 55,
    editing: 'In app',
  },
  {
    jobId: index + 1,
    bulkOperationType: 'Delete',
    recordType: 'Holdings',
    status: 'Completed',
    runBy: 'Brown, Marry',
    startedRunning: '12/12/2022 7:34AM',
    endedRunning: '12/12/2022 7:34AM',
    numberOfRecords: 65,
    processed: 12,
    editing: 'In app',
  },
]).flat();

export const listUsers = {
  'header': [
    {
      'value': 'Status',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Last name',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'First name',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Barcode',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Patron group',
      'dataType': 'STRING',
      'visible': true,
    },
  ],
  'rows': Array(10).fill(null).map((_, index) => ({
    'row': [
      'Active',
      'Rick',
      'Psych',
      `${index}148573765`,
      'UC Department, Quarter',
    ],
  })),
};

export const listItems = {
  'header': [
    {
      'value': 'Barcode',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Status',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Item effective location',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Effective call number',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Item HRID',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Material type',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Permanent loan type',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Temporary loan type',
      'dataType': 'STRING',
      'visible': true,
    },
  ],
  'rows': Array(10).fill(null).map((_, index) => ({
    'row': [
      `${index}148573765`,
      'Checked out',
      'Main Library',
      'PR6056.I4588 B749 2016',
      'item000000000008',
      'book',
      'Can circulate',
      'Course reserves',
    ],
  })),
};

export const listHoldings = {
  'header': [
    {
      'value': 'Holdings HRID',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Permanent Location',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Temporary Location',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Call number prefix',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Call number',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Call number suffix',
      'dataType': 'STRING',
      'visible': true,
    },
    {
      'value': 'Holdings type',
      'dataType': 'STRING',
      'visible': true,
    },
  ],
  'rows': Array(10).fill(null).map((_, index) => ({
    'row': [
      `hold000000000002${index}`,
      'Main Library',
      'Location Temp',
      'A',
      '1958 A 8050',
      'B',
      'Physical',
    ],
  })),
};