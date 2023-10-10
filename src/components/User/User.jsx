import React from "react";
import "./User.css"

export const User = ({img, first,last, city, country}) => {
  return (
    <div className="user">
      <figure>
        <img src={img} alt="" />
      </figure>
      <div className="info">
        <h2 className="name">{first} {last}</h2>
        <p className="location">{city}, {country}</p>
      </div>
    </div>
  );
};
