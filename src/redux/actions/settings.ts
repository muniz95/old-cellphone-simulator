export const setLanguage = (payload: string) => ({
  type: 'SET_LANGUAGE',
  payload,
});

export const setNotificationLevel = (payload: number) => ({
  type: 'SET_NOTIFICATION_LEVEL',
  payload,
});

export const setAlarmLevel = (payload: number) => ({
  type: 'SET_ALARM_LEVEL',
  payload,
});

export const setRingLevel = (payload: number) => ({
  type: 'SET_RING_LEVEL',
  payload,
});

export const setInactivityTime = (payload: number) => ({
  type: 'SET_INACTIVITY_TIME',
  payload,
});
