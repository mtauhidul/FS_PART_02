import React from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({ header, course }) => {
  return (
    <div>
      <Header header={header} />
      <Content course={course} />
    </div>
  );
};

export default Course;
