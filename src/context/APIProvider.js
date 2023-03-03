import { useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPIContext from './fetchAPIContext';
import useFetchAPI from '../hooks/useFetchAPI';

function APIProvider({ children }) {
  const { data } = useFetchAPI();
  const [filteredPlanet, setFilterName] = useState({
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
    const { selectedFilters } = filteredPlanet;
    setFilterName({
      ...filteredPlanet,
      selectedFilters: [...selectedFilters, selectionComparation],
    });
    setSelectionComparation({
      column: 'population',
      comparationFilter: 'maior que',
      initialNumber: 0,
    });
  };

  const handleResetFilters = () => {
    setFilterName({
      name: '',
      selectedFilters: [],
    });
  };

  const handleColumns = (columns, filteredElements) => {
    if (filteredElements.selectedFilters.length < 1) {
      return columns;
    }
    const columnsSearched = filteredElements.selectedFilters.map(({ column }) => column);
    return columns.filter((element) => (
      columnsSearched.indexOf(element)
    ));
  };

  const handleToDeleteFilter = (column, comparationFilter, initialNumber) => {
    const { selectedFilters } = filteredPlanet;
    const newFilter = selectedFilters.filter((filtered) => (
      filtered.column !== column
        || filtered.comparationFilter !== comparationFilter
        || filtered.initialNumber !== initialNumber
    ));
    setFilterName({
      ...filteredPlanet,
      selectedFilters: newFilter,
    });
  };

  const handleName = (event) => {
    const { name, value } = event.target;
    setFilterName({
      ...filteredPlanet,
      [name]: value,
    });
  };

  let nameFiltered = [];
  if (data) {
    nameFiltered = data.filter((element) => element.name.includes(filteredPlanet.name));
  }

  const { selectedFilters } = filteredPlanet;

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
    filteredPlanet,
    handleResetFilters,
    handleName,
    handleSelectComparation,
    handleBtnSubmit,
    handleToDeleteFilter,
    handleColumns,
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
