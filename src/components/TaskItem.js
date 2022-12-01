import { useContext } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DeleteHandlerContext, EditHandlerContext } from "../App";

const TaskItem = ({ task, handleEditSubmitter, editedText, setEditedText }) => {
  const handleDelete = useContext(DeleteHandlerContext);
  const handleEdit = useContext(EditHandlerContext);

  return (
    <div className='task-item flex justify-between items-center bg-gradient-to-r from-gray-800 to-slate-800 p-5 rounded hover:from-teal-900 hover:to-gray-800 group'>
      <div className='task-item-left flex gap-3'>
        <span>
          <input type='checkbox' className='accent-teal-400 cursor-pointer' />
        </span>

        {task.isEditable && (
          <form onSubmit={(e) => handleEditSubmitter(e, task.id)}>
            <input
              className='bg-transparent outline-none border-b-2 border-gray-500 pb-1 focus:border-teal-500'
              type='text'
              required
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </form>
        )}

        {!task.isEditable && (
          <p className='group-hover:text-teal-400'>{task.text}</p>
        )}
      </div>
      <div className='task-item-right flex gap-3 text-gray-500'>
        <button onClick={() => handleEdit(task.id)}>
          <FiEdit className='cursor-pointer hover:text-teal-400 duration-300' />
        </button>
        <button onClick={() => handleDelete(task.id)}>
          <FiTrash className='cursor-pointer hover:text-rose-500 duration-300' />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
