import {
    FETCH_CATEGORIE_BEGIN,
    FETCH_CATEGORIE_SUCCESS,
    FETCH_CATEGORIE_FAILURE,
    CATEGORIE_SELECTED,
    UPDATE_LIST_CATEGORIES

} from './actions';

const initialState = {

    listCategories: [],
    currentPage: 1,
    lastPageCategories: 1, // Used for pagination
    categorieSelected: null,
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
                listCategories: payload.listCategories,
                lastPageCategories: payload.lastPageCategories,
                currentPage: 1
            };

        case UPDATE_LIST_CATEGORIES:
            return {
                ...state,
                isLoading: false,
                listCategories: state.listCategories.concat(payload),
                currentPage: state.currentPage + 1
            };

        case FETCH_CATEGORIE_FAILURE:
            return { ...state, isLoading: false, error: payload.error, listCategories: [], currentPage: 1 };
        case CATEGORIE_SELECTED:
            return { ...state, categorieSelected: payload };

        default:
            return state;
    }
}