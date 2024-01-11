import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import AddComment from "../components/AddComment";

describe("welcome text", () => {
  it("renders Welcome component", () => {
    render(<App />);
    const mainHeader = screen.getByRole("heading", {
      name: /Benvenuti in EpiBooks!/,
    });
    expect(mainHeader).toBeInTheDocument();
  });
  it("render all the books", () => {
    render(<App />);
    const allBooksCard = screen.getAllByTestId("book-card");
    expect(allBooksCard).toHaveLength(150);
  });
  it("commentArea component is render", () => {
    render(<AddComment />);
    const commentArea = screen.getByPlaceholderText(/inserisci qui il testo/i);
    expect(commentArea).toBeInTheDocument();
  });
});

describe("SingleBook selected check", () => {
  it("make the border red after click on it", () => {
    render(<App />);
    const allBooksCard = screen.getAllByTestId("book-card");
    const firstBook = allBooksCard[0];
    fireEvent.click(firstBook);
    expect(firstBook).toHaveStyle("border: 3px solid red");
  });
  it("restore the normal border after click another book", () => {
    render(<App />);
    const allBooksCard = screen.getAllByTestId("book-card");
    const firstBook = allBooksCard[0];
    fireEvent.click(firstBook);
    expect(firstBook).toHaveStyle("border: 3px solid red");
    const secondBook = allBooksCard[2];
    fireEvent.click(secondBook);
    expect(secondBook).toHaveStyle("border: 3px solid red");
    expect(firstBook).not.toHaveStyle("border: 3px solid red");
  });
});

describe("single comment check", () => {
  it("single comment is not in the page at render", () => {
    render(<App />);
    const booksComment = screen.queryAllByTestId("commento");
    expect(booksComment).toHaveLength(0);
  });
  it("render comments after click on a book", async () => {
    render(<App />);
    const allBooksCard = screen.getAllByTestId("book-card");
    const firstBook = allBooksCard[0];
    fireEvent.click(firstBook);
    const booksComment = await screen.findAllByTestId("commento");
    expect(booksComment).not.toHaveLength(0);
  });
});
