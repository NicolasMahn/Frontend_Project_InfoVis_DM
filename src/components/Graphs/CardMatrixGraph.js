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

const CardMatrixGraph = ({filterSettings, onFilterChange}) => {
  const [matrix, setMatrix] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState('');

  const title = "Matching Credit and Loyalty Cards";

  const { loading, error, d, refetch } = useQuery(GET_CARD_MATRICES_QUERY, {
    skip: true, // Skip the initial automatic query execution
    fetchPolicy: 'cache-and-network', // Use cache first, then network
  });

  useEffect(() => {
    let matrixType = filterSettings.type;

    if (matrixType === 'Absolute') {
      matrixType = 'absolute_matrix';
      setUnit(' counts of combined uses');
    } else if (matrixType === 'Relative to Credit Card') {
      matrixType = 'relative_cc_matrix';
      setUnit('%');
    } else if (matrixType === 'Relative to Loyalty Card') {
      matrixType = 'relative_loyalty_matrix';
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
   
      if (filterSettings.loyaltyCards) {
        const filteredIndices = filteredYAxis
          .map((y, i) => (filterSettings.loyaltyCards.includes(y) ? i : -1))
          .filter(i => i !== -1);
      
        filteredMatrix = filteredMatrix
          .filter((_, i) => filteredIndices.includes(i));
        filteredYAxis = filteredYAxis.filter(y => filterSettings.loyaltyCards.includes(y));
      }

      setMatrix(filteredMatrix);
      setXAxis(filteredXAxis);
      setYAxis(filteredYAxis);
    }
  }, [data, filterSettings]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    
  const handleBarClick = (d) => {
    console.log("Bar clicked:", d);
  };

  const handleBarRightClick = (d) => {
    console.log("Bar right-clicked:", d);
  };

  const handleBarDoubleClick = (d) => {
    console.log("Bar double-clicked:", d);
  };

  return (
    <div>
      <h2 className="header">{title}</h2>
      <MatrixChart matrix={matrix} xAxis={xAxis} yAxis={yAxis} yAxisName={"Credit Cards"} xAxisName={"Loyalty Cards"} unit={unit} onBarClick={handleBarClick} onBarRightClick={handleBarRightClick} onBarDoubleClick={handleBarDoubleClick}/>
    </div>
  );
}

export default CardMatrixGraph;
