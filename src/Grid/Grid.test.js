import { render, screen } from "@testing-library/react";
import Grid from "./Grid";

test("renders grid", () => {
  render(<Grid />);
  const element = screen.getByTestId(/grid/i);
  expect(element).toBeInTheDocument();
});

test("renders grid with 2 columns", () => {
  render(<Grid columns={2} />);
  const element = screen.getByTestId(/grid/i);
  expect(element).toHaveStyle("grid-template-columns: repeat(2,1fr);");
});

test("renders grid with 3 columns", () => {
  render(<Grid columns={3} gap={3} />);
  const element = screen.getByTestId(/grid/i);
  expect(element).toHaveStyle("grid-template-columns: repeat(3,1fr);");
  expect(element).toHaveStyle("gap: 3px;");
});

test("renders grid with 2 columns and 2 rows", () => {
  render(
    <Grid
      columns={24}
      layout={[
        { id: 1, width: 3, height: 1, x: { start: 1 }, y: { start: 1 } },
        { id: 2, width: 3, height: 1, x: { start: 5 }, y: { start: 1 } },
        { id: 3, width: 24, height: 1, x: { start: 1 }, y: { start: 2 } },
      ]}
    >
      <div id={1} data-testid={1}>
        1
      </div>
      <div id={2} data-testid={2}>
        2
      </div>
      <div id={3} data-testid={3}>
        3
      </div>
    </Grid>
  );

  const elementOne = screen.getByTestId(/1/i);
  const elementTwo = screen.getByTestId(/2/i);
  const elementThree = screen.getByTestId(/3/i);
  const parentOne = elementOne.parentElement;
  const parentTwo = elementTwo.parentElement;
  const parentThree = elementThree.parentElement;

  expect(parentOne).toHaveStyle("grid-column: 1 / 4;");
  expect(parentOne).toHaveStyle("grid-row: 1 / 2;");
  expect(elementOne).toBeInTheDocument();

  expect(parentTwo).toHaveStyle("grid-column: 5 / 8;");
  expect(parentTwo).toHaveStyle("grid-row: 1 / 2;");
  expect(elementTwo).toBeInTheDocument();

  expect(parentThree).toHaveStyle("grid-column: 1 / 25;");
  expect(parentThree).toHaveStyle("grid-row: 2 / 3;");
  expect(elementThree).toBeInTheDocument();
});

test("renders grid items in columns range", () => {
  render(
    <Grid
      columns={2}
      layout={[
        { id: 1, width: 3, height: 1, x: { start: 1 }, y: { start: 1 } },
        { id: 2, width: 3, height: 1, x: { start: 5 }, y: { start: 1 } },
        { id: 3, width: 24, height: 1, x: { start: 1 }, y: { start: 2 } },
      ]}
    >
      <div id={1} data-testid={1}>
        1
      </div>
      <div id={2} data-testid={2}>
        2
      </div>
      <div id={3} data-testid={3}>
        3
      </div>
    </Grid>
  );

  const elementOne = screen.getByTestId(/1/i);
  const elementTwo = screen.getByTestId(/2/i);
  const parentOne = elementOne.parentElement;
  const parentTwo = elementTwo.parentElement;

  expect(parentOne).toHaveStyle("grid-column: 1 / 4;");
  expect(parentOne).toHaveStyle("grid-row: 1 / 2;");
  expect(elementOne).toBeInTheDocument();

  expect(parentTwo).toHaveStyle("grid-column: 5 / 8;");
  expect(parentTwo).toHaveStyle("grid-row: 1 / 2;");
  expect(elementTwo).toBeInTheDocument();

  expect(() => screen.getByTestId(/3/i)).toThrowError();
});
