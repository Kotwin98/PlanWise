import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTodo, removeTodo, selectTodo } from "./todoSlice";

export function Todo() {
  const todos = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = useState('');

  return (
    <div>
      <input
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
      />
      <button onClick={() => dispatch(addTodo(userInput))}>Add todo</button>
      <div>
        <ul>
          {todos.map(todo => (
            <li>
              {todo} <button onClick={() => dispatch(removeTodo())}>Done</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}