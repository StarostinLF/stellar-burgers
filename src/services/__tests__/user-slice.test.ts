import {
  userSlice,
  fetchRegisterUser,
  fetchLoginUser,
  fetchUser,
  initialState,
  TUserState
} from '../slices/user-slice';
import { PayloadAction } from '@reduxjs/toolkit';

describe('userSlice', () => {
  let state: TUserState;

  beforeEach(() => {
    state = initialState;
  });

  it('Тест initialState', () => {
    expect(state).toEqual(initialState);
  });

  it('Тест fetchRegisterUser pending', () => {
    const action: { type: string } = { type: fetchRegisterUser.pending.type };
    const newState = userSlice.reducer(state, action);

    expect(newState.isLoading).toBe(true);
  });

  it('Тест fetchRegisterUser fulfilled', () => {
    const mockUser = {
      email: 'avatar5919@mail.ru',
      name: 'Леонид'
    };
    const action: PayloadAction<{ user: typeof mockUser }> = {
      type: fetchRegisterUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const newState = userSlice.reducer(state, action);

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('Тест fetchRegisterUser rejected', () => {
    const action: { type: string; error: { message: string } } = {
      type: fetchRegisterUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const newState = userSlice.reducer(state, action);

    expect(newState.isAuthChecked).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка регистрации');
  });

  it('Тест fetchLoginUser pending', () => {
    const action: { type: string } = { type: fetchLoginUser.pending.type };
    const newState = userSlice.reducer(state, action);

    expect(newState.isLoading).toBe(true);
  });

  it('Тест fetchLoginUser fulfilled', () => {
    const mockUser = {
      email: 'avatar5919@mail.ru',
      name: 'Леонид'
    };
    const action: PayloadAction<{ user: typeof mockUser }> = {
      type: fetchLoginUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const newState = userSlice.reducer(state, action);

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('Тест fetchLoginUser rejected', () => {
    const action: { type: string; error: { message: string } } = {
      type: fetchLoginUser.rejected.type,
      error: { message: 'Ошибка логина' }
    };
    const newState = userSlice.reducer(state, action);

    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка логина');
  });

  it('Тест fetchUser pending', () => {
    const action: { type: string } = { type: fetchUser.pending.type };
    const newState = userSlice.reducer(state, action);

    expect(newState.isLoading).toBe(true);
  });

  it('Тест fetchUser fulfilled', () => {
    const mockUser = {
      email: 'avatar5919@mail.ru',
      name: 'Леонид'
    };
    const action: PayloadAction<{ user: typeof mockUser }> = {
      type: fetchUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const newState = userSlice.reducer(state, action);

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('Тест fetchUser rejected', () => {
    const action: { type: string; error: { message: string } } = {
      type: fetchUser.rejected.type,
      error: { message: 'Авторизованный пользователь не найден' }
    };
    const newState = userSlice.reducer(state, action);

    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Авторизованный пользователь не найден');
  });
});
