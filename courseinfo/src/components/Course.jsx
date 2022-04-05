import React from 'react';
import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ header, course }) => {
  return (
    <div>
      <Header header={header} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
