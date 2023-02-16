const initialState = {
  toggleSnackbar: false,
  snackbarMessage: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SNACKBAR_OPEN": {
      return {
        ...state,
        toggleSnackbar: true,
        snackbarMessage: action.message,
      };
    }

    case "TOGGLE_SNACKBAR_CLOSE": {
      return {
        ...state,
        toggleSnackbar: false,
        snackbarMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
