import {
    FETCH_CATEGORIE_BEGIN,
    FETCH_CATEGORIE_SUCCESS,
    FETCH_CATEGORIE_FAILURE,
    CATEGORIE_SELECTED,
    UPDATE_LIST_CATEGORIES

} from './actions';

const initialState = {


    isLoading: false,
    error: null,
};

export default function categoriesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_CATEGORIE_BEGIN:
            return { ...state, isLoading: true, error: null };
        case FETCH_CATEGORIE_SUCCESS:

            return {
                ...state,
                isLoading: false,
       
            };

        case UPDATE_LIST_CATEGORIES:
            return {
                ...state,
                isLoading: false,

            };

        case FETCH_CATEGORIE_FAILURE:
            return { ...state, isLoading: false, error: payload.error, listCategories: [], currentPage: 1 };
        case CATEGORIE_SELECTED:
            return { ...state, categorieSelected: payload };

        default:
            return state;
    }
}