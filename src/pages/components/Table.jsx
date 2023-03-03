import React, { useContext } from 'react';
import fetchAPIContext from '../../context/fetchAPIContext';

function Table() {
  const {
    nameFiltered,
    handleName,
    handleSelectComparation,
    handleBtnSubmit,
    handleToDeleteFilter,
    handleResetFilters,
    handleColumns,
    filteredPlanet,
  } = useContext(fetchAPIContext);

  let categoriesColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  if (nameFiltered) {
    categoriesColumns = handleColumns(categoriesColumns, filteredPlanet);
  }

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          onChange={ (event) => handleName(event) }
        />
        <select
          data-testid="column-filter"
          name="column"
          onChange={ (event) => handleSelectComparation(event) }
        >
          {categoriesColumns.map((column, index) => (
            <option
              key={ index }
            >
              {column}
            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparationFilter"
          onChange={ (event) => handleSelectComparation(event) }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="initialNumber"
          onChange={ (event) => handleSelectComparation(event) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleBtnSubmit() }
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ () => handleResetFilters() }
        >
          Limpar Filtros
        </button>
        <div>
          <ul>
            {filteredPlanet.selectedFilters.map(({
              column, comparationFilter, initialNumber, index,
            }) => (
              <li key={ index } data-testid="filter">
                {`${column} ${comparationFilter} ${initialNumber}`}
                <button
                  type="button"
                  onClick={
                    () => handleToDeleteFilter(column, comparationFilter, initialNumber)
                  }
                >
                  Limpar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {nameFiltered && nameFiltered.map((element, index) => (
            <tr key={ index }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>
                {element.films.map((element2, index2) => (
                  <span key={ index2 }>
                    <a href={ element2 }>{element2}</a>
                  </span>
                ))}
              </td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>
                <a href={ element.url }>{element.url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
