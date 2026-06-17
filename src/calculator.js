#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations:
// - addition
// - subtraction
// - multiplication
// - division
// - modulo
// - exponentiation (power)
// - square root

const [,, op, ...args] = process.argv;

function showUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> [num2]');
  console.log('Operations: add, sub, mul, div, mod, pow, sqrt');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3    # -> 5');
  console.log('  node src/calculator.js mul 4 5    # -> 20');
  console.log('  node src/calculator.js mod 10 3   # -> 1');
  console.log('  node src/calculator.js pow 2 8    # -> 256');
  console.log('  node src/calculator.js sqrt 9     # -> 3');
}

if (!op) {
  showUsage();
  process.exit(1);
}

// Helper functions
function modulo(a, b) {
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
}

const operation = op.toLowerCase();
let result;

try {
  switch (operation) {
    case 'add':
    case '+': {
      if (args.length < 2) throw new Error('add requires two operands');
      const a = Number(args[0]);
      const b = Number(args[1]);
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('both operands must be valid numbers');
      result = a + b;
      break;
    }

    case 'sub':
    case '-': {
      if (args.length < 2) throw new Error('sub requires two operands');
      const a = Number(args[0]);
      const b = Number(args[1]);
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('both operands must be valid numbers');
      result = a - b;
      break;
    }

    case 'mul':
    case 'x':
    case '*': {
      if (args.length < 2) throw new Error('mul requires two operands');
      const a = Number(args[0]);
      const b = Number(args[1]);
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('both operands must be valid numbers');
      result = a * b;
      break;
    }

    case 'div':
    case '/': {
      if (args.length < 2) throw new Error('div requires two operands');
      const a = Number(args[0]);
      const b = Number(args[1]);
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('both operands must be valid numbers');
      if (b === 0) throw new Error('division by zero');
      result = a / b;
      break;
    }

    case 'mod':
    case '%': {
      if (args.length < 2) throw new Error('mod requires two operands');
      const a = Number(args[0]);
      const b = Number(args[1]);
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('both operands must be valid numbers');
      result = modulo(a, b);
      break;
    }

    case 'pow':
    case '^': {
      if (args.length < 2) throw new Error('pow requires two operands');
      const base = Number(args[0]);
      const exp = Number(args[1]);
      if (Number.isNaN(base) || Number.isNaN(exp)) throw new Error('both operands must be valid numbers');
      result = power(base, exp);
      break;
    }

    case 'sqrt': {
      if (args.length < 1) throw new Error('sqrt requires one operand');
      const n = Number(args[0]);
      if (Number.isNaN(n)) throw new Error('operand must be a valid number');
      result = squareRoot(n);
      break;
    }

    default:
      throw new Error(`Unknown operation: ${op}`);
  }
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}

// Print numeric result (avoid trailing .0 formatting issues by printing as-is)
console.log(result);
