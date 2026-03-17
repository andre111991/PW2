const myMath = require('./myMath');

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('ERROR: Not enough operators! USAGE: node ex3 <operation> <number1> <number2>');
  process.exit(1);
}

const [op, aRaw, bRaw] = args;
const a = Number(aRaw);
const b = Number(bRaw);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.log('ERROR: Invalid number input!');
  process.exit(1);
}

let result;
let opSymbol = op;

try {
  switch (op) {
    case '+':
      result = myMath.add(a, b);
      break;
    case '-':
      result = myMath.subtract(a, b);
      break;
    case '*':
      result = myMath.multiply(a, b);
      break;
    case '/':
      result = myMath.divide(a, b);
      break;
    default:
      console.log('ERROR: Invalid operation! Supported operations are: +, -, *, /');
      process.exit(1);
  }

  console.log(`${a} ${opSymbol} ${b} = ${result}`);
} catch (err) {
  if (err.message === 'Cannot divide by zero!') {
    console.log(`ERROR: ${err.message}`);
    process.exit(1);
  }

  throw err;
}
