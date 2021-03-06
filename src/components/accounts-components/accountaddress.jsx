import React, { Component, useState, useContext, useEffect } from "react";
import state from "./locations.json";
import { ProductContext } from "../context";
import { db } from "../../firebase";

const AddressContent = ({handleSubmit}) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [locations, setLocations] = useState(state);
  const [id, setId] = useState(Number);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userstate, setUserState] = useState("");
  const [userLGA, setUserLGA] = useState("");
  const { user, setUser } = useContext(ProductContext);

  useEffect(() => {
    //retrieveUserInfoFromFirestore()
  }, [user]);

  const retrieveUserInfoFromFirestore = () => {
    const docRef = db.collection("users").doc(user.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentUser(doc.data());
        } else {
        }
      })
      .catch((error) => {});
  };

  const handleSwitch = (event) => {
    const { name, value } = event.target;
  
    let id = event.target.selectedIndex;
    if (name === "state") {
      setId(id);
      setUserState(value);
    }
    if (name === "lga") {
      setUserLGA(value);
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "firstName") {
      setFirstName(value);
    }
    if (name === "lastName") {
      setLastName(value);
    }
    if (name === "phone") {
      setPhone(value);
    }
    if (name === "address") {
      setAddress(value);
    }
  };
  
    
   const handleSubmit = (event) => {
     event.preventDefault();
     const userRef = db.collection("users").doc(user.uid);

     return userRef
       .update({
         address: address,
         userState: userstate,
         userLGA: userLGA,
       })
       .then(() => {
         console.log("document successfully updated");
       })
       .catch(() => {
         console.log("error updating document");
       });
   };

  return (
    <div className="account-content">
      <div className="account-details">
        <div className="account-details-container">
         
            <h5>Address Details</h5>
            <div className="names">
              <label htmlFor="">
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={currentUser.firstName}
                />
              </label>

              <label htmlFor="">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={currentUser.lastName}
                />
              </label>
            </div>
            <div className="phone">
              <label htmlFor="">
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={currentUser.phoneNumber}
                />
              </label>
            </div>
            <div className="address">
              <label htmlFor="">
                Address
                <input
                  type="text"
                  onChange={handleChange}
                  name="address"
                  value={address}
                />
              </label>
            </div>
            <div className="state-lga">
              <label htmlFor="">
                State{" "}
                <select
                  name="state"
                  value={userstate}
                  onChange={handleSwitch}
                  id="select id"
                >
                  {locations.map((state) => {
                    return (
                      <option
                        key={state.state.id}
                        id={state.state.id}
                        value={state.state.name}
                      >
                        {state.state.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                City/LGA{" "}
                <select
                  name="lga"
                  value={userLGA}
                  onChange={handleSwitch}
                  id=""
                >
                  {locations[id].state.locals.map((lga) => {
                    return <option key={lga.id}>{lga.name}</option>;
                  })}
                </select>
              </label>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default AddressContent;
