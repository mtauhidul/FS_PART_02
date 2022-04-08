import React from 'react';
import Person from './Person';

const Persons = ({ persons, delHandler }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <Person delHandler={delHandler} key={person.id} person={person} />
        );
      })}
    </div>
  );
};

export default Persons;
