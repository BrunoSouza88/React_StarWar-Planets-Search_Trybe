import React, { useContext, useEffect } from 'react';
import WebFont from 'webfontloader';
import 'google-fonts';
import styles from './table.module.css';
import fetchAPIContext from '../../../context/fetchAPIContext';
import Loading from '../Loading/Loading';

function Table() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Star Wars'],
      },
    });
  }, []);

  const formSelect = 'form-select';
  const {
    nameFiltered,
    handleName,
    handleSelectComparation,
    handleBtnSubmit,
    handleToDeleteFilter,
    handleResetFilters,
    handleColumns,
    filteredPlanet,
    handlePlanetOrder,
    handlePlanetOrderFilter,
    isLoading,
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
    <div className={ styles['table-container'] }>
      {isLoading ? (
        <Loading />
      ) : (
        <form>
          <input
            type="text"
            name="name"
            data-testid="name-filter"
            onChange={ (event) => handleName(event) }
            className={ styles['form-input'] }
          />
          <select
            data-testid="column-filter"
            name="column"
            onChange={ (event) => handleSelectComparation(event) }
            className={ styles[formSelect] }
          >
            {categoriesColumns.map((column, index) => (
              <option key={ index }>{column}</option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            name="comparationFilter"
            onChange={ (event) => handleSelectComparation(event) }
            className={ styles[formSelect] }
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>

          <input
            type="number"
            data-testid="value-filter"
            name="initialNumber"
            defaultValue={ 0 }
            onChange={ (event) => handleSelectComparation(event) }
            className={ styles['form-input'] }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => handleBtnSubmit() }
            className={ styles.button }
          >
            Filtrar
          </button>
          <button
            data-testid="button-remove-filters"
            onClick={ () => handleResetFilters() }
            className={ styles.button }
          >
            Limpar Filtros
          </button>
          <div>
            <select
              data-testid="column-sort"
              name="column"
              onChange={ (event) => handlePlanetOrderFilter(event) }
              className={ styles[formSelect] }
            >
              {categoriesColumns.map((elemen, index) => (
                <option key={ index } value={ elemen } name="ascType">
                  {elemen}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="ASC" className={ styles['filters-label'] }>
            Ascendente
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              name="sort"
              value="ASC"
              onChange={ (event) => handlePlanetOrderFilter(event) }
              className={ styles['filters-radio'] }
            />
          </label>
          <label htmlFor="DESC" className={ styles['filters-label'] }>
            Descendente
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              name="sort"
              value="DESC"
              onChange={ (event) => handlePlanetOrderFilter(event) }
              className={ styles['filters-radio'] }
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ (event) => handlePlanetOrder(event) }
            className={ styles.button }
          >
            Ordenar
          </button>

          <div>
            {filteredPlanet.selectedFilters
              .map(({ column, comparationFilter, initialNumber }) => (
                <p
                  key={ initialNumber }
                  data-testid="filter"
                  className={ styles['filters-paragraph'] }
                >
                  {`${column} ${comparationFilter} ${initialNumber}`}
                  <button
                    type="button"
                    onClick={
                      () => handleToDeleteFilter(column, comparationFilter, initialNumber)
                    }
                    className={ styles['filters-button'] }
                  >
                    Limpar
                  </button>
                </p>
              ))}
          </div>
        </form>
      )}

      <table className={ styles.table }>
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
          {nameFiltered
            && nameFiltered.map((element, index) => (
              <tr key={ index }>
                {Object.values(element).map((value, index2) => (
                  <td
                    key={ value }
                    data-testid={ index2 === 0 ? 'planet-name' : '' }
                    className={ styles['table-cell'] }
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
