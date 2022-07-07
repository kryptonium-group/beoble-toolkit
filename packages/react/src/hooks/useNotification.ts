import { useEffect, useState } from 'react';
import { Notification, Core } from '@beoble/js-sdk';

export const useNotification = (core: Core, userId?: string) => {
  const [notification, setNotification] = useState<Notification>();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    openNotification();
    return () => {
      notification?.close();
    };
  }, [userId]);

  const openNotification = async () => {
    if (userId) {
      const noti = core.notification(userId);
      await noti.open();
      noti.onMessage('NEW_MESSAGE', (data) => {
        setHasNewMessage(true);
      });
      setNotification(noti);
    }
  };

  return { notification, hasNewMessage, setHasNewMessage };
};
