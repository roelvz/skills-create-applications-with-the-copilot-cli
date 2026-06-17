const { execSync } = require('child_process');
const path = require('path');
const calc = path.resolve(__dirname, '..', 'calculator.js');

function run(args) {
  return execSync(`node ${calc} ${args}`, { encoding: 'utf8' }).trim();
}

describe('CLI calculator (integration)', () => {
  test('2 + 3 -> 5', () => {
    expect(run('add 2 3')).toBe('5');
  });

  test('10 - 4 -> 6', () => {
    expect(run('sub 10 4')).toBe('6');
  });

  test('45 * 2 -> 90', () => {
    expect(run('mul 45 2')).toBe('90');
  });

  test('20 / 5 -> 4', () => {
    expect(run('div 20 5')).toBe('4');
  });

  test('division by zero returns error exit', () => {
    let threw = false;
    try {
      run('div 5 0');
    } catch (e) {
      threw = true;
      expect(e.status).not.toBe(0);
      expect(e.stdout || e.stderr).toMatch(/division by zero/i);
    }
    expect(threw).toBe(true);
  });

  test('invalid operands produce error', () => {
    let threw = false;
    try {
      run('add foo 1');
    } catch (e) {
      threw = true;
      expect(e.status).not.toBe(0);
      expect(e.stdout || e.stderr).toMatch(/operands must be valid numbers/i);
    }
    expect(threw).toBe(true);
  });
});
