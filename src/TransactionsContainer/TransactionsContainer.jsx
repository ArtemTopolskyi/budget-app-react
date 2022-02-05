import React, { useState, useMemo } from 'react';
import { OperationType, OperationCategory, TimePeriod } from '../constants';
import { OperationContainer } from '../OperationContainer/OperationContainer';
import { TimePeriodSelector } from '../TimePeriodSelector';
import './TransactionsContainer.scss';

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
    category: OperationCategory.Shopping,
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
    category: OperationCategory.Other,
  }
  const basicOperations=[operation1, operation2, yesterdayOperation, twoDaysAgoOperation, prevMonthOperation, lastYearOperation];

export const TransactionsContainer = ({ operationType }) => {
  const [timePeriod, setTimePeriod] = useState(TimePeriod.Day);
  const [operations, setOperations] = useState(basicOperations);

  const filteredOperations = useMemo(() => (
    operations.filter((operation) => (operation.type === operationType))
  ), [operationType, operations]);

  console.log(operations, filteredOperations);

  return (
    <div className='transactions-container'>
      <div className='transactions-container__header'>
        <h1 className='transactions-container__heading'>
          Транзакции
        </h1>

        <button className='transactions-container__add-button'>
          Добавить
        </button>
      </div>

      <TimePeriodSelector
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />

      <OperationContainer
        operations={filteredOperations}
        timePeriod={timePeriod}
      />
    </div>
  );
};