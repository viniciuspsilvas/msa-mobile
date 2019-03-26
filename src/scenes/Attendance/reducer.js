import {
    FETCH_ATTENDANCE_BEGIN,
    FETCH_ATTENDANCE_SUCCESS,
    FETCH_ATTENDANCE_FAILURE,

} from './actions';

const initialState = {

    attendance: 0,

    isLoading: false,
    error: null,
};

export default function attendanceReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_ATTENDANCE_BEGIN:
            return { ...state, isLoading: true, error: null };
        case FETCH_ATTENDANCE_SUCCESS:
            return { ...state, isLoading: false, attendance: payload.return };
        case FETCH_ATTENDANCE_FAILURE:
            return { ...state, isLoading: false, error: payload.error, attendance: 0 };

        default:
            return state;
    }
}