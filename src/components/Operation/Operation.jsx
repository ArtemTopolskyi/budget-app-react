import React from 'react';
import cn from 'classnames';
import { ReactComponent as BeautyIcon } from '../../icons/beauty.svg';
import { ReactComponent as CafeIcon } from '../../icons/cafe.svg';
import { ReactComponent as FoodIcon } from '../../icons/food.svg';
import { ReactComponent as HealthIcon } from '../../icons/health.svg';
import { ReactComponent as OtherWasteIcon } from '../../icons/other-waste.svg';
import { ReactComponent as ShoppingIcon } from '../../icons/shoping.svg';
import { ReactComponent as CashbackIcon } from '../../icons/cashback.svg';
import { ReactComponent as OtherIncomeIcon } from '../../icons/other-income.svg';
import { ReactComponent as SalaryIcon } from '../../icons/salary.svg';
import { ReactComponent as TerminalIcon } from '../../icons/terminal.svg';
import { OperationCategory, OperationType } from '../../constants';
import { getCategoryName, formatDateAndTime, colorClassByCategory } from '../../helpers';
import './Operation.scss'

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
    case OperationCategory.Salary:
      return SalaryIcon;
    case OperationCategory.Terminal:
      return TerminalIcon;
    case OperationCategory.Cashback:
      return CashbackIcon;
    case OperationCategory.OtherIncome:
      return OtherIncomeIcon;
    case OperationCategory.OtherWaste:
    default:
      return OtherWasteIcon;
  }
}

export const Operation = ({ operation }) => {
  const { type, sum, date, category } = operation;

  const isNegative = type === OperationType.Waste;

  const categoryName = getCategoryName(category);
  const CategoryIcon = iconByOperationCategory(category);

  return (
    <div className={cn('operation', colorClassByCategory(category))}>
      <div className="operation__info">
        <CategoryIcon />

        <div className="operation__description">
          <p className="operation__label">{categoryName}</p>
          <p className="operation__details">{formatDateAndTime(date)}</p>
        </div>
      </div>
      <p className="operation__sum">
        {isNegative ? '-' : '+'}
        {sum}
      </p>
    </div>
  );
}