import table from "./TableMock";
import { Copier } from ".";

// o  = cell selected
// oo = selected label
// -- = label not selected
// x  = cell not selected

describe("Copier", () => {
  describe("One Selection", () => {
    it("should return selection string", () => {
      // -- x x x
      // oo o o x
      // oo o o x
      // oo o o x
      // oo o o x
      const selection = [
        {
          fromX: 0,
          fromY: 5,
          toX: 2,
          toY: 8,
          oldMouseMoveTo: { toX: 2, toY: 8 },
        },
      ];

      const copier = new Copier(table, selection);

      expect(copier.stringifyTable()).toBe(
        `Skattar\t-1079711\t-1022849\nAfskriftir\t-4715000\t-4715000\nSérverk\t39284029\t35977158\nAðrar tekjur\t3300025\t2734444\n`
      );
    });

    it("should return selection string from row", () => {
      // -- x x x x x x x x x x x x x
      // oo o o o o o o o o o o o o o
      // -- x x x x x x x x x x x x x

      const selection = [
        {
          fromX: 0,
          fromY: 4,
          toX: 13,
          toY: 4,
          oldMouseMoveTo: { toX: 13, toY: 4 },
        },
      ];

      const copier = new Copier(table, selection);

      expect(copier.stringifyTable()).toBe(
        "Gamalt ekki notað\t\t\t\t\t\t-146580\t-146580\t-155772\t-146580\t-146580\t\t\t34567\n"
      );
    });

    it("should return selection string from label cell taking full width", () => {
      // -- x x x x x x x x x x x x x
      // oo o o o o o o o o o o o o o
      // -- x x x x x x x x x x x x x

      const selection = [
        {
          fromX: 0,
          fromY: 3,
          toX: 13,
          toY: 3,
          oldMouseMoveTo: { toX: 0, toY: 3 },
        },
      ];

      const copier = new Copier(table, selection);

      expect(copier.stringifyTable()).toBe(
        "\t\t\t\t\t\t\t\t\t\t\t\t\tmyLabel1\n"
      );
    });

    it("should return selection string from multiple label cells taking full width", () => {
      // -- x x x x x x x x x x x x x
      // oo o o o o o o o o o o o o o
      // -- x x x x x x x x x x x x x

      const selection = [
        {
          fromX: 0,
          fromY: 2,
          toX: 13,
          toY: 2,
          oldMouseMoveTo: { toX: 0, toY: 2 },
          isExclusion: false,
        },
      ];

      const copier = new Copier(table, selection);

      expect(copier.stringifyTable()).toBe(
        "\t\t\tmyLabel2\t\t\t\tmyLabel3\t\t\t\t\t\tmyLabel4\n"
      );
    });

    it("should return selection string from multiple cells with a label cell taking full width", () => {
      // -- x x x x x x x x x x x x x
      // oo o o o o o o o o o o o o o
      // -- x x x x x x x x x x x x x

      const selection = [
        {
          fromX: 0,
          fromY: 0,
          toX: 13,
          toY: 0,
          oldMouseMoveTo: { toX: 13, toY: 0 },
        },
      ];

      const copier = new Copier(table, selection);

      expect(copier.stringifyTable()).toBe(
        "myLabel1\t\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\n"
      );
    });
  });

  describe("Multiple Selections", () => {
    it("should return selection string from multiple selections", () => {
      // -- x x x x x x x
      // -- o o x o o x x
      // -- o o x o o x x
      // -- o o x o o x x
      // -- o o x o o x x
      const selection = [
        {
          fromX: 1,
          fromY: 5,
          toX: 2,
          toY: 7,
          oldMouseMoveTo: { toX: 2, toY: 7 },
          isExclusion: false,
        },
        {
          fromX: 4,
          fromY: 5,
          toX: 5,
          toY: 7,
          oldMouseMoveTo: { toX: 5, toY: 7 },
          isExclusion: false,
        },
      ];

      const copier = new Copier(table, selection);

      expect(copier.stringifyTable()).toBe(
        `-1079711\t-1022849\t \t-2991679\t144949\n-4715000\t-4715000\t \t-4715000\t-4715000\n39284029\t35977158\t \t30156737\t38093535\n`
      );
    });
  });
});
