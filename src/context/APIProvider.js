import { useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPIContext from './fetchAPIContext';
import useFetchAPI from '../hooks/useFetchAPI';

function APIProvider({ children }) {
  const { data } = useFetchAPI();
  const [filterName, setFilterName] = useState({
    name: '',
    selectedFilters: [],
  });

  const [selectionComparation, setSelectionComparation] = useState({
    column: 'population',
    comparationFilter: 'maior que',
    initialNumber: 0,
  });

  const handleSelectComparation = (event) => {
    const { name, value } = event.target;
    setSelectionComparation({
      ...selectionComparation,
      [name]: value,
    });
  };

  const handleBtnSubmit = () => {
    const { selectedFilters } = filterName;
    setFilterName({
      ...filterName,
      selectedFilters: [...selectedFilters, selectionComparation],
    });
  };

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

  const { selectedFilters } = filterName;

  if (selectedFilters.length > 0) {
    selectedFilters.forEach((element) => {
      nameFiltered = nameFiltered.filter((element2) => {
        switch (element.comparationFilter) {
        case 'maior que':
          return ((element2[element.column]) * 1) > ((element.initialNumber) * 1);
        case 'igual a':
          return ((element2[element.column]) * 1) === ((element.initialNumber) * 1);
        case 'menor que':
          return ((element2[element.column]) * 1) < ((element.initialNumber) * 1);
        default:
          return null;
        }
      });
    });
  }

  const valueProvider = ({
    nameFiltered,
    handleName,
    handleSelectComparation,
    handleBtnSubmit,
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
