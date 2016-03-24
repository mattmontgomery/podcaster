import createReducer from './createReducer';

const initialState = {
    podcasts: []
};

const actionHandlers = {
    'FETCH_PODCASTS': (_, action) => {
        return { podcasts: action.payload };
    },
};

export default createReducer(initialState, actionHandlers);
