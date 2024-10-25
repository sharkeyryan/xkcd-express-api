import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3005/comic?comic=random');

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (e) {
      setError('An error occurred while fetching the data');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data.title}</h1>
        <img className="App-image" src={data.image_url} title={data.alt_text} alt={data.alt_text} />
        <a href={data.title_link} target="blank" className="App-link">Open Comic (#{data.num})</a>
      </header>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
