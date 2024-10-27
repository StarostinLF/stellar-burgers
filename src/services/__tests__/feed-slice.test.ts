import {
  feedSlice,
  fetchFeed,
  initialState,
  TFeedState
} from '../slices/feed-slice';
import { PayloadAction } from '@reduxjs/toolkit';

describe('feedSlice', () => {
  let state: TFeedState;

  beforeEach(() => {
    state = initialState;
  });

  it('Тест initialState', () => {
    expect(state).toEqual(initialState);
  });

  it('Тест fetchFeed pending', () => {
    const action: { type: string } = { type: fetchFeed.pending.type };
    const newState = feedSlice.reducer(state, action);

    expect(newState.isLoading).toBe(true);
  });

  it('Тест fetchFeed fulfilled', () => {
    const mockOrders = [
      {
        _id: '66fd90d407cc0b001c1d5640',
        ingredients: [
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
        createdAt: '2024-10-02T18:28:36.435Z',
        updatedAt: '2024-10-02T18:28:37.209Z',
        number: 54862
      },
      {
        _id: '66fd903807cc0b001c1d563d',
        ingredients: [
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Альфа-сахаридный краторный экзо-плантаго фалленианский бургер',
        createdAt: '2024-10-02T18:26:00.604Z',
        updatedAt: '2024-10-02T18:26:01.319Z',
        number: 54861
      }
    ];
    const action: PayloadAction<{
      orders: typeof mockOrders;
      total: number;
      totalToday: number;
    }> = {
      type: fetchFeed.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 54488,
        totalToday: 72
      }
    };
    const newState = feedSlice.reducer(state, action);

    expect(newState.orders).toEqual(mockOrders);
    expect(newState.total).toBe(54488);
    expect(newState.totalToday).toBe(72);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('Тест fetchFeed rejected', () => {
    const action: { type: string; error: { message: string } } = {
      type: fetchFeed.rejected.type,
      error: { message: 'Ошибка запроса' }
    };
    const newState = feedSlice.reducer(state, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка запроса');
  });
});
