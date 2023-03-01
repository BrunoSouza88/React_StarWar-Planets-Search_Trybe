import React, { useContext } from 'react';
import fetchAPIContext from '../../context/fetchAPIContext';

function Table() {
  const { data } = useContext(fetchAPIContext);

  return (
    <div>
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

          {data && data.map((element, index) => (
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

        </thead>
      </table>
    </div>
  );
}

export default Table;
