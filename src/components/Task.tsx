import { FaTrash } from "react-icons/fa";
import { Id, Task as task } from "../types";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const Task = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-100 relative opacity-40 border-blue-500 border-2 transition p-2 h-[100px] min-h-[100px] flex items-center rounded-md"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-slate-100 relative hover:border-blue-500 border-2 transition p-2 h-[100px] min-h-[100px] flex items-center rounded-md cursor-grab"
      >
        <textarea
          className="h-full w-full resize-none border-none rounded bg-transparent focus:outline-none "
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-slate-100 relative hover:border-blue-500 border-2 transition p-2 h-[100px] min-h-[100px] flex items-center rounded-md cursor-grab"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={toggleEditMode}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-auto whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-60 hover:opacity-100 hover:text-red-500 cursor-pointer"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default Task;
