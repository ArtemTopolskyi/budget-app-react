import React, { useState } from 'react';
import { OperationType } from '../constants';
import { OperationTypeSelector } from '../OperationTypeSelector/OperationTypeSelector';
import { TransactionsContainer } from '../TransactionsContainer';
import './BudgetAppWrapper.scss';

export const BudgetAppWrapper = () => {
  const [operationType, setOperationType] = useState(OperationType.Waste)

  return (
    <div className='budget-app-wrapper'>
      <OperationTypeSelector
        operationType={operationType}
        setOperationType={setOperationType}
      />
      <TransactionsContainer
        operationType={operationType}
      />
    </div>
  )
};
