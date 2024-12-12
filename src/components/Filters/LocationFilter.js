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

 // Define custom styles for the Select component
 const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%', // Ensure the container takes the full width of the parent
    maxHeight: '200px' // Set the maximum height here
  }),
  valueContainer: (provided) => ({
    ...provided,
    maxHeight: '150px', // Set the maximum height for the value container
    overflowY: 'auto' // Add scroll if the content exceeds the max height
  })
};
  return (
    <div className="location-filter">
      <label><b>Locations:</b></label>
      <Select
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        isMulti
      />
    </div>
  );
};

export default LocationFilter;