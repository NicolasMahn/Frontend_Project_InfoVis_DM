import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import MatrixChart from '../Charts/MatrixChart';

const GET_CARD_MATRICES_QUERY = gql`
  query matrices($matrixTitle: String, $matrixType: String) {
    matrices(matrixTitle: $matrixTitle, matrixType: $matrixType) {
      matrix, 
      xAxis, 
      yAxis
    } 
  }
`

const CarMatrixGraph = ({filterSettings, onFilterChange}) => {
  const [matrix, setMatrix] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState('');

  const title = "Matching Cars and Credit Cards";

  const { loading, error, d, refetch } = useQuery(GET_CARD_MATRICES_QUERY, {
    skip: true, // Skip the initial automatic query execution
    fetchPolicy: 'cache-and-network', // Use cache first, then network
  });

  useEffect(() => {
    let matrixType = filterSettings.type;

    if (matrixType === 'Absolute') {
      matrixType = 'absolute_matrix';
      setUnit(' similarity score');
    } else if (matrixType === 'Relative to Credit Card') {
      matrixType = 'relative_cc_matrix';
      setUnit('%');
    } else if (matrixType === 'Relative to Car ID') {
      matrixType = 'relative_car_matrix';
      setUnit('%');
    }
    refetch({matrixTitle: title, matrixType: matrixType }).then(response => {
      setData(response.data);
    }).catch(err => {
      console.error("Refetch error:", err);
    });
  }, [filterSettings, refetch]);

  useEffect(() => {
    if (data) {
      let filteredMatrix = data.matrices.matrix;
      let filteredXAxis = data.matrices.xAxis;
      let filteredYAxis = data.matrices.yAxis;

      if (filterSettings.creditCards) {
        const filteredIndices = filteredXAxis
          .map((x, i) => (filterSettings.creditCards.includes(x) ? i : -1))
          .filter(i => i !== -1);
      
        filteredMatrix = filteredMatrix.map(row => 
          row.filter((_, i) => filteredIndices.includes(i))
        );
        filteredXAxis = filteredXAxis.filter(x => filterSettings.creditCards.includes(x));
      }

      if (filterSettings.cars) {
        const filteredIndices = filteredYAxis
          .map((y, i) => (filterSettings.cars.includes(y) ? i : -1))
          .filter(i => i !== -1);
      
        filteredMatrix = filteredMatrix
          .filter((_, i) => filteredIndices.includes(i));
        filteredYAxis = filteredYAxis.filter(y => filterSettings.cars.includes(y));
      }

      setMatrix(filteredMatrix);
      setXAxis(filteredXAxis);
      setYAxis(filteredYAxis);
    }
  }, [data, filterSettings]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    
  const handleCellClick = (d) => {
    console.log("Cell clicked:", d);
  };

  const handleCellRightClick = (d) => {
    console.log("Cell right-clicked:", d);
  };

  const handleCellDoubleClick = (d) => {
    console.log("Cell double-clicked:", d);
  };

  return (
    <div>
      <h2 className="header">{title}</h2>
      <MatrixChart matrix={matrix} xAxis={xAxis} yAxis={yAxis} xAxisName={"Credit Cards"} yAxisName={"Car IDs"} unit={unit} onCellClick={handleCellClick} onCellRightClick={handleCellRightClick} onCellDoubleClick={handleCellDoubleClick}/>
    </div>
  );
}

export default CarMatrixGraph;
