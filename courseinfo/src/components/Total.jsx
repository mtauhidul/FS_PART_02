import React from 'react';

const Total = ({ course }) => {
  const exercises = [];
  course.parts.map((part) => exercises.push(part.exercises));

  const initialValue = 0;
  const totalValue = exercises.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return <h4>total of exercises {totalValue}</h4>;
};

export default Total;
