import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';

const LOYALTY_CARDS_QUERY = gql`
  query matrices {
    matrices {
      yAxis
    } 
  }
`

const LoyaltyCardFilter = ({ onFilterChange, filterSettings }) => {
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { loading, error, data } = useQuery(LOYALTY_CARDS_QUERY);  

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedOptions(selectedOptions);
    onFilterChange({ loyaltyCards: selectedValues });
  };

  useEffect(() => {
    if (data && !hasRunOnce) {
      const options = data.matrices.yAxis.map((card) => ({
        value: card,
        label: card
      }));
      onFilterChange({ loyaltyCards: options.map(option => option.value) });
      setHasRunOnce(true);
    }
  }, [hasRunOnce, data]);

  useEffect(() => {
    if (filterSettings.loyaltyCards) {
      const options = filterSettings.loyaltyCards.map(card => ({
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
    <div className="loyalty-card-filter">
      <label><b>Loyalty Cards:</b></label>
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

export default LoyaltyCardFilter;
