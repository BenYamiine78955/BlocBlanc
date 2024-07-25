import React, { useEffect, useState } from 'react';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const DashboardPage = () => {
  const [error, setError] = useState(null);
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        const response = await fetch(baseURI + 'api/client-count');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du nombre de clients');
        }
        const data = await response.json();
        setClientCount(data.count);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClientCount();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>Nombre de clients : {clientCount}</p>
      )}
    </div>
  );
};

export default DashboardPage;
