import React, { useState } from "react";
import axios from "axios";
import "./pagecss.css";

const Home = () => {
  const [info, setinfo] = useState({});
  const [email, setemail] = useState("");
  const [group, setgroup] = useState("");
  const [van, setvan] = useState("");
  const [date, setdate] = useState("");
  const [leavetime, setleavetime] = useState("");
  const [returnby, setreturnby] = useState("");

  const sloturl = "http://localhost:3000/slot/id/" + van + ":" + date + ":";

  const search = (event) => {
    let free = true;

    if (event.key === "Enter") {
      let tripid = "";
      for (let i = parseInt(leavetime); i <= parseInt(returnby); i++) {
        try {
          axios.get(sloturl + toString(i)).then((response) => {
            console.log("it works");
            free = false;
          });

          console.log(free ? "we found it!" : "we did not find it");
        } catch (err) {}
      }
      if (free === true) {
        axios
          .post("http://localhost:3000/trip", {
            driveEmail: email,
            group: group,
            misc: van,
            timeout: parseInt(leavetime),
            timein: parseInt(returnby),
          })
          .then(function (response) {
            console.log("tried to post", response);
            tripid = response.data.id;
            console.log("test",tripid)
            for (let i = parseInt(leavetime); i <= parseInt(returnby); i++) {
          
              axios
                .post("http://localhost:3000/slot", {
                  info: van + ":" + date + ":" + i,
                  triplog: tripid,
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          })
          .catch(function (error) {
            console.log("tried to post", error);
          });

          
        //do post part here
        
      }
      setvan("");
      setdate("");
      setleavetime("");
      setreturnby("");
      setemail("");
      setgroup("");
    }
  };

  return (
    <div>
      <title>Booking</title>

      <h1>input schedualing info to book a van</h1>
      <div className="search">
        <input
          value={email}
          onChange={(event) => setemail(event.target.value)}
          onKeyPress={search}
          placeholder="input driver email"
          type="text"
        />
      </div>
      <div className="search">
        <input
          value={group}
          onChange={(event) => setgroup(event.target.value)}
          onKeyPress={search}
          placeholder="input charged group"
          type="text"
        />
      </div>
      <div className="search">
        <input
          value={van}
          onChange={(event) => setvan(event.target.value)}
          onKeyPress={search}
          placeholder="Select van, 1 through 5"
          type="text"
        />
      </div>

      <div className="search">
        <input
          value={date}
          onChange={(event) => setdate(event.target.value)}
          onKeyPress={search}
          placeholder="mm-dd-yy"
          type="text"
        />
      </div>
      <div className="search">
        <input
          value={leavetime}
          onChange={(event) => setleavetime(event.target.value)}
          onKeyPress={search}
          placeholder="Depature time (0-24)"
          type="text"
        />
      </div>
      <div className="search">
        <input
          value={returnby}
          onChange={(event) => setreturnby(event.target.value)}
          onKeyPress={search}
          placeholder="return time (0-24)"
          type="text"
        />
      </div>

      {info.main ? <h1>Temperature: {info.main.temp - 273}°C</h1> : null}
      {info.wind ? <h1>Wind speed: {info.wind.speed} MPH</h1> : null}
    </div>
    //the above part makes it so that nothing is displayed if no API retern is seen, this prevents errors and prevents empty text stuff floating
  );
};

export default Home;
