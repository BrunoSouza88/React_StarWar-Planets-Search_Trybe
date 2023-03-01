import { useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPIContext from './fetchAPIContext';
import useFetchAPI from '../hooks/useFetchAPI';

function APIProvider({ children }) {
  const { data } = useFetchAPI();
  const [filterName, setFilterName] = useState({
    name: '',
  });

  const handleName = (event) => {
    const { name, value } = event.target;
    setFilterName({
      ...filterName,
      [name]: value,
    });
  };

  let nameFiltered = [];
  if (data) {
    nameFiltered = data.filter((element) => element.name.includes(filterName.name));
  }

  const valueProvider = ({
    nameFiltered,
    handleName,
  });

  return (
    <fetchAPIContext.Provider value={ valueProvider }>
      {children}
    </fetchAPIContext.Provider>
  );
}

APIProvider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default APIProvider;
