import React, { useEffect, useState } from 'react';

const data = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
];

const App = () => {
  const [persons, setPersons] = useState(data);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const filteredData = persons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
    setPersons(filteredData);
    if (filter === '') {
      setPersons(data);
    }
  }, [filter, persons]);

  const handleAdd = (event) => {
    event.preventDefault();
    const checkAvailability = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (!checkAvailability) {
      setPersons([
        ...persons,
        {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        },
      ]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with:{' '}
      <input onChange={(event) => setFilter(event.target.value)} type='text' />
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.id}>{person.name + ' ' + person.number}</p>;
      })}
    </div>
  );
};

export default App;
