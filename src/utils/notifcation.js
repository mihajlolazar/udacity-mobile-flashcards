import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { ASYNC_STORAGE_DECK_KEY } from './api';

const NOTIFICATION_KEY = ASYNC_STORAGE_DECK_KEY + ':notifications'

function createNotification () {
  return {
    title: 'Add new Decks!',
    body: "👋 don't forget to add new Decks and Questions!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function clearNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                if (status === 'granted') {
                  Notifications.cancelAllScheduledNotificationsAsync();

                  let tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  tomorrow.setHours(21);
                  tomorrow.setMinutes(0);

                  Notifications.scheduleLocalNotificationAsync(
                      createNotification(),
                      {
                        time: tomorrow,
                        repeat: 'day',
                      }
                  );

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
              })
        }
      })
}