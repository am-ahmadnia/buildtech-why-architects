const isEmpty = require('is-empty');
const {
  projectTitleEmpty,
  descriptionEmptyEmpty,
  deliveryDateEmpty,
  progressUntilTodayEmpty,
  todaysProgressEmpty,
  hoursSpentEmpty,
} = require('./../errorMessages');

module.exports = (data) => {
  const errors = {};
  for (const key in data) {
    if (isEmpty(data[key])) {
      switch (key) {
        case 'projectTitle':
          errors.projectTitle = projectTitleEmpty;
          break;
        case 'descriptionEmpty':
          errors.descriptionEmpty = descriptionEmptyEmpty;
          break;
        case 'deliveryDate':
          errors.deliveryDate = deliveryDateEmpty;
          break;
        case 'progressUntilToday':
          errors.progressUntilToday = progressUntilTodayEmpty;
          break;
        case 'todaysProgress':
          errors.todaysProgress = todaysProgressEmpty;
          break;
        case 'hoursSpent':
          errors.hoursSpent = hoursSpentEmpty;
          break;

        default:
          break;
      }
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
