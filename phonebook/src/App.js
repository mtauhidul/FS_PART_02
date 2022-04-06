import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [data, setData] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = persons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
    setPersons(filteredData);
    if (filter === '') {
      setPersons(data);
    }
  }, [filter]);

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
