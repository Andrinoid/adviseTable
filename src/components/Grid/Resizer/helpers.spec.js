import data from "./data.json";
import PrevInRange from "./prev-to-handler.json";
import NextInRange from "./next-to-handler.json";
import { getInitialX, shouldStop } from "./helpers";
import { inRange } from "../Resizer/helpers";

const totalWidth = 1000;

describe("getInitialX", () => {
  it("should return the initial x coordinate of the first row", () => {
    const actual = getInitialX(data, totalWidth);

    const expected = [
      166.66666666666666, 333.3333333333333, 500, 666.6666666666666,
      833.3333333333333, 999.9999999999999,
    ];
    expect(actual[0]).toEqual(expected);
  });

  it("should return the initial x coordinate of the second row", () => {
    const actual = getInitialX(data, totalWidth);
    const expected = [200, 400, 600, 800, 1000];
    expect(actual[1]).toEqual(expected);
  });
});

describe("shouldStop", () => {
  it("should check if it should force stop", () => {
    expect(
      shouldStop(
        [
          1114.9999999999998, 100.00000000000001, 100.00000000000001,
          100.00000000000001, 100.00000000000001, 100.00000000000001,
        ],
        0,
        100
      )
    ).toEqual(true);
  });
});

describe("InRange", () => {
  it("should check if the value is in range", () => {
    PrevInRange[0][0] = 295;
    const actual = inRange(PrevInRange, 0, 0);

    expect(actual).toEqual(323);
  });

  it("should check if the value is in range", () => {
    PrevInRange[0][0] = 280;
    const actual = inRange(PrevInRange, 0, 0);

    expect(actual).toEqual(null);
  });

  it("should check if the value is in range", () => {
    NextInRange[0][0] = 330;
    const actual = inRange(NextInRange, 0, 0);

    expect(actual).toEqual(323);
  });

  it("should check if the value is in range", () => {
    NextInRange[0][0] = 356;
    const actual = inRange(NextInRange, 0, 0);

    expect(actual).toEqual(null);
  });
});
