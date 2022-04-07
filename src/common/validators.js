const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

const exportObj = { checked };

export default exportObj;
