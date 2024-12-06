import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';

const CREDIT_CARDS_QUERY = gql`
  query matrices {
    matrices {
      xAxis
    } 
  }
`

const CreditCardFilter = ({ onFilterChange, filterSettings }) => {
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { loading, error, data } = useQuery(CREDIT_CARDS_QUERY);  

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedOptions(selectedOptions);
    onFilterChange({ creditCards: selectedValues });
  };

  useEffect(() => {
    if (data && !hasRunOnce) {
      const options = data.matrices.xAxis.map((card) => ({
        value: card,
        label: card
      }));
      onFilterChange({ creditCards: options.map(option => option.value) });
      setHasRunOnce(true);
    }
  }, [hasRunOnce, data]);

  useEffect(() => {
    if (filterSettings.creditCards) {
      const options = filterSettings.creditCards.map(card => ({
        value: card,
        label: card
      }));
      setSelectedOptions(options);
    }
  }, [filterSettings]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const options = data.matrices.xAxis.map((card) => ({
    value: card,
    label: card
  }));

  return (
    <div className="credit-card-filter">
      <label><b>Credit Cards:</b></label>
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

export default CreditCardFilter;
