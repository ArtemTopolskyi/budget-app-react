import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CategorySelector } from '../CategorySelector/CategorySelector';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import './CreateOperationForm.scss';

export const CreateOperationForm = ({ createOperation, type, closeModal }) => {
  const [date, setDate] = useState(new Date());
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSumInput = (e) => {
    setSum(e.target.value.replace(/\D/g,''));
  }

  const createOperationCallback = useCallback(() => {
    if (!date || !category || !sum) {
      setIsError(true);

      return;
    }

    createOperation({
      type,
      sum,
      date,
      category,
    });

    closeModal();
  }, [createOperation, date, sum, type, closeModal, category]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => { setIsError(false)}, 1500);
    }
  }, [isError])

  return (
    <form>
      {isError && (
        <div className={cn(
          'error-message',
        )}>
          Все поля должны быть заполнены!😜
        </div>
      )}

      <div className='input-container'>
        <label className='label'>
          <div className='label__text'>
            Сумма
          </div>

          <input
            className='input'
            type='text'
            value={sum}
            onChange={handleSumInput}
          />
        </label>

        <label className='label'>
          <div className='label__text'>
            Дата
          </div>

          <DatePicker
            className='input'
            selected={date}
            onChange={setDate}
          />
        </label>
      </div>

      <label className='label'>
          <div className='label__text'>
            Категория
          </div>
      </label>

      <CategorySelector
        type={type}
        selectedCategory={category}
        setCategory={setCategory}
      />

      <button
          type='button'
          className='form-button'
          onClick={createOperationCallback}
        >
          <PlusIcon />
          Добавить
        </button>
    </form>
  )
};
