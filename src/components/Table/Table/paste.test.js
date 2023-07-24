import { nextValidRow } from './KeyboardControler';

function makeCell(type) {
  return {
    current: {
      'data-rowtype': type,
      getAttribute: (key) => type,
    }
  }
}

describe("multiline", () => {
  
  test("Ensure that multiple lines are copied", () => {
    const matrix = [
      Array.from({ length: 5 }, () => makeCell('primary')),
      Array.from({ length: 5 }, () => makeCell('secondary')),
      Array.from({ length: 5 }, () => makeCell('secondary')),
      Array.from({ length: 5 }, () => makeCell('secondary')),
      Array.from({ length: 5 }, () => makeCell('primary')),
      Array.from({ length: 5 }, () => makeCell('secondary')),
    ]

    expect(nextValidRow(1, 'primary', matrix)).toBe(6);
    expect(nextValidRow(4, 'secondary', matrix)).toBe(6);
    expect(nextValidRow(1, 'secondary', matrix)).toBe(1);
  });
});


