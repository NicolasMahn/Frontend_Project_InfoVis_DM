import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';

const NUMB_PURCHASES_PER_LOCATION_QUERY = gql`
  query NumbPurchasesPerLocation {
    numbPurchasesPerLocation {
      location
    }
  }
`

const LocationFilter = ({ onFilterChange, filterSettings }) => {
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { loading, error, data } = useQuery(NUMB_PURCHASES_PER_LOCATION_QUERY);  

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedOptions(selectedOptions);
    onFilterChange({ locations: selectedValues });
  };

  useEffect(() => {
    if (data && !hasRunOnce) {
      const options = data.numbPurchasesPerLocation.map((location) => ({
        value: location.location,
        label: location.location
      }));
      onFilterChange({ locations: options.map(option => option.value) });
      setHasRunOnce(true);
    }
  }, [hasRunOnce, data]);

  useEffect(() => {
    if (filterSettings.locations) {
      const options = filterSettings.locations.map(location => ({
        value: location,
        label: location
      }));
      setSelectedOptions(options);
    }
  }, [filterSettings]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const options = data.numbPurchasesPerLocation.map((location) => ({
    value: location.location,
    label: location.location
  }));

  return (
    <div style={{ maxWidth: '300px' }}>
      <Select
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        isMulti
      />
    </div>
  );
};

export default LocationFilter;