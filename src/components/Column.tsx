import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Column as column, Id, Task as task } from "../types";
import Task from "./Task";

interface Props {
  column: column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;

  tasks: task[];
}
const Column = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  tasks,
}: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [localTitle, setLocalTitle] = useState<string>(column.title);
  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-300 w-[350px] opacity-40 border-2 border-blue-500 h-[500px] max-h-[500px] rounded-md flex flex-col"
      >
        <div
          {...attributes}
          {...listeners}
          className="bg-gray-100 text-md h-[60px] cursor-grab rounded-md rounded-border-none p-3 border-4 border-gray-300 flex justify-between items-center"
        >
          {column.title}
          <div
            onClick={() => deleteColumn(column.id)}
            className="px-2 py-1 hover:text-red-600 cursor-pointer transition"
          >
            <FaTrash />
          </div>
        </div>

        <div className="flex flex-grow flex-col gap-4 p-2 overflow-hidden overflow-y-auto">
          {" "}
          {tasks.map((task) => {
            return (
              <Task
                updateTask={updateTask}
                deleteTask={deleteTask}
                key={task.id}
                task={task}
              />
            );
          })}
        </div>

        <div
          onClick={() => createTask(column.id)}
          className="flex gap-2 items-center border-slate-300 bg-slate-100 border-2 rounded-md p-4 hover:bg-slate-200 cursor-pointer justify-center"
        >
          <FaPlus />
          Add Task
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-300 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-gray-100 text-md h-[60px] cursor-grab rounded-md rounded-border-none p-3 border-4 border-gray-300 flex justify-between items-center"
      >
        {!editMode && localTitle}
        {editMode && (
          <input
            autoFocus
            value={localTitle}
            className="bg-slate-50 focus:border-blue-500 border rounded outline-none px-2"
            onChange={(e) => {
              setLocalTitle(e.target.value);
            }}
            onBlur={() => {
              setEditMode(false);
              if (localTitle !== column.title) {
                updateColumn(column.id, localTitle);
              }
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (e.key === "Enter") {
                if (localTitle !== column.title) {
                  updateColumn(column.id, localTitle);
                }
                setEditMode(false);
              }
            }}
          />
        )}
        <div
          onClick={() => deleteColumn(column.id)}
          className="px-2 py-1 hover:text-red-600 cursor-pointer transition"
        >
          <FaTrash />
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => {
            return (
              <Task
                updateTask={updateTask}
                deleteTask={deleteTask}
                key={task.id}
                task={task}
              />
            );
          })}
        </SortableContext>
      </div>

      <div
        onClick={() => createTask(column.id)}
        className="flex gap-2 items-center border-slate-300 bg-slate-100 border-2 rounded-md p-4 hover:bg-slate-200 cursor-pointer justify-center"
      >
        <FaPlus />
        Add Task
      </div>
    </div>
  );
};

export default Column;
