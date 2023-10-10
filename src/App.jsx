import React, { useEffect, useState } from "react";
import "./styles.css";
import { User } from "./components/User/User";
import { useFetch } from "./utils/useFetch";

export const App = () => {
  const { info, status, getData } = useFetch({
    url: "https://randomuser.me/api?results=50",
    defaultVal: [],
  });
  const [value, setValue] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const handleChangeInput = (e) => {
    setSearching(true);
    const val = e.target.value;
    if (val.trim() === "") setSearching(false);
    setValue(val);
    const filteredUsers = info.filter((user) => {
      if (
        user.name.first.toLowerCase().includes(val.trim()) ||
        user.name.last.toLowerCase().includes(val.trim()) ||
        user.location.city.toLowerCase().includes(val.trim()) ||
        user.location.country.toLowerCase().includes(val.trim())
      ) {
        return user;
      }
    });

    setSearchedUsers(filteredUsers);
  };

  return (
    <div className="container">
      <div className="users-container">
        <header>
          <h2>Live User Filter</h2>
          <p>Search by Name and / or location</p>
          <input
            value={value}
            onChange={handleChangeInput}
            type="search"
            name=""
            id=""
            placeholder="Search"
          />
        </header>
        <div className="users">
          {searchedUsers.length !== 0 &&
            searching &&
            searchedUsers.map((user, index) => (
              <User
                key={index}
                img={user.picture.thumbnail}
                first={user.name.first}
                last={user.name.last}
                city={user.location.city}
                country={user.location.country}
              />
            ))}
          {searchedUsers.length === 0 && searching && (
            <figure className="not-found-cont">
              <img src="/public/urban-654.png" />{" "}
              <span className="notfound">User Not Found! </span>
            </figure>
          )}
          {!searching &&
            info.map((user, index) => (
              <User
                key={index}
                img={user.picture.thumbnail}
                first={user.name.first}
                last={user.name.last}
                city={user.location.city}
                country={user.location.country}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
