import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import env from './URLs'

import './dd.css'
import URLs from "./URLs";

import d from './dd.svg'

function App() {
  const [bilets, setBilets] = useState([]);

  const setAdgili = async (item) => {
    let id = localStorage.getItem("id")
    let result = await axios.post("http://192.168.100.22:3001/changeBiletStatus", { item,id })
    alert(result.data)
  };

  const changeStatus = (re) => {
    setBilets( 
      (
        items //pass callback to the setter from useState
      ) =>
        items.map(
          (item) =>
            item._id === re._id
              ? { ...item, status: re.status, name_id: re.name_id } //copy item with changed value
              : item //not this item, just return the item
        )
    );
  };
  useEffect(() => {
    const socket = io(`${URLs.socketURL}/socket`);

    socket.on("newThought", (thought) => {
      console.log(thought);
      changeStatus(thought);
      // setState({ thoughts: [...state.thoughts, thought] });
    });
    // const socket = io(`http://localhost:3001/api/socket`);

    socket.on("changeBillets", (thought) => {
      console.log(thought);
      // setBilets(thought);
    });
    const regData = {
      name_ge: 'nameGeo',
      surname_ge: 'surnameGeo',
      name_en: 'nameEng',
      surname_en: 'surnameEng',
      birthday: '03/11/2021',
      email: 'email@gmail.ru',
      mobile: 'phone',
      password: 'password',
      password_confirmation: 'Password',
      address: 'adress',
      idnumber: '60349530459',
      sex: 'male',
      citizen: 1,
      city: 1,
      // checkBoxStatus: localStorage.getItem('checkBoxStatus') == 'false' ? false : true,
    }
    axios.post('http://test.servicege.net/api/register', {name_ge: 'nameGeo',
    surname_ge: 'surnameGeo',
    name_en: 'nameEng',
    surname_en: 'surnameEng',
    birthday: '03/11/2021',
    email: 'email@gmail.ru',
    mobile: 'phone',
    password: 'password',
    password_confirmation: 'Password',
    address: 'adress',
    idnumber: '60349530459',
    sex: 'male',
    citizen: 1,
    city: 1,}).then(res => {
      console.log(res);
    })

    axios.post("http://192.168.100.22:3001/getbillets").then((data) => {
      setBilets(data.data.data);
    });
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex", padding: 20, margin: 10 }}>
        {console.log(bilets)}
        {bilets.map((item) => {
          return (
            <>
              {item.status == 1 && localStorage.getItem('id') == item.name_id && (
                <div
                  // onClick={() => setAdgili(item)}
                  id={item._id}
                  style={{
                    backgroundColor: "red",
                    height: 20,
                    width: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  {item.status}
                </div>
              )}
               {item.status == 1 && localStorage.getItem('id') != item.name_id && (
                <div
                  // onClick={() => setAdgili(item)}
                  id={item._id}
                  style={{
                    backgroundColor: "yellow",
                    height: 20,
                    width: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  {item.status}
                </div>
              )}
              {item.status == 0 && (
                <div
                onClick={() => setAdgili(item)}
                id={item._id}
                style={{
                  backgroundColor: "gray",
                  height: 20,
                  width: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                {item.status}
              </div>
              )}
              {item.status == -1 && (
                <div
                  // onClick={() => setAdgili(item)}
                  id={item._id}
                  style={{
                    backgroundColor: "blue",
                    height: 20,
                    width: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  {item.status}
                </div>
              )}
            </>
          );
        })}
      </div>
      <div>
      {/* <img src={d} usemap="#image-map"/> */}
      {/* <svg height="1000" width="1000" id="chemimapi">
         <circle cx="10" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="50" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="80" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="110" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="140" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="170" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="200" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="230" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="260" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="290" r="10" storke="black" fill="green"></circle>
         <circle cx="10" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="40" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="70" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="100" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="130" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="160" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="190" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="220" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="250" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="280" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="310" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="340" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="370" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="400" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="430" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="460" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="490" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="520" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="550" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="580" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="610" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="640" cy="320" r="10" storke="black" fill="green"></circle>
         <circle cx="670" cy="320" r="10" storke="black" fill="green"></circle>
      </svg> */}
      {/* <button onClick={setDefault}>set default statuts</button> */}
      </div>
    </div>
  );
}

export default App;
