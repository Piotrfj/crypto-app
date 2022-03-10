import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import PageWrapper from '../components/PageWrapper';

describe('Crypto App', () => {
  it('should display select at the beginning', () => {
    render(<PageWrapper/>)
    screen.getByText('Choose a coin');
  });

  it('should display added elements in coin list and chart list after choosing coin from select', () => {
    render(<PageWrapper/>)
    const select = screen.getByTestId('select');
    const buttonList = screen.getByTestId('currencies-list');
    const chartList = screen.getByTestId('chart-list');

    fireEvent.change(select, { target: { value: 'bitcoin' } });

    within(buttonList).getByText('bitcoin');
    within(chartList).getByText('bitcoin', {exact: false});
  })

  it('select value should be cleared after selection', () => {
    render(<PageWrapper/>)
    const select: HTMLSelectElement = screen.getByTestId('select');
    fireEvent.change(select, { target: { value: 'bitcoin' } });

    expect(select).toHaveValue('');
  })

  it('should remove a coin from button list and chart list after clicking delete button', () => {
    render(<PageWrapper/>)
    const select = screen.getByTestId('select');
    const buttonList = screen.getByTestId('currencies-list');
    const chartList = screen.getByTestId('chart-list');

    fireEvent.change(select, { target: { value: 'bitcoin' } });

    const deleteButton = within(buttonList).getByText('bitcoin');
    within(chartList).getByText('bitcoin', {exact: false});

    fireEvent.click(deleteButton);

    expect(within(buttonList).queryByText('bitcoin')).toBeNull();
    expect(within(chartList).queryByText('bitcoin', {exact: false})).toBeNull();
  })

  it('should not add a coin if one already exist on list', () => {
    render(<PageWrapper/>)
    const select = screen.getByTestId('select');
    const buttonList = screen.getByTestId('currencies-list');

    fireEvent.change(select, { target: { value: 'bitcoin' } });
    fireEvent.change(select, { target: { value: 'bitcoin' } });

    expect(within(buttonList).getAllByText('bitcoin')).toHaveLength(1);
  })

  it('should not add a coin if there are already 5 on list', () => {
    render(<PageWrapper/>)
    const select = screen.getByTestId('select');
    const buttonList: HTMLDivElement = screen.getByTestId('currencies-list');

    fireEvent.change(select, { target: { value: 'bitcoin' } });
    fireEvent.change(select, { target: { value: 'ethereum' } });
    fireEvent.change(select, { target: { value: 'monero' } });
    fireEvent.change(select, { target: { value: 'dogecoin' } });
    fireEvent.change(select, { target: { value: 'polkadot' } });
    fireEvent.change(select, { target: { value: 'litecoin' } });

    expect(within(buttonList).getAllByRole('button')).toHaveLength(5);
    expect(within(buttonList).queryByText('litecoin')).toBeNull();
  })
})