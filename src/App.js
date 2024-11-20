import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://weather.tsukumijima.net/api/forecast/city/400040");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data.description)
  return (
    <div>
      {Object.keys(data.description).map(key => (
        <p>{key}.....{data.description[key]}</p>
      ))}
    </div>
  );
}

export default App;
// 
// 