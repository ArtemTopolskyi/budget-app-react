import React from 'react';
import { monthName, TimePeriod } from '../constants';
import { isToday, isYesterday, formatDate } from '../helpers';
import { Operation } from '../Operation';
import './OperationGroup.scss';

const getDayLabel = (date) => {
  if (isToday(date)) {
    return 'Сегодня';
  } else if (isYesterday(date)) {
    return 'Вчера';
  } else {
    return formatDate(date);
  }
}

const getWeekLabel = (date) => {
  const lastDay = new Date(date);
  
  lastDay.setDate(lastDay.getDate() + 6);

  return `${formatDate(date)} - ${formatDate(lastDay)}`;
}

const getMonthLabel = (date) => (
  `${monthName[date.getMonth()]}`
)

const getYearLabel = (date) => (
  `${date.getFullYear()}`
)

const getLabel = (timePeriod, date) => {
  switch (timePeriod) {
    case TimePeriod.Year:
      return getYearLabel(date);
    case TimePeriod.Month:
      return getMonthLabel(date);
    case TimePeriod.Week:
      return getWeekLabel(date);
    case TimePeriod.Day:
    default:
      return getDayLabel(date);
  }
}

export const OperationGroup = ({ operations, date, timePeriod }) => {
  return (
    <ul className="operation-group">
      <p className='operation-group__label'>
        {getLabel(timePeriod, date)}
      </p>
      {operations.map((operation) => (
        <li className="operation-group__operation" key={operation.date.toString()}>
          <Operation operation={operation} />
        </li>
      ))}
    </ul>
  );
};