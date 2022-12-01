import { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

export const DeleteHandlerContext = createContext();
export const EditHandlerContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editedText, setEditedText] = useState("");
  const [toggleEditMode, setToggleEditMode] = useState(true);

  useEffect(() => {
    // getting data from the server
    fetchingData();
  }, []);

  // fetching data
  const fetchingData = async () => {
    try {
      const res = await fetch("https://capricious-ash-stomach.glitch.me/tasks");
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  //Delete event
  const handleDelete = (id) => {
    // delete data
    deleteData(id);
    //set updated tasks
    setTasks(tasks.filter((task) => id !== task.id));
  };

  //Editing Event
  const handleEdit = (id) => {
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = true;
    setEditedText(editableTarget.text);
    setTasks([...tasks]);
    setToggleEditMode(false);

    //Re-arrange
    tasks
      .filter((task) => task.id !== id)
      .map((targetedEl) => (targetedEl.isEditable = false));
  };

  const deleteData = async (id) => {
    await fetch(`https://capricious-ash-stomach.glitch.me/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  //Editing task form handler
  const handleEditSubmitter = (e, id) => {
    e.preventDefault();
    setToggleEditMode(!toggleEditMode);

    //Persist data
    const editPersistance = {
      text: editedText,
      id: id,
    };

    //Puting request
    puttingRequest(id, editPersistance);

    //Real time update
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = false;
    editableTarget.text = editPersistance.text;
    setTasks([...tasks]);
  };

  const puttingRequest = async (id, newData) => {
    fetch(`https://capricious-ash-stomach.glitch.me/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  };

  return (
    <div className='wraper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10'>
      <DeleteHandlerContext.Provider value={handleDelete}>
        <EditHandlerContext.Provider value={handleEdit}>
          <Header />
          <AddTask tasks={tasks} setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            error={error}
            loading={loading}
            handleEditSubmitter={handleEditSubmitter}
            editedText={editedText}
            setEditedText={setEditedText}
          />
          <Footer />
        </EditHandlerContext.Provider>
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
