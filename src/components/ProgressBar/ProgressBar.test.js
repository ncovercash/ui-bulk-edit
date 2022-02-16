import { render, screen } from '@testing-library/react';
import React from 'react';
import { useOkapiKy } from '@folio/stripes/core';
import { QueryClientProvider } from 'react-query';
import { ProgressBar } from './ProgressBar';
import { queryClient } from '../../../test/jest/utils/queryClient';

const renderProgressBar = (props) => {
  render(
    <QueryClientProvider client={queryClient}>
      <ProgressBar {...props} />
    </QueryClientProvider>,
  );
};


describe('ProgressBar', () => {
  const progress = 55;
  const props = {
    title: 'title',
    updatedId: '1',
  };

  beforeEach(() => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => ({
            progress: {
              progress,
            },
            status: 'SUCCESSFUL',
          }),
        }),
      });
  });

  it('should display correct title', async () => {
    renderProgressBar(props);

    const title = await screen.findByText(props.title);

    expect(title).toBeVisible();
  });

  it('should display correct width percentage', async () => {
    renderProgressBar(props);

    const progressLine = await screen.findByTestId('progress-line');

    expect(progressLine).toBeVisible();
    expect(progressLine.getAttribute('style')).toBe(`width: ${progress}%;`);
  });
});