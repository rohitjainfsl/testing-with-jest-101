import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const RandomUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("https://randomuser.me/api");
      setUser(response.data.results[0]);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {user.name.first} {user.name.last}
      </h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default RandomUser;
