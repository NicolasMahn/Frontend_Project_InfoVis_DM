import React from 'react';

const ImageComponent = () => {
  return (
    <div className="image-container">
      <img src={process.env.PUBLIC_URL + '/MC2-tourist.jpg'} alt="Tourist" />
    </div>
  );
};

export default ImageComponent;