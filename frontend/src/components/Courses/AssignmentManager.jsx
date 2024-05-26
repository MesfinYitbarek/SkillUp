import React from 'react';
import CreateAssignment from './createAssignment';
import Assignments from './Assignment';

const AssignmentManager = () => {
  return (
    <div className="space-y-8">
      <CreateAssignment />
      <Assignments />
    </div>
  );
};

export default AssignmentManager;
