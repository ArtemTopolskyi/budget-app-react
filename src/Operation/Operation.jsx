import React from 'react';
import cn from 'classnames';
import { ReactComponent as BeautyIcon } from '../icons/beauty.svg';
import { ReactComponent as CafeIcon } from '../icons/cafe.svg';
import { ReactComponent as FoodIcon } from '../icons/food.svg';
import { ReactComponent as HealthIcon } from '../icons/health.svg';
import { ReactComponent as OtherIcon } from '../icons/other.svg';
import { ReactComponent as ShoppingIcon } from '../icons/shoping.svg';
import { OperationCategory, OperationType } from '../constants';
import { getCategoryName, formatDateAndTime } from '../helpers';
import './Operation.scss'

const colorClasses = {
  [OperationCategory.Food]: 'peach',
  [OperationCategory.Shopping]: 'pink',
  [OperationCategory.Cafe]: 'orange',
  [OperationCategory.Health]: 'green',
  [OperationCategory.Other]: 'blue',
  [OperationCategory.Beauty]: 'purple',
}

const iconByOperationCategory = (category) => {
  switch (category) {
    case OperationCategory.Food:
      return FoodIcon;
    case OperationCategory.Shopping:
      return ShoppingIcon;
    case OperationCategory.Beauty:
      return BeautyIcon;
    case OperationCategory.Cafe:
      return CafeIcon;
    case OperationCategory.Health:
      return HealthIcon;
    case OperationCategory.Other:
    default:
      return OtherIcon;
  }
}

const classByCategory = (category) => colorClasses[category];

export const Operation = ({ operation }) => {
  const { type, sum, date, category } = operation;

  const isNegative = type === OperationType.Waste;

  const categoryName = getCategoryName(category);
  const CategoryIcon = iconByOperationCategory(category);

  return (
    <div className={cn('operation', classByCategory(category))}>
      <div className="operation__info">
        <CategoryIcon />

        <div className="operation__description">
          <p className="operation__label">{categoryName}</p>
          <p className="operation__details">{formatDateAndTime(date)}</p>
        </div>
      </div>
      <p className="operation__sum">
        {isNegative && '-'}
        {sum}
      </p>
    </div>
  );
}