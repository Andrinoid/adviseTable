import { construct } from "./helpers";
import { sample1 } from "./samples";

describe("Sample 1", () => {
  it("should construct the rows", () => {
    const result = construct(sample1);

    expect(result.length).toEqual(3);
    expect(result[0].rowId).toBe(0);
    expect(result[1].rowId).toBe(9);
    expect(result[2].rowId).toBe(21);

    expect(result[0].data.length).toBe(2);
    expect(result[1].data.length).toBe(2);
    expect(result[2].data.length).toBe(1);
  });
});
