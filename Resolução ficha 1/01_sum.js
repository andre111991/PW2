const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('USAGE: node 01_sum.js <number1> <number2>…<numberN>');
    process.exit(1);
}

const numbers = args.map((arg) => Number(arg));
if (numbers.some((n) => Number.isNaN(n))) {
    console.log('ERROR: One or more arguments is not a valid number');
    process.exit(1);
}

const total = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(`The sum is ${total}.`);