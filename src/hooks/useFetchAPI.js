import { useEffect, useState } from 'react';

const useFetchAPI = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      const URL = 'https://swapi.dev/api/planets';
      const response = await fetch(URL);
      const returnAPI = await response.json();
      const { results } = returnAPI;
      setData(results);
      console.log(results);
    };
    fetchAPI();
  }, []);

  return {
    data,
  };
};

export default useFetchAPI;
