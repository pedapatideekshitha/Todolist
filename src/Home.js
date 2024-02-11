import { useState } from "react";
import "./App.css";
import Create from "./Create";

function Home() {
  const [todo, setTodo] = useState([]);
  return (
    <div>
      <Create />
      {todo.map((todo) => {
        <div>{todo}</div>;
      })}
    </div>
  );
}

export default Home;
