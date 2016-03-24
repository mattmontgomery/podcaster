import request from 'qwest';

/**
 * @todo - Add fetchPodcast
 */

export function fetchPodcasts() {
    return (dispatch) => {
        return request.get(`/api/podcasts`)
        .then((xhr, response) => {
            dispatch({
                type: 'FETCH_PODCASTS',
                payload: response
            });
        }).catch((xhr) => {
            dispatch({
                type: 'FETCH_PODCASTS',
                payload: { code: xhr.status, message: xhr.statusText }
            });
        });
    };
}
