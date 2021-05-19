import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { axiosWithAuth }from "../Utils/axiosWithAuth";


const initialValues = {
    name: "",
    age: "",
    email: ""
}

const FriendsList = () => {
const [values, setValues] = useState(initialValues);
const [friends, setFriends] = useState([])

useEffect(() => {
    getData()

}, [])

const getData = () => {
    axiosWithAuth()
        .get("/friends")
        .then(res => {
            setFriends(res.data)
        })
        .catch(err => console.log(err))
}

const formatData = () => {
    const formattedData = [];
    friends.map(friend => {
        formattedData.push({
            key: friend.id,
            name: friend.name,
            age: friend.age,
            email: friend.email
        })
    return formattedData;
    })
}

const handleChange = (e) => {
    setValues({
        ...values, [e.target.name]: e.target.value
    })
    return values
}

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/friends", formatData)
    .then(res => {
        getData()
    })
    .catch(err=> console.log(err));

}

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>Name
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                />
            </label>
            <label>Age
                <input
                    type="text"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                />
            </label>
            <label>Email
                <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
            </label>
            <button>Submit</button>
        </form>
        {
            friends.map((friend) => {
                return (
                    <div>
                    <h2>{friend.name}</h2>
                    <h3>{friend.age}</h3>
                    <h4>{friend.email}</h4>
                    </div>
                )
            })
        }
        </div>
    )
}

export default FriendsList;