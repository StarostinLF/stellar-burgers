import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredients-slice';
import { burgerConstructorSlice } from '../slices/burger-constructor-slice';
import { feedSlice } from '../slices/feed-slice';
import { ordersSlice } from '../slices/order-slice';
import { userSlice } from '../slices/user-slice';

describe('Тест инициализация Redux Store', () => {
  it('Должен корректно инициализировать store с правильными редьюсерами', () => {
    const store = configureStore({
      reducer: combineSlices(
        ingredientsSlice,
        userSlice,
        burgerConstructorSlice,
        ordersSlice,
        feedSlice
      )
    });

    expect(store.getState()).toEqual(store.getState());
  });
});
