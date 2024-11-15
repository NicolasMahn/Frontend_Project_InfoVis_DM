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

const LocationFilter = ({ onFilterChange }) => {
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const { loading, error, data } = useQuery(NUMB_PURCHASES_PER_LOCATION_QUERY);  

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const options = data.numbPurchasesPerLocation.map((location) => ({
    value: location.location,
    label: location.location
  }));

  return (
    <div className="location-filter">
      <label>Locations:</label>
      <Select
        isMulti
        defaultValue={options}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </div>
  );

};

export default LocationFilter;
