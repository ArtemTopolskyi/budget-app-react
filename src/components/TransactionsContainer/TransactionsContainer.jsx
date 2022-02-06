import React, { useState } from 'react';
import { TimePeriod } from '../../constants';
import { OperationContainer } from '../OperationContainer';
import { TimePeriodSelector } from '../TimePeriodSelector';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import './TransactionsContainer.scss';

export const TransactionsContainer = ({ operations, openModal }) => {
  const [timePeriod, setTimePeriod] = useState(TimePeriod.Day);

  return (
    <div className='transactions-container'>
      <div className='transactions-container__header'>
        <h1 className='transactions-container__heading'>
          Транзакции
        </h1>

        <button
          className='transactions-container__add-button'
          onClick={openModal}
        >
          <PlusIcon />
          Добавить
        </button>
      </div>

      <TimePeriodSelector
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />

      <OperationContainer
        operations={operations}
        timePeriod={timePeriod}
      />
    </div>
  );
};