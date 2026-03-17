function _ensureNumbers(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('No numbers provided');
  }
  const parsed = numbers.map((n) => Number(n));
  if (parsed.some((n) => Number.isNaN(n))) {
    throw new Error('One or more arguments is not a valid number');
  }
  return parsed;
}

function add(numbers) {
  const nums = _ensureNumbers(numbers);
  return nums.reduce((acc, curr) => acc + curr, 0);
}

function subtract(numbers) {
  const nums = _ensureNumbers(numbers);
  return nums.slice(1).reduce((acc, curr) => acc - curr, nums[0]);
}

function multiply(numbers) {
  const nums = _ensureNumbers(numbers);
  return nums.reduce((acc, curr) => acc * curr, 1);
}

function divide(numbers) {
  const nums = _ensureNumbers(numbers);
  const dividend = nums[0];
  const divisor = nums[1];

  if (divisor === 0) {
    throw new Error('Cannot divide by zero!');
  }

  return dividend / divisor;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
