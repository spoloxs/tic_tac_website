import { useState } from "react";
import { Button} from 'react-bootstrap';
import Box from "@mui/material/Box";
export default function TicTac() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextchance, setNextChance] = useState(false);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (nextchance ? "O" : "X");
  }

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextsquares = squares.slice();
    if(nextchance){
      nextsquares[i] = "O";
    }
    else{
      nextsquares[i] = "X";
    }
    setNextChance(!nextchance);
    setSquares(nextsquares);
  }

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    >
    <board>
      <div className="status">
        {status}
      </div>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => handleClick(0)} />
        <Square value={squares[1]} handleClick={() => handleClick(1)}/>
        <Square value={squares[2]} handleClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handleClick(3)}/>
        <Square value={squares[4]} handleClick={() => handleClick(4)}/>
        <Square value={squares[5]} handleClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handleClick(6)}/>
        <Square value={squares[7]} handleClick={() => handleClick(7)}/>
        <Square value={squares[8]} handleClick={() => handleClick(8)}/>
      </div>
    </board>
    </Box>
  );
}

function Square({ value, handleClick }) {
  return (
    <Button variant="flat" size="large" onClick={handleClick} style={{ width: "100px", height: "50px",}}>
      {value}
    </Button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}