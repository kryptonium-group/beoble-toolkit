import { useEffect, useState } from 'react';
import { Notification, Core, INotiMessage } from '@beoble/js-sdk';

export const useNotification = (core: Core, userId?: string) => {
  const [notification, setNotification] = useState<Notification>();
  const [notis, setNotis] = useState<INotiMessage[]>([]);
  const hasNewMessage = notis.some(
    (noti) => noti.message_type === 'NEW_MESSAGE'
  );

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
      noti.onMessage((data) => {
        setNotis((prev) => [...prev, data]);
      });
      setNotification(noti);
    }
  };

  const shiftNoti = (callback?: (noti?: INotiMessage) => void) => {
    const firstElem = notis.at(0);
    callback && callback(firstElem);
    setNotis((notis) => notis.slice(1));
    return firstElem;
  };

  return { notification, hasNewMessage, shiftNoti };
};
