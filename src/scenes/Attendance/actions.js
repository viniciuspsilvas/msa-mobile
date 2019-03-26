import axios from 'axios';
import config from '../../../config/config'

export const FETCH_ATTENDANCE_BEGIN = 'FETCH_ATTENDANCE_BEGIN';
export const FETCH_ATTENDANCE_SUCCESS = 'FETCH_ATTENDANCE_SUCCESS';
export const FETCH_ATTENDANCE_FAILURE = 'FETCH_ATTENDANCE_FAILURE';

// Action
export const fetchAttendanceBegin = () => ({
    type: FETCH_ATTENDANCE_BEGIN
});

// Action
export const fetchAttendanceSuccess = attendance => ({
    type: FETCH_ATTENDANCE_SUCCESS,
    payload: attendance
});

export const fetchAttendanceFailure = error => ({
    type: FETCH_ATTENDANCE_FAILURE,
    payload: { error }
});

// Action creator
export function getAttendance(userDetails) {

    const filter = {
        params: {
            studentId: userDetails.id
        }
    }

    return dispatch => {
        dispatch(fetchAttendanceBegin());

        return axios.get(config.backend.getAttendance, filter)
            .then(({ data }) => {
                dispatch(fetchAttendanceSuccess(data));
                return data;
            })
            .catch(error => dispatch(fetchAttendanceFailure(error)));
    };
}