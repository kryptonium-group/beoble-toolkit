import { useEffect, useState } from 'react';
import { Notification, Core } from '@beoble/js-sdk';

export const useNotification = (core: Core, userId?: string) => {
  const [notification, setNotification] = useState<Notification>();
  const [notis, setNotis] = useState([]);
  const hasNewMessage = notis.some((noti) => noti.type === '');

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
        console.log(data);
      });
      noti.on('message', (data) => {
        console.log(data);
      });
      setNotification(noti);
    }
  };

  const removeNoti = () => {
    return;
  };

  return { notification, hasNewMessage };
};
