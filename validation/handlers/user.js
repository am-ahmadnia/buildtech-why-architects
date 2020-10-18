const validator = require('validator');
const isEmpty = require('is-empty');
const {
  newPasswordEmpty,
  newPassword2Empty,
  passwordInvalid,
} = require('./../errorMessages').user;

const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,22}$/;

const checkEntries = (data) => {
  const errors = {};
  for (const key in data) {
    if (typeof data[key] === 'string' && isEmpty(data[key].trim())) {
      switch (key) {
        // case 'username':
        // errors.username = usernameEmpty;
        // break;
        // case 'firstName':
        // errors.firstName = firstNameEmpty;
        // break;
        // case 'lastName':
        // errors.lastName = lastNameEmpty;
        // break;
        // case 'role':
        // errors.role = roleEmpty;
        // break;
        // case 'password':
        // errors.password = passwordEmpty;
        // break;
        // case 'password2':
        // errors.password2 = password2Empty;
        // break;
        case 'newPassword':
          errors.newPassword = newPasswordEmpty;
          break;
        case 'newPassword2':
          errors.newPassword2 = newPassword2Empty;
          break;
        default:
          break;
      }
    } else if (typeof data[key] === 'string') {
      switch (key) {
        // case 'username':
        // if (/\s/g.test(data[key]))
        // errors.username = usernameContainingWhiteSpace;
        // else if (!validator.isLength(data[key], { min: 6, max: 18 })) {
        // errors.username = usernameLength;
        // } else delete errors.username;
        // break;
        // case 'email':
        // if (!validator.isEmail(data[key])) errors.email = emailInvalid;
        // else delete errors.email;
        // break;
        // case 'phoneNumber':
        // if (!validator.isMobilePhone(data[key]))
        // errors.phoneNumber = phoneNumberInvalid;
        // else delete errors.phoneNumber;
        // break;
        // case 'password':
        // if (!data[key].match(decimal)) errors.password = passwordInvalid;
        // break;
        case 'newPassword':
          if (!data[key].match(decimal)) errors.newPassword = passwordInvalid;
          break;
        // case 'contractPrice':
        // if (typeof data[key] !== 'number')
        // errors.contractPrice = contractPriceInvalid;
        // break;
        // case 'startDate':
        // if (new Date(data[key]).toString() === 'Invalid Date')
        // errors.startDate = startDateInvalid;
        // break;
        // case 'endDate':
        // if (new Date(data[key]).toString() === 'Invalid Date') {
        // errors.endDate = endDateInvalid;
        // }
        // case 'nationalCode':
        // if (
        // !+data[key] ||
        // !validator.isLength(data[key], { min: 10, max: 10 })
        // )
        // errors.nationalCode = nationalCodeInvalid;
        // break;
        // case 'deliveryDate':
        // if (new Date(data[key]).toString() === 'Invalid Date') {
        // errors.deliveryDate = deliveryDateInvalid;
        // }
        // break;
        // case 'progressUntilToday':
        // if (
        // typeof +data[key] !== 'number' ||
        // +data[key] < 0 ||
        // +data[key] > 100
        // ) {
        // errors.progressUntilToday = progressUntilTodayInvalid;
        // }
        // break;
        // case 'todaysProgress':
        // if (
        // typeof +data[key] !== 'number' ||
        // +data[key] < 0 ||
        // +data[key] > 100
        // ) {
        // errors.todaysProgress = todaysProgressInvalid;
        // }
        // break;
        // case 'hoursSpent':
        // if (
        // typeof +data[key] !== 'number' ||
        // +data[key] < 0 ||
        // +data[key] > 100
        // ) {
        // errors.hoursSpent = hoursSpentInvalid;
        // }
        // break;

        default:
          delete errors[key];
          break;
      }
    } else if (typeof data[key] === 'object') {
      // switch (key) {
      //   case 'apps':
      //     if (data[key].length === 0) errors.apps = appsEmpty;
      //     data[key].forEach((app) => {
      //       if (
      //         app.name !== 'PM' &&
      //         app.name !== 'HumanResources' &&
      //         (app.startDate === undefined || app.endDate === undefined)
      //       )
      //         errors.apps = appsInvalid;
      //     });
      //     break;
      //   default:
      //     delete errors[key];
      //     break;
      // }
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = checkEntries;
