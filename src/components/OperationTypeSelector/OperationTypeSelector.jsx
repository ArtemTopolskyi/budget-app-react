import React, { useCallback } from 'react';
import cn from 'classnames';
import { OperationType } from '../../constants';
import './OperationTypeSelector.scss';

export const OperationTypeSelector = ({
  operationType,
  setOperationType,
}) => {
  const isActive = (itemType) => (
    itemType === operationType
  );

  const setActive = useCallback((operationType) => {
    return () => { setOperationType(operationType) };
  }, [setOperationType]);

  return (
    <ul className='operation-types'>
      <li
        className={cn('operation-types__type',{
          active: isActive(OperationType.Waste)
        })}
        onClick={setActive(OperationType.Waste)}
      >
        Расходы
      </li>

      <li
        className={cn('operation-types__type',{
          active: isActive(OperationType.Income)
        })}
        onClick={setActive(OperationType.Income)}
      >
        Доходы
      </li>
    </ul>
  );
};
