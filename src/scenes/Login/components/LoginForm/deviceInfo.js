import React, { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions'

export function useDeviceInfo() {
    const [tokenDevice, setTokenDevice] = useState(null);
    const [deviceDesc, setDeviceDesc] = useState(null);

    useEffect(async () => {
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
        setTokenDevice(Constants.isDevice ? await Notifications.getExpoPushTokenAsync() : "DEV_TOKEN")
        setDeviceDesc(Expo.Constants.deviceName)
    }, []);

    return { tokenDevice, deviceDesc };
}