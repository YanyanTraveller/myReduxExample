import * as authorApi from "../../api/authorApi";

export function loadAuthorSuccess(authors) {
  return { type: "LOAD_AUTHORS_SUCCESS",  authors };
}

export function loadAuthors() {
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorSuccess(authors));
      })
      .catch((err) => {
        throw err;
      });
  };
}
