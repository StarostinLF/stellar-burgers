import { TOrder } from '@utils-types';
import {
  ordersSlice,
  fetchOrderBurger,
  fetchOrderByNumber,
  fetchOrders,
  initialState,
  TOrdersState
} from '../slices/order-slice';
import { PayloadAction } from '@reduxjs/toolkit';

describe('ordersSlice', () => {
  let state: TOrdersState;

  beforeEach(() => {
    state = initialState;
  });

  it('Тест initialState', () => {
    expect(state).toEqual(initialState);
  });

  it('Тест fetchOrderBurger pending', () => {
    const action: { type: string } = { type: fetchOrderBurger.pending.type };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.isLoading).toBe(true);
  });

  it('Тест fetchOrderBurger fulfilled', () => {
    const mockOrder = {
      _id: '64833faf8a4b62001c8577a0',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Space антарианский краторный бургер',
      createdAt: '2023-06-09T15:05:19.020Z',
      updatedAt: '2023-06-09T15:05:19.110Z',
      number: 7954
    };
    const action: PayloadAction<{ order: TOrder }> = {
      type: fetchOrderBurger.fulfilled.type,
      payload: { order: mockOrder }
    };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.order).toEqual(mockOrder);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('Тест fetchOrderBurger rejected', () => {
    const action: { type: string; error: { message: string } } = {
      type: fetchOrderBurger.rejected.type,
      error: { message: 'Order burger error' }
    };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Order burger error');
  });

  it('Тест fetchOrderByNumber pending', () => {
    const action: { type: string } = { type: fetchOrderByNumber.pending.type };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.isLoading).toBe(true);
  });

  it('Тест fetchOrderByNumber fulfilled', () => {
    const mockOrder = {
      _id: '64833faf8a4b62001c8577a0',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Space антарианский краторный бургер',
      createdAt: '2023-06-09T15:05:19.020Z',
      updatedAt: '2023-06-09T15:05:19.110Z',
      number: 7954
    };
    const action: PayloadAction<{ orders: TOrder[] }> = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.order).toEqual(mockOrder);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('Тест fetchOrderByNumber rejected', () => {
    const action: { type: string; error: { message: string } } = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Fetch order by number error' }
    };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Fetch order by number error');
  });

  it('Тест fetchOrders pending', () => {
    const action: { type: string } = { type: fetchOrders.pending.type };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.isLoading).toBe(true);
  });

  it('Тест fetchOrders fulfilled', () => {
    const mockOrders = [
      {
        _id: '64833faf8a4b62001c8577a0',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Space антарианский краторный бургер',
        createdAt: '2023-06-09T15:05:19.020Z',
        updatedAt: '2023-06-09T15:05:19.110Z',
        number: 7954
      },
      {
        _id: '66a435cc119d45001b4fbdef',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-07-26T23:48:28.731Z',
        updatedAt: '2024-07-26T23:48:29.204Z',
        number: 47556
      }
    ];
    const action: PayloadAction<TOrder[]> = {
      type: fetchOrders.fulfilled.type,
      payload: mockOrders
    };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.orders).toEqual(mockOrders);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('Тест fetchOrders rejected', () => {
    const action: { type: string; error: { message: string } } = {
      type: fetchOrders.rejected.type,
      error: { message: 'Fetch orders error' }
    };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Fetch orders error');
  });

  it('Тест orderModalDataAction', () => {
    const mockOrder = {
      _id: '64833faf8a4b62001c8577a0',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Space антарианский краторный бургер',
      createdAt: '2023-06-09T15:05:19.020Z',
      updatedAt: '2023-06-09T15:05:19.110Z',
      number: 7954
    };
    const action: PayloadAction<TOrder | null> = {
      type: ordersSlice.actions.orderModalDataAction.type,
      payload: mockOrder
    };
    const newState = ordersSlice.reducer(state, action);

    expect(newState.order).toEqual(mockOrder);
  });

  it('Тест clearOrderModalDataAction', () => {
    const action = { type: ordersSlice.actions.clearOrderModalDataAction.type };
    const newState = ordersSlice.reducer(state, action);

    expect(newState).toEqual(initialState);
  });
});
