import React from 'react';

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleAdd,
}) => {
  return (
    <div>
      <form>
        <div>
          name:{' '}
          <input
            value={newName}
            type='text'
            onChange={(event) => setNewName(event.target.value)}
          />
          <br />
          number:{' '}
          <input
            value={newNumber}
            type='text'
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button onClick={(event) => handleAdd(event)} type='submit'>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
