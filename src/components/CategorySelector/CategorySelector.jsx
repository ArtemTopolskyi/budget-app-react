import React from 'react';
import cn from 'classnames';
import {
  OperationCategory,
  IncomeOperationCategory,
  OperationType,
  WasteOperationCategory,
} from '../../constants';
import { getCategoryName, colorClassByCategory } from '../../helpers';
import './CategorySelector.scss';

export const operationHighlightColorClasses = {
  [OperationCategory.Food]: 'highlight-peach',
  [OperationCategory.Shopping]: 'highlight-pink',
  [OperationCategory.Cafe]: 'highlight-orange',
  [OperationCategory.Health]: 'highlight-green',
  [OperationCategory.OtherWaste]: 'highlight-blue',
  [OperationCategory.Beauty]: 'highlight-purple',
  [OperationCategory.Cashback]: 'highlight-red',
  [OperationCategory.OtherIncome]: 'highlight-yellow',
  [OperationCategory.Salary]: 'highlight-light-green',
  [OperationCategory.Terminal]: 'highlight-light-blue',
}

export const highlightColorClassByCategory = (category) => (
  operationHighlightColorClasses[category]
);

export const CategorySelector = ({ type, setCategory, selectedCategory }) => {
  const categories = type === OperationType.Income
    ? IncomeOperationCategory
    : WasteOperationCategory;

  return (
    <div className='category-buttons'>
      {Object.values(categories).map((category) => (
        <button
          key={category}
          className={cn(
            'category-buttons__button',
            colorClassByCategory(category),
            highlightColorClassByCategory(category),
            { 'selected': selectedCategory === category}
          )}
          type='button'
          onClick={() => setCategory(category)}
        >
          {getCategoryName(category)}
        </button>
      ))}
    </div>
  )
}