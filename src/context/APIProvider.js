import { useMemo } from 'react';
import PropTypes from 'prop-types';
import fetchAPIContext from './fetchAPIContext';
import useFetchAPI from '../hooks/useFetchAPI';

function APIProvider({ children }) {
  const { data } = useFetchAPI();

  const response = useMemo(() => ({
    data,
  }), [data]);

  return (
    <fetchAPIContext.Provider value={ response }>
      {children}
    </fetchAPIContext.Provider>
  );
}

APIProvider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default APIProvider;
