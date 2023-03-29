import table from "./TableMock";
import { Copier } from ".";
import { replaceEmptyCellValue } from "../../utils";

// o  = cell selected
// oo = selected label
// -- = label not selected
// x  = cell not selected

describe("Copier", () => {
  describe("One Selection", () => {
    const headerData = [
      {
        title: "",
      },
      {
        title: "jan",
      },
      {
        title: "feb",
      },
      {
        title: "mar",
      },
      {
        title: "apr",
      },
      {
        title: "may",
      },
      {
        title: "jun",
      },
      {
        title: "jul",
      },
      {
        title: "aug",
      },
      {
        title: "sep",
      },
      {
        title: "okt",
      },
      {
        title: "nov",
      },
      {
        title: "dec",
      },
    ];
    it("should return selection string with header data", () => {
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

      const copier = new Copier(table, selection, headerData);

      expect(copier.stringifyTable()).toBe(
        `\tjan\tfeb\tmar\tapr\tmay\tjun\tjul\taug\tsep\tokt\tnov\tdec\nSkattar\t-1079711\t-1022849\nAfskriftir\t-4715000\t-4715000\nSérverk\t39284029\t35977158\nAðrar tekjur\t3300025\t2734444\n`
      );
    });
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
      const expectedResult = `Skattar\t-1079711\t-1022849\nAfskriftir\t-4715000\t-4715000\nSérverk\t39284029\t35977158\nAðrar tekjur\t3300025\t2734444\n`;

      expect(copier.stringifyBody()).toBe(expectedResult);
      expect(copier.stringifyTable()).toBe(expectedResult);
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

      expect(copier.stringifyBody()).toBe(
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

      expect(copier.stringifyBody()).toBe(
        "myLabel1\t\t\t\t\t\t\t\t\t\t\t\t\t\n"
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

      expect(copier.stringifyBody()).toBe(
        "myLabel2\t\t\tmyLabel3\t\t\t\tmyLabel4\t\t\t\t\t\t\n"
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

      expect(copier.stringifyBody()).toBe(
        "myLabel1\tmyLabel2\t\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\tmyLabel2\n"
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

      expect(copier.stringifyBody()).toBe(
        `-1079711\t-1022849\t \t-2991679\t144949\n-4715000\t-4715000\t \t-4715000\t-4715000\n39284029\t35977158\t \t30156737\t38093535\n`
      );
    });


  });

  it("should replace -- by 0", () => {
    const data = `
    jan	feb	mar	apr	may	jun	jul	aug	sep	okt	nov	dec	totals
    Category	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Reikni stuff	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Category2	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Gestafjöldi og meðalverð													
    Gestafjöldi	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Meðalverð	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Gjafavörusala pr. gest	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
                              
    Tekjur													
    Aðgangur að sýningu	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Gjafavara	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Viðburðir	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Aðrar tekjur	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Samtals tekjur	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
                              
    KSV	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Laun og starfsm kostn	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Húsnæðiskostnaður	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Markaðskostnaður	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Annar kostnaður	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Rekstrarkostnaður samtals	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
                              
    EBITDA	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    EBITDA %	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
                              
    Afskriftir	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Vextir	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Skattar	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Rekstrarhlutföll													
    Hagnaður	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
                              
                              
    Rekstrarhlutföll													
    Aðgangur að sýningu	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Gjfavara	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Viðburðir	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Aðrar tekjur	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Samtals tekjur	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
                              
    KSV / Gjafavara	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Laun og starfsm kostn	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Húnæðiskosntaður	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Markaðskostnaður	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    Annar kostnaður %	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -	- -
    `.trim()

    const expected = `
    jan	feb	mar	apr	may	jun	jul	aug	sep	okt	nov	dec	totals
    Category	0	0	0	0	0	0	0	0	0	0	0	0	0
    Reikni stuff	0	0	0	0	0	0	0	0	0	0	0	0	0
    Category2	0	0	0	0	0	0	0	0	0	0	0	0	0
    Gestafjöldi og meðalverð													
    Gestafjöldi	0	0	0	0	0	0	0	0	0	0	0	0	0
    Meðalverð	0	0	0	0	0	0	0	0	0	0	0	0	0
    Gjafavörusala pr. gest	0	0	0	0	0	0	0	0	0	0	0	0	0
                              
    Tekjur													
    Aðgangur að sýningu	0	0	0	0	0	0	0	0	0	0	0	0	0
    Gjafavara	0	0	0	0	0	0	0	0	0	0	0	0	0
    Viðburðir	0	0	0	0	0	0	0	0	0	0	0	0	0
    Aðrar tekjur	0	0	0	0	0	0	0	0	0	0	0	0	0
    Samtals tekjur	0	0	0	0	0	0	0	0	0	0	0	0	0
                              
    KSV	0	0	0	0	0	0	0	0	0	0	0	0	0
    Laun og starfsm kostn	0	0	0	0	0	0	0	0	0	0	0	0	0
    Húsnæðiskostnaður	0	0	0	0	0	0	0	0	0	0	0	0	0
    Markaðskostnaður	0	0	0	0	0	0	0	0	0	0	0	0	0
    Annar kostnaður	0	0	0	0	0	0	0	0	0	0	0	0	0
    Rekstrarkostnaður samtals	0	0	0	0	0	0	0	0	0	0	0	0	0
                              
    EBITDA	0	0	0	0	0	0	0	0	0	0	0	0	0
    EBITDA %	0	0	0	0	0	0	0	0	0	0	0	0	0
                              
    Afskriftir	0	0	0	0	0	0	0	0	0	0	0	0	0
    Vextir	0	0	0	0	0	0	0	0	0	0	0	0	0
    Skattar	0	0	0	0	0	0	0	0	0	0	0	0	0
    Rekstrarhlutföll													
    Hagnaður	0	0	0	0	0	0	0	0	0	0	0	0	0
                              
                              
    Rekstrarhlutföll													
    Aðgangur að sýningu	0	0	0	0	0	0	0	0	0	0	0	0	0
    Gjfavara	0	0	0	0	0	0	0	0	0	0	0	0	0
    Viðburðir	0	0	0	0	0	0	0	0	0	0	0	0	0
    Aðrar tekjur	0	0	0	0	0	0	0	0	0	0	0	0	0
    Samtals tekjur	0	0	0	0	0	0	0	0	0	0	0	0	0
                              
    KSV / Gjafavara	0	0	0	0	0	0	0	0	0	0	0	0	0
    Laun og starfsm kostn	0	0	0	0	0	0	0	0	0	0	0	0	0
    Húnæðiskosntaður	0	0	0	0	0	0	0	0	0	0	0	0	0
    Markaðskostnaður	0	0	0	0	0	0	0	0	0	0	0	0	0
    Annar kostnaður %	0	0	0	0	0	0	0	0	0	0	0	0	0
    `.trim()

    expect(replaceEmptyCellValue(data)).toBe(expected)

  })
})
