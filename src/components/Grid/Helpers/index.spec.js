import { addaptLegacyToNewGrid, addaptNewGridToLegacy } from ".";
import { sample1, sample2, sample3 } from "./samples";

describe("Sample 1", () => {
  it("should construct the rows", () => {
    const result = addaptLegacyToNewGrid(sample1);
    expect(result.length).toEqual(3);
    expect(result[0].rowId).toBe(0);
    expect(result[1].rowId).toBe(9);
    expect(result[2].rowId).toBe(21);
    expect(result[0].columns.length).toBe(2);
    expect(result[1].columns.length).toBe(1);
    expect(result[2].columns.length).toBe(1);
  });
  it("should construct the columns", () => {
    const result = addaptLegacyToNewGrid(sample1);
    expect(result[0].columns[0].data.length).toBe(1);
    expect(result[0].columns[1].data.length).toBe(2);
    expect(result[1].columns[0].data.length).toBe(1);
    expect(result[2].columns[0].data.length).toBe(1);
  });
});

describe("Sample 2", () => {
  it("should construct the rows", () => {
    const result = addaptLegacyToNewGrid(sample2);
    expect(result.length).toEqual(3);
    expect(result[0].rowId).toBe(0);
    expect(result[0].columns.length).toBe(2);
  });
  it("should construct the columns", () => {
    const result = addaptLegacyToNewGrid(sample2);

    expect(result[0].columns.length).toBe(2);
    expect(result[0].columns[0].width).toEqual(0.5);
    expect(result[0].columns[0].data.length).toBe(1);
    expect(result[0].columns[1].data.length).toBe(2);
  });
});

describe("Sample 3", () => {
  it("should addapt the rows to legacy format", () => {
    const result = addaptNewGridToLegacy(sample3);
    expect(result.length).toEqual(5);
  });
});
