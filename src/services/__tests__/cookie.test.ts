import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

describe('cookie', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should set a cookie', () => {
    setCookie('test', 'value', { expires: 3600 });

    expect(document.cookie).toContain('test=value');
  });

  it('should get a cookie', () => {
    document.cookie = 'test=value';

    const cookie = getCookie('test');
    expect(cookie).toEqual('value');
  });

  it('should delete a cookie', () => {
    document.cookie = 'test=value';

    deleteCookie('test');
    expect(document.cookie).not.toContain('test=value');
  });

  it('should set a cookie with expiration', () => {
    const date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60);
    setCookie('test', 'value', { expires: date });

    expect(document.cookie).toContain('test=value');
  });
});
