import React from 'react';

const Person = ({ person, delHandler }) => {
  return (
    <p key={person.id}>
      {person.name + ' ' + person.number}{' '}
      <button onClick={() => delHandler(person)}>delete</button>{' '}
    </p>
  );
};

export default Person;
