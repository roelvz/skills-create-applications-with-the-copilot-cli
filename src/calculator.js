#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations:
// - addition
// - subtraction
// - multiplication
// - division

const [,, op, ...args] = process.argv;

function showUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, sub, mul, div');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3    # -> 5');
  console.log('  node src/calculator.js mul 4 5    # -> 20');
}

if (!op || args.length < 2) {
  showUsage();
  process.exit(1);
}

const a = Number(args[0]);
const b = Number(args[1]);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.error('Error: both operands must be valid numbers.');
  process.exit(1);
}

let result;
switch (op.toLowerCase()) {
  case 'add':
  case '+':
    result = a + b;
    break;
  case 'sub':
  case '-':
    result = a - b;
    break;
  case 'mul':
  case 'x':
  case '*':
    result = a * b;
    break;
  case 'div':
  case '/':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(1);
    }
    result = a / b;
    break;
  default:
    console.error(`Unknown operation: ${op}`);
    showUsage();
    process.exit(1);
}

console.log(result);
