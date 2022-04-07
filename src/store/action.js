export const FETCH_PASSENGER_LIST = "FETCH_PASSENGER_LIST";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const SET_SPINNER = "SET_SPINNER";

export const fetchPassengerList = (data) => {
  return {
    type: FETCH_PASSENGER_LIST,
    payload: data,
  };
};

export const setLoading = () => {
  return {
      type : SET_SPINNER
  }
}

export const setCurrentPage = (data) => {
  return {
    type: CURRENT_PAGE,
    payload: data,
  };
};



export const handleFetchPassgengerList = (page) => {
  return async(dispatch) => {
      try {
          dispatch(setLoading())
          const res = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`);
          if(!res.ok) {
              throw new Error("Failed to fetch the data");
          }
          const data = await res.json();
          // console.log(data)
          dispatch(setLoading())
          dispatch(fetchPassengerList(data));
      } catch (error) {
          console.log(error.message)
      }
  }
}
