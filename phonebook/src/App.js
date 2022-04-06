import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

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
      <Filter setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
