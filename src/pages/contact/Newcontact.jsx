import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./newContact.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewContact = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error, } = useFetch("http://localhost:5000/api/contact/getAll");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`http://localhost:5000/api/rooms/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <Link to="/contact" className="goBackButton">Go Back</Link>
        </div>
        {/* Rest of the component */}
      </div>
    </div>
  );
};

export default NewContact;
