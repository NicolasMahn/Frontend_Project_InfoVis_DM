import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';

const CARD_ID_QUERY = gql`
  query matrices {
    matrices(matrixTitle: "Matching Cars and Credit Cards") {
      yAxis
    } 
  }
`

const CarIDFilter = ({ onFilterChange, filterSettings }) => {
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { loading, error, data } = useQuery(CARD_ID_QUERY);  

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedOptions(selectedOptions);
    onFilterChange({ cars: selectedValues });
  };

  useEffect(() => {
    if (data && !hasRunOnce) {
      const options = data.matrices.yAxis.map((card) => ({
        value: card,
        label: card
      }));
      onFilterChange({ cars: options.map(option => option.value) });
      setHasRunOnce(true);
    }
  }, [hasRunOnce, data]);

  useEffect(() => {
    if (filterSettings.cars) {
      const options = filterSettings.cars.map(card => ({
        value: card,
        label: card
      }));
      setSelectedOptions(options);
    }
  }, [filterSettings]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const options = data.matrices.yAxis.map((card) => ({
    value: card,
    label: card
  }));

  return (
    <div className="car-filter">
      <label><b>Car IDs:</b></label>
      <Select
        isMulti
        value={selectedOptions}
        options={options}
        onChange={handleChange}
      />
      <br />
    </div>
  );

};

export default CarIDFilter;
