import React, { useEffect } from "react";
import Pagination from "../Pagination";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchPassgengerList } from "../store/action";
import Heading from "./Heading";
import Spinner from "./Spinner";

export default function App() {
  const dispatch = useDispatch();
  const { currentPage, loading , ObjectsOfPassengers, PageStorage } = useSelector(
    (state) => state.passenger
  );
  console.log(PageStorage);

  const PageVisited = PageStorage.find(page => page === currentPage); 

  useEffect(() => {
    if(!PageVisited) {
      dispatch(handleFetchPassgengerList(currentPage))
    }
  },[dispatch, PageVisited, currentPage])


  if (loading) {
    return <Spinner />;
  }
  console.log(ObjectsOfPassengers)

  return (
    <div className="App">
      <Heading />
      <br/>
      <table className="table_responsive">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Trips</th>
            <th>Airline Name</th>
            <th>Airline Country</th>
            <th>Slogan</th>
            {/* <th>Head Quaters</th> */}
            <th>Website</th>
            {/* <th>Established</th> */}
            {/* <th>LOGO</th> */}
          </tr>
        </thead>
        <tbody>
          {ObjectsOfPassengers[currentPage]?.length > 0 &&
        
            ObjectsOfPassengers[currentPage].map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.trips}</td>
                  <td>{item.airline[0].name}</td>
                  <td>{item.airline[0].country}</td>
                  <td>{item.airline[0].slogan}</td>
                  {/* <td>{item.airline[0].head_quaters}</td> */}
                  <td>{item.airline[0].website}</td>
                  {/* <td>{item.airline[0].established}</td> */}
                  {/* <td>
                    <img
                      src={
                        !item.airline[0].logo
                          ? "https://img.freepik.com/free-vector/airplane-flying-around-earth_1308-10407.jpg?w=900" : item.airline[0].logo
                      }
                      alt="logo"
                    />
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
        <Pagination className="pagination-bar" />
    </div>
  );
}
