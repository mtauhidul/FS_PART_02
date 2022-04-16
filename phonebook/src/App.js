import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import * as services from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const getAllPersons = () => {
    services.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
      console.log(initialPersons);
    });
  };

  useEffect(() => {
    getAllPersons();
  }, []);

  const filterPersons = (filter) => {
    const filteredData = persons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
    setPersons(filteredData);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const person = persons.find((p) => p.name === newPersonObj.name);

    if (person) {
      const result = window.confirm(
        `${person.name} is already added to the phonebook, replace the old number with the new one?`
      );
      if (result) {
        services
          .updatePerson({ ...person, number: newNumber })
          .then((returnedPerson) => {
            const updatedPersons = persons.filter(
              (p) => p.name !== person.name
            );

            setPersons([...updatedPersons, returnedPerson]);
            setNewName('');
            setNewNumber('');
            setSuccess(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
          })
          .catch((error) => {
            setError(
              `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      services.addPerson(newPersonObj).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');
        setSuccess(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setSuccess('');
        }, 5000);
      });
    }
  };

  const handleDel = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      services.deletePerson(person.id).then((response) => {
        if (response.status === 200) {
          const updatedPersons = persons.filter((p) => p.name !== person.name);
          setPersons(updatedPersons);
        }
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {success && <p className='success'>{success}</p>}
      {error && <p className='error'>{error}</p>}
      <Filter setFilter={filterPersons} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} delHandler={handleDel} />
    </div>
  );
};

export default App;
