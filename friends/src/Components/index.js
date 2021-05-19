import React, { useState } from 'react'
import axios from "axios";

const initialValues = {
    body: {
    username: "",
    password: ""
  }
}

const Login = () => {
const [values, setValues] = useState(initialValues.body);
const [isLoading, setIsLoading] = useState(false);

const handleChange = (e) => {
    setValues({
        ...values, [e.target.name]: e.target.value
    })
    return values;
}

const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", values)
    .then(res => {
        localStorage.setItem("token", res.data.payload);
    })
    .catch(err => console.log(err));
}

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Username
                    <input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                </label>
                <label>Password
                    <input
                        type="text"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login;