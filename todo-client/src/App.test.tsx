import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { FetchMock } from 'jest-fetch-mock/types';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

// const fetchMock = fetch as FetchMock;

const mockData = [
  {
    id: '1',
    todo: 'hello world',
    createdAt: '1234'
  },
  {
    id: '2',
    todo: 'hello world 2',
    createdAt: '1234'
  },
  {
    id: '3',
    todo: 'hello world 3',
    createdAt: '1234'
  }
];

describe('Todo list', () => {
  beforeAll(fetchMock.enableMocks);
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Should render consistently', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    await act(async () => {
      const { baseElement } = render(<App />);

      await screen.findByText('hello world');

      expect(baseElement).toMatchSnapshot();
    });
  });

  it('Should log in case of error when fetching', async () => {
    expect.assertions(1);
    const error = Error('mock message');
    fetchMock.mockReject(error);
    const errorSpy = jest.spyOn(console, 'error');
    await act(async () => {
      render(<App />);

      setImmediate(() => {
        expect(errorSpy).toHaveBeenCalledWith(error);
      });
    });
  });

  it('Should delete item from list', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    fetchMock.mockResponse('', { status: 204 });
    await act(async () => {
      const { baseElement } = render(<App />);

      await screen.findByText('hello world');

      userEvent.click(screen.getByTestId('delete_2'));
      userEvent.click(screen.getByTestId('delete_3'));

      await waitForElementToBeRemoved(screen.getByTestId('delete_3'));

      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('Input Form', () => {
    it('Should create a new entry', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockData));
      fetchMock.mockResponseOnce(
        JSON.stringify({
          id: 4,
          todo: 'new item',
          createdAt: '123231'
        })
      );

      await act(async () => {
        render(<App />);

        await screen.findByText('hello world');

        userEvent.type(screen.getByPlaceholderText(/insert a /i), 'new item');
        userEvent.click(screen.getByTestId('save-btn'));

        await screen.findByText('new item');

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:4000/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            todo: 'new item'
          })
        });
      });
    });

    it('Should create a new entry with enter', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockData));
      fetchMock.mockResponseOnce(
        JSON.stringify({
          id: 4,
          todo: 'new item',
          createdAt: '123231'
        })
      );

      await act(async () => {
        render(<App />);

        await screen.findByText('hello world');

        userEvent.type(screen.getByPlaceholderText(/insert a /i), 'new item');
        fireEvent.keyDown(screen.getByPlaceholderText(/insert a /i), {
          key: 'Enter'
        });

        await screen.findByText('new item');

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:4000/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            todo: 'new item'
          })
        });
      });
    });
  });
});
