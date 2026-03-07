export const generateId = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : crypto.getRandomValues(new Uint16Array(16));
