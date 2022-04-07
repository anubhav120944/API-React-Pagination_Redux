import { FETCH_PASSENGER_LIST, CURRENT_PAGE, SET_SPINNER } from "./action";

const initialState = {
  totalCount: 0,
  totalPageCount: 0,
  ObjectsOfPassengers: {},
  PageStorage: [],
  loading: false,
  currentPage: 1,
};

export const PassengerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PASSENGER_LIST:
      const newPageStore = [...state.PageStorage, state.currentPage];
      return {
        ...state,
        totalCount: action.payload.totalPassengers,
        totalPageCount: action.payload.totalPages,
        ObjectsOfPassengers: {
          ...state.ObjectsOfPassengers,
          [state.currentPage]: action.payload.data,
        },
        PageStorage: newPageStore.filter(
          (item, index) => newPageStore.indexOf(item) === index
        ),
        loading: false,
      };

    case SET_SPINNER:
      return {
        ...state,
        loading: !state.loading,
      };

    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
