import {
  lowerCaseMonthName,
  TimePeriod,
  operationColorClasses,
  OperationCategory,
} from "./constants";

export const getCategoryName = (category) => {
  switch (category) {
    case OperationCategory.Food:
      return 'Продукты';
    case OperationCategory.Shopping:
      return 'Шоппинг';
    case OperationCategory.Cafe:
      return 'Кафе и рестораны';
    case OperationCategory.Health:
      return 'Здоровье';
    case OperationCategory.Beauty:
      return 'Красота';
    case OperationCategory.Salary:
      return 'Зарплата';
    case OperationCategory.Cashback:
      return 'Кешбек';
    case OperationCategory.OtherIncome:
      return 'Другое операции';
    case OperationCategory.Terminal:
      return 'Пополнение через терминал';
    case OperationCategory.OtherWaste:
    default:
      return 'Другое';
  }
}

export const colorClassByCategory = (category) => operationColorClasses[category];

export const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}

export const isYesterday = (someDate) => {
  const today = new Date()
  return someDate.getDate() === today.getDate() - 1 &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}

export const formatDate = (date) => {
  return `${date.getDate()} ${lowerCaseMonthName[date.getMonth()]} ${date.getFullYear()}`;
}

export const formatDateAndTime = (date) => {
  return `${date.getDate()} ${lowerCaseMonthName[date.getMonth()]} ${date.getFullYear()} `
    + `${date.getHours()}:${formatMinutes(date.getMinutes())}`;
}

const formatMinutes = (minutes) => {
  if (minutes.toString().length === 1) {
    return `0${minutes}`;
  };

  return minutes;
} 

export const sortOperationsByPeriod = (operations, timePediod) => {
  const keyCreator = keyCreatorByPeriod(timePediod)

  const operationsMap = operations.reduce((map, operation) => {
    const { date } = operation;
    const mapKey = keyCreator(date);

    if (map.has(mapKey)) {
      map.get(mapKey).push(operation);

      return map;
    }

    return map.set(mapKey, [operation]);
  }, new Map());

  return [...operationsMap.entries()]
  .map((entry) => ({
    operations: entry[1].sort(sortDatesCallback),
    date: new Date(entry[0]),
  }))
  .sort(sortDatesCallback);
}

const keyCreatorByPeriod = (timePeriod) => {
  switch (timePeriod) {
    case TimePeriod.Year:
      return yearPeriodKeyCreator;
    case TimePeriod.Month:
      return monthPeriodKeyCreator;
    case TimePeriod.Week:
      return weekPeriodKeyCreator;
    case TimePeriod.Day:
    default:
      return dayPeriodKeyCreator;
  }
}

const dayPeriodKeyCreator = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString();
}

const weekPeriodKeyCreator = (date) => {
  return getWeekFirstDay(date).toString();
}

const monthPeriodKeyCreator = (date) => {
  return getMonthFirstDay(date).toString();
}

const yearPeriodKeyCreator = (date) => {
  return getYearFirstDay(date).toString();
}

const getYearFirstDay = (date) => {
  return new Date(date.getFullYear(), 0, 1);
}

const getMonthFirstDay = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

const getWeekFirstDay = (date) => {
  const tmp = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const day = tmp.getDay();
  const diff = tmp.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(tmp.setDate(diff));
};

const sortDatesCallback = (a, b) => (b.date.getTime() - a.date.getTime());
