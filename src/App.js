import React, { useState } from "react";
import "./App.css";

function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: "To do", items: [{ id: 1, title: "Go to shop" }] },
    { id: 2, title: "Check", items: [{ id: 2, title: "Work list" }] },
    {
      id: 3,
      title: "Done",
      items: [
        { id: 3, title: "Do homework" },
        { id: 4, title: "Do dinner" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dropHandler = (e, board, item) => {
    e.preventDefault();

    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className="boart__title">{board.title}</div>
          {board.items.map((item) => (
            <div
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              className="item"
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
