import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('', () => {
  test('I am your test', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello, App!/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('', async () => {
    render(<App />);
    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);

    await waitFor(() => {
      const planet = screen.getByRole('cell', {
        name: /tatooine/i,
      });

      expect(planet).toBeInTheDocument();
    }, {timeout: 10000})
  });
  test('', async () => {
    render(<App />);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const columns = screen.getAllByRole('columnheader');

      expect(rows.length).toBe(11);
      expect(columns.length).toBe(13);
    }, {timeout: 10000});
  });
  test('', async () => {
    render(<App />);

    await waitFor(() => {

      const nameInput = screen.getByTestId('name-filter');

      expect(nameInput).toBeInTheDocument();

      userEvent.type(nameInput, 'Ta');

      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(1);
    }, {timeout: 10000})
  });
  test('', async () => {
    render(<App />);

    await waitFor(() => {

      const valueElement = screen.getByTestId('value-filter');
      const filterBtn = screen.getByTestId('button-filter');

      // expect(comparationInput).toBeInTheDocument();
      // expect(valueElement).toBeInTheDocument();
      // expect(filterBtn).toBeInTheDocument();
    }, {timeout: 10000})
  });
})

