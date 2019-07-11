import axios from 'axios';
import config from '../../../config/config'

export const FETCH_CATEGORIE_BEGIN = 'FETCH_CATEGORIE_BEGIN';
export const FETCH_CATEGORIE_SUCCESS = 'FETCH_CATEGORIE_SUCCESS';
export const FETCH_CATEGORIE_FAILURE = 'FETCH_CATEGORIE_FAILURE';
export const CATEGORIE_SELECTED = 'CATEGORIE_SELECTED';
export const UPDATE_LIST_CATEGORIES = 'UPDATE_LIST_CATEGORIES';

// Action creator
export function getCategoriesList(token, parent_id, page = 1) {

    return async dispatch => {

        try {
            dispatch({ type: FETCH_CATEGORIE_BEGIN });

            const options = {
                headers: {},
                params: {
                    page: page
                }
            };

            if (parent_id) options.params = { parent_id: parent_id }

            if (token) {
                options.headers.Authorization = 'Bearer' + token
            }

            const url = `${config.backend.baseUrl}staging${config.backend.categories}`
            const { data } = await axios.get(url, options);
            const listCategories = dataToCategorie(data.data);

            if (page > 1) {
                dispatch({ type: UPDATE_LIST_CATEGORIES, payload: listCategories });

                // if the fecthing comes from a refresh from Flatlist (pagination)
            } else {
                const aux = {
                    listCategories: listCategories,
                    lastPageCategories: data.meta.last_page // Used to do pagination
                }
                dispatch({ type: FETCH_CATEGORIE_SUCCESS, payload: aux });
            }

            return data

        } catch (error) {
            dispatch({ type: FETCH_CATEGORIE_FAILURE, payload: error })
        }
    };
}


function dataToCategorie(data) {
    const listCategories = []

    data.forEach(categorie => {
        if (categorie.title != '') {

            console.log("image", categorie.meta.image)

            const item = {
                id: categorie.id,
                name: categorie.name,
                subtitle: categorie.subtitle,
                image: categorie.meta.image,
            }
            listCategories.push(item);
        }
    });

    return listCategories;
}

export function setCategorieSelected(categorie) {
    return dispatch => {
        dispatch({ type: CATEGORIE_SELECTED, payload: categorie });
    }
}