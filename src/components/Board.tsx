interface IBoard {
  board: number[][];
}
export default function Board(props: IBoard) {
  const { board } = props;

  return board.map((jArray) => {
    return (
      <div>
        {jArray.map((e) => (
          // <button>{e}</button>
          <Square value={e} />
        ))}
      </div>
    );
  });
}

interface ISquare {
  value: number;
  setValue: (yCoordinate: number, xCoordinate: number) => void;
}
function Square(props: ISquare) {
  const { value } = props;

  return <button>{value}</button>;
}
