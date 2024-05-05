import "./Todo.css";

export const Todo = ({ id, removeTask, markAsDone, label, isDone }) => {
  console.log(isDone);
  const handleRemove = () => {
    removeTask(id);
  };
  const handleDone = () => {
    markAsDone(id);
  };

  return (
    <>
      <div className="task__container">
        <button onClick={handleDone}> {isDone ? "X" : "✔"}</button>
        <p className={isDone ? 'line-through' : ''}>{label}</p>
        <button onClick={handleRemove}>
          <i className="fa-solid fa-delete-left"></i>
        </button>
      </div>
    </>
  );
};
