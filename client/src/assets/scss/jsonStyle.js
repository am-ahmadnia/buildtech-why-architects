const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0',
    padding: '25px',
    direction: 'rtl',
    textAlign: 'right',
    width: '400px',
  },
};

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    height: '38px',
    borderRadius: '0',
    border: '1px solid #cdd4e',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '0',
  }),
};
const datepickerStyles = {
  calendarContainer: 'calendarContainer',
  dayPickerContainer: 'dayPickerContainer',
  monthsList: 'monthsList',
  daysOfWeek: 'daysOfWeek',
  dayWrapper: 'dayWrapper',
  selected: 'selected',
  heading: 'heading',
  next: 'next',
  prev: 'prev',
  title: 'title',
};
const whyLogoStyles = {
  height: '35px',
  marginRight: '10px',
};
const btLogoStyles = {
  height: '42px',
};

module.exports = {
  selectStyles,
  datepickerStyles,
  modalStyles,
  whyLogoStyles,
  btLogoStyles,
};
