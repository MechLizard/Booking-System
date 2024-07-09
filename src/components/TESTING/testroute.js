// App.js or any component
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/668ac38a597e7e53052c5832');
        setItem(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItem();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{item.name}</h1>
      <p>Value: {item.value}</p>
    </div>
  );
};

export default App;
