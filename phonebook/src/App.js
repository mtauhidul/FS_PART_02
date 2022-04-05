import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleAdd = (event) => {
    event.preventDefault();
    setPersons([
      ...persons,
      {
        name: newName,
      },
    ]);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{' '}
          <input
            value={newName}
            type='text'
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button onClick={(event) => handleAdd(event)} type='submit'>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => {
        return <p key={index}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
