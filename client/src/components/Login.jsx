import React, { useState } from "react";
import axios from "axios";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await axios.post("http://localhost:3000/login", {
    //     username: username,
    //     password: password
    //   });

    //   const token = response.data.token;

    //   if (token) {
    //     setLoggedIn(true);
    //     localStorage.setItem("token", token);
    //     window.location.href = "/";
    //   } else {
    //     setError("Invalid credentials");
    //     setLoggedIn(true);

    //   }
    // } catch (error) {
    //   console.error(error);
    //   setError("Internal server error");
    //           setLoggedIn(true);

    // }
    setLoggedIn(true)
  };

  

  return (
    <div>
      <h2 className="text-4xl my-6 mx-36">Login</h2>
      <form
        className="bg-white mx-48 w-3/6 grid grid-cols-2 gap-10 font-bold"
        onSubmit={handleSubmit}
      >
        <label className="mt-6 mx-12 font-bold flex flex-col">
          User Name:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label className="mt-6 mx-12 font-bold flex flex-col">
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button
          className="mx-24 mt-6 mb-5 bg-red-600 text-white font-bold  py-2 px-8 rounded shadow border-2 border-red-300 hover:bg-transparent hover:text-red-500 transition-all duration-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
