import React, { useState, useCallback, useMemo } from 'react';
import { OperationType, OperationCategory } from '../../constants';
import { OperationTypeSelector } from '../OperationTypeSelector';
import { TransactionsContainer } from '../TransactionsContainer';
import { ModalWindow } from '../ModalWindow';
import './BudgetAppWrapper.scss';
import { CreateOperationForm } from '../CreateOperationForm/CreateOperationForm';

const today = new Date();
  const anotherToday = new Date(today);
  anotherToday.setHours(anotherToday.getHours() - 1);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const prevMonth = new Date();
  prevMonth.setMonth(prevMonth.getMonth() - 1);

  const prevYear = new Date();
  prevYear.setFullYear(prevYear.getFullYear() - 1);

  const operation1 = {
    type: OperationType.Waste,
    sum: 453.67,
    date: today,
    category: OperationCategory.Food,
  }

  const operation2 = {
    type: OperationType.Income,
    sum: 220.67,
    date: anotherToday,
    category: OperationCategory.Salary,
  }

  const yesterdayOperation = {
    type: OperationType.Waste,
    sum: 322.8,
    date: yesterday,
    category: OperationCategory.Shopping,
  }

  const twoDaysAgoOperation = {
    type: OperationType.Waste,
    sum: 228.225,
    date: twoDaysAgo,
    category: OperationCategory.Cafe,
  }

  const prevMonthOperation = {
    type: OperationType.Waste,
    sum: 444.22,
    date: prevMonth,
    category: OperationCategory.Health,
  }

  const lastYearOperation = {
    type: OperationType.Income,
    sum: 321.22,
    date: prevYear,
    category: OperationCategory.Cashback,
  }
  const basicOperations=[operation1, operation2, yesterdayOperation, twoDaysAgoOperation, prevMonthOperation, lastYearOperation];

export const BudgetAppWrapper = () => {
  const [operations, setOperations] = useState(basicOperations);
  const [operationType, setOperationType] = useState(OperationType.Waste);
  const [isModalOpen, setModalOpen] = useState(false);
  
  const filteredOperations = useMemo(() => (
    operations.filter((operation) => (operation.type === operationType))
  ), [operationType, operations]);

  const createOperation = useCallback((operation) => {
    setOperations([...operations, operation]);
  }, [operations]);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <div className='budget-app-wrapper'>
        <OperationTypeSelector
          operationType={operationType}
          setOperationType={setOperationType}
        />
        <TransactionsContainer
          operations={filteredOperations}
          openModal={openModal}
        />
      </div>

      <ModalWindow
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <CreateOperationForm
          createOperation={createOperation}
          type={operationType}
          closeModal={closeModal}
        />
      </ModalWindow>
    </>
  )
};
