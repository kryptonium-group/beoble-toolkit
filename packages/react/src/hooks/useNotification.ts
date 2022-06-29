import { useEffect, useState } from 'react';
import { Notification } from '@beoble/js-sdk';

export const useNotification = (appId: string, userId?: string) => {
  const [notification, setNotification] = useState<Notification>();

  useEffect(() => {
    openNotification();
    return () => {
      notification?.close();
    };
  }, [userId]);

  const openNotification = async () => {
    if (userId) {
      const noti = new Notification({
        app_id: appId,
        user_id: userId,
        authToken: 'sungmingodsungmingod',
      });
      await noti.open();
      setNotification(noti);
    }
  };

  return { notification };
};
