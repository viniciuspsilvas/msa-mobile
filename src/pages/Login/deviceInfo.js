import React, { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions'

import { Notifications } from 'expo';

import Constants from 'expo-constants';

export function useDeviceInfo() {
    const [tokenDevice, setTokenDevice] = useState("DEV_TOKEN");
    const [nameDevice, setNameDevice] = useState("DEV_DEVICE");

    async function getPermissionsNotifications() {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus === 'granted') {
            // Get the token that uniquely identifies this device
            setTokenDevice(Constants.isDevice ? await Notifications.getExpoPushTokenAsync() : "DEV_TOKEN")
            setNameDevice(Expo.Constants.deviceName)
        }
    }

    useEffect(() => {
        getPermissionsNotifications();
    }, []);

    return { tokenDevice, nameDevice };
}
