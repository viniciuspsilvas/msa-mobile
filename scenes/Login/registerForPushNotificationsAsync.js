import { Permissions, Notifications } from 'expo';
var config = require('../../config/config');

export async function registerForPushNotificationsAsync(userId) {

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  var advice = {
    "description": Expo.Constants.deviceName,
    "token": token,
    "customUserId": userId
  }

  var headerAdvice = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(advice)
  };

  return fetch(config.backend.userAdvices, headerAdvice).catch(err => console.error(err));

}

