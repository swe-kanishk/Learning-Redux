export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  const BASE_URL = "https://fakestoreapi.com";

  if (action.type === "api/makeCall") {
    const { url, onStart, onSuccess, onError } = action.payload;

    dispatch({
        type: onStart
    });

    fetch(`${BASE_URL}/${url}`)
      .then((res) => res.json())
      .then((data) => dispatch({
        type: onSuccess,
        payload: data
      }))
      .catch((error) => {
        dispatch({
            type: onError,
            payload: error.message
        });
      });
  } else next(action);
};

export const fetchData = (payload) =>({type: 'api/makeCall', payload})