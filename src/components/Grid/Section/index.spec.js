import { compute } from "../hooks";

describe("computeWidth", () => {
  describe("sequential", () => {
    it("Width 300", () => {
      const widths = [0.2, 0.2, 0.2, 0.2, 0.2];
      const index = 1;
      const size = { width: 300 };
      const offsetWidth = 1000;
      const minWidth = 100;

      expect(compute(widths, index, size, offsetWidth, minWidth)).toEqual([
        0.2, 0.3, 0.1, 0.2, 0.2,
      ]);
    });

    it("Width 400", () => {
      const widths = [0.2, 0.3, 0.1, 0.2, 0.2];
      const index = 1;
      const size = { width: 400 };
      const offsetWidth = 1000;
      const minWidth = 100;
      const result = compute(widths, index, size, offsetWidth, minWidth);
      expect(result).toEqual([0.2, 0.4, 0.1, 0.1, 0.2]);
    });

    it("Width 500", () => {
      const widths = [0.2, 0.4, 0.1, 0.1, 0.2];
      const index = 1;
      const size = { width: 500 };
      const offsetWidth = 1000;
      const minWidth = 100;
      const result = compute(widths, index, size, offsetWidth, minWidth);
      expect(result).toEqual([0.2, 0.5, 0.1, 0.1, 0.1]);
    });
  });

  describe("non-sequential", () => {
    it("Width 500", () => {
      const widths = [0.2, 0.2, 0.2, 0.2, 0.2];
      const index = 1;
      const size = { width: 500 };
      const offsetWidth = 1000;
      const minWidth = 100;

      expect(compute(widths, index, size, offsetWidth, minWidth)).toEqual([
        0.2, 0.5, 0.1, 0.1, 0.1,
      ]);
    });

    it("Width 800", () => {
      const widths = [0.2, 0.2, 0.2, 0.2, 0.2];
      const index = 1;
      const size = { width: 800 };
      const offsetWidth = 1000;
      const minWidth = 100;

      expect(compute(widths, index, size, offsetWidth, minWidth)).toEqual([
        0.2, 0.5, 0.1, 0.1, 0.1,
      ]);
    });
  });
});
