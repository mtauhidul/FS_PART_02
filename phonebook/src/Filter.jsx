import React from 'react';

const Filter = ({ setFilter }) => {
  return (
    <div>
      filter shown with:{' '}
      <input onChange={(event) => setFilter(event.target.value)} type='text' />
    </div>
  );
};

export default Filter;
