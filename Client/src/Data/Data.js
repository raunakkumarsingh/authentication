import React from "react";
import { useState, useEffect } from "react";
import "./data.css";
import { useNavigate } from "react-router";

function Data() {
    let history = useNavigate();
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    mobileno: "",
    jobrole: "",
  });
  const [flag, setFlag] = useState();
  const [data, setData] = useState([
    { _id: "", name: "", mobileno: "", jobrole: "", __v: 0 },
  ]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data/getdata", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const json = await response.json();
        if(json.error=="token expire"){
            localStorage.removeItem("token");
            localStorage.clear();
            history("/login", { replace: true });
            window.location.reload();
        }
        setData(JSON.parse(json));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loader]);

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/data/adddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: credentials.name,
        mobileno: credentials.mobileno,
        jobrole: credentials.jobrole,
      }),
    });
    const json = await response.json();
    console.log(json);
    setLoader(false);
    if (response.status == 200) {
      alert("Data added succesfully");
    } else {
      alert(json.error);
    }
  };
  return (
    <div className="d-flex justify-content-between">
      <div
        className="containers d-flex justify-content-start mx-4 my-2"
        id="log"
      >
        <div className="datacard d-flex justify-content-start">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="InputData" className="form-label mx-4">
                  Name
                </label>
                <input
                  type="text"
                  style={{ width: "25rem" }}
                  className={`form-control mx-4 `}
                  name="name"
                  onChange={onChange}
                  id="InputData"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputData1" className="form-label mx-4">
                  Mobile no
                </label>
                <input
                  type="text"
                  style={{ width: "25rem" }}
                  className={`form-control mx-4`}
                  name="mobileno"
                  onChange={onChange}
                  id="InputData1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputData2" className="form-label mx-4">
                  jobrole
                </label>
                <input
                  type="text"
                  style={{ width: "25rem" }}
                  className={`form-control mx-4`}
                  name="jobrole"
                  onChange={onChange}
                  id="InputData2"
                />
              </div>

              <button type="submit" className="btn btn-primary mx-4">
                Add Data &nbsp;
                <span
                  className="spinner-border spinner-border-sm my-1"
                  role="status"
                  aria-hidden="true"
                  style={{ display: loader ? "flex" : "none" }}
                ></span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="containers d-flex justify-content-end ">
        <table className="table scrollable-table-container">
          <thead>
            <tr className="headings">
              <th scope="col">Q-ID</th>
              <th scope="col">Name</th>
              <th scope="col">Mobileno</th>
              <th scope="col">Jobrole</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((element) => (
                <tr key={element._id}>
                  <td>{element._id}</td>
                  <td>{element.name}</td>
                  <td>{element.mobileno}</td>
                  <td>{element.jobrole}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Data;
