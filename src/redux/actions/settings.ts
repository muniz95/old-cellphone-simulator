export const setColor = (payload: string) => ({ type: "SET_COLOR", payload });
export const setLanguage = (payload: string) => ({ type: "SET_LANGUAGE", payload });
export const setNotificationLevel = (payload: number) =>
  ({ type: "SET_NOTIFICATION_LEVEL", payload });
