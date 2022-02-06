import React, { useCallback } from 'react';
import cn from 'classnames';
import { TimePeriod } from '../../constants';
import './TimePeriodSelector.scss';

export const TimePeriodSelector = ({ timePeriod, setTimePeriod }) => {
  const isActive = (itemPeriod) => (
    itemPeriod === timePeriod
  );

  const setActive = useCallback((period) => {
    return () => { setTimePeriod(period) };
  }, [setTimePeriod]);

  return (
    <div>
      <ul className='time-periods'>
        <li
          className={cn('time-periods__period',{
            active: isActive(TimePeriod.Day)
          })}
          onClick={setActive(TimePeriod.Day)}
        >
          День
        </li>
        <li
          className={cn('time-periods__period',{
            active: isActive(TimePeriod.Week)
          })}
          onClick={setActive(TimePeriod.Week)}
        >
          Неделя
        </li>
        <li
          className={cn('time-periods__period',{
            active: isActive(TimePeriod.Month)
          })}
          onClick={setActive(TimePeriod.Month)}
        >
          Месяц
        </li>
        <li
          className={cn('time-periods__period',{
            active: isActive(TimePeriod.Year)
          })}
          onClick={setActive(TimePeriod.Year)}
        >
          Год
        </li>
      </ul>
    </div>
  )
}
