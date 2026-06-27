import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProjectHeader from './components/ProjectHeader';
import BoardToolbar from './components/BoardToolbar';
import BoardPage from './pages/BoardPage';
import CreateTaskModal from './components/CreateTaskModal';
import type { TaskFormData } from './components/CreateTaskModal';

// Starting task number — in a real app this would come from the backend
const INITIAL_TASK_NUMBER = 1201;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskCounter, setTaskCounter] = useState(INITIAL_TASK_NUMBER);

  const openModal  = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTaskCreate = (task: TaskFormData) => {
    // TODO: wire to API / board state
    console.log('New task created:', task);
    setTaskCounter(prev => prev + 1);
  };

  return (
    <>
      <Navbar onCreateClick={openModal} />
      <ProjectHeader />
      <BoardToolbar />
      <BoardPage />

      {isModalOpen && (
        <CreateTaskModal
          taskNumber={taskCounter}
          onClose={closeModal}
          onSubmit={handleTaskCreate}
        />
      )}
    </>
  );
}

export default App;
