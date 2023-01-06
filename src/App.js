import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [check, setCheck] = useState(0);
  const [userdata, setUserdata] = useState([]);

  const fetchData = () => {
    return fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleClick = () => {
    return fetch(`https://reqres.in/api/users/${check}`)
      .then((response) => response.json())
      .then((data) => setUserdata(data));
    }

  useEffect(() => {
    handleClick();
  }, [])

  const users = Object.values(user)[4];

  return (
    <main>
      <div className="d-flex flex-column mb-3" style={{ textAlign: "center" }}>
        <h1 >Users</h1>
        <br />
        <div style={{ display: "flex", columnGap: "10px", justifyContent: "center" }}>
          {users && users.length > 0 &&  check == 0 && <h3 style={{color: "green"}}>Click on the button to see the details about user</h3>}
        </div>
        <div style={{ display: "flex", columnGap: "10px", justifyContent: "center" }}>
          {users && users.length > 0 && users.map((userObj, index) => userObj.id == check && 
            <div key={userObj.id} className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={userObj.avatar} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{userObj.first_name + " " + userObj.last_name}</h5>
                <p className="card-text">{userObj.email}</p>
              </div>
            </div>)
          }
        </div>
        <br />
        <div style={{ display: "flex", columnGap: "10px", justifyContent: "center" }}>
          {users && users.length > 0 && users.map((userObj, index) => (
            <div key={userObj.id}>
              <button type="button" className="btn btn-primary" onClick={() => { setCheck(userObj.id), handleClick() }}>{index+1}</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;