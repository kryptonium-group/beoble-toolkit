import { useEffect, useState } from 'react';
import { Notification } from '@beoble/js-sdk';

export const useNotification = () => {
  const [notification, setNotification] = useState<Notification>();

  useEffect(() => {
    openNotification();
    return () => {
      notification?.close();
    };
  }, []);

  const openNotification = async () => {
    const noti = new Notification({});
    await noti.open();
    setNotification(noti);
  };

  return { notification };
};
