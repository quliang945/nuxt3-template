/** 共享用户信息 **/
export const useToken = () =>
  useState<string>('token', () => {
    const token = useCookie<string | undefined>('token');
    return token.value ? 'Bearer ' + token.value : '';
  });
