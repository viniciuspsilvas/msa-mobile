import React from 'react'

export const required = value => (value ? undefined : 'Required!');

export const email = value =>
    value && /(.+)@(.+){2,}\.(.+){2,}/i.test(value)
        ? undefined
        : 'Invalid email!';

export const getDaysFromDate = (date) => {

    let dateNew = new Date(date);
    var res = Math.abs(Date.now() - dateNew) / 1000;
    var days = Math.floor(res / 86400);

    return days;
}

