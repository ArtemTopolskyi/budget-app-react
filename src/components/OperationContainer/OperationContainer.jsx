import React, { useMemo } from 'react';
import { sortOperationsByPeriod } from '../../helpers';
import { OperationGroup } from '../OperationGroup';

export const OperationContainer = ({ operations, timePeriod }) => {
  const sortedOperations = useMemo(() => (
    sortOperationsByPeriod(operations, timePeriod)
  ), [operations, timePeriod]);

  return (
    <ul>
      {sortedOperations.map(({ operations, date }) => (
        <li key={date.toString()}>
          <OperationGroup
            date={new Date(date)}
            operations={operations}
            timePeriod={timePeriod}
          />
        </li>
      ))}
    </ul>
  );
};
