import { Container, Stack, Button } from "react-bootstrap";

import AddTaskModal from "./components/AddTaskModal";

import { useState } from "react";
import TasksCard from "./components/TasksCard";

import { useQuery } from "@apollo/client";
import { GET_TASKS } from "./queries/get_tasks";

function App() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const { loading, error, data } = useQuery(GET_TASKS, {
    // pollInterval: 10000,
  });

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Tasks</h1>
          <Button variant="outline-primary">View completed tasks (0)</Button>
          <Button
            variant="outline-success"
            onClick={() => setShowAddTaskModal(true)}
          >
            Add task
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <Stack gap={3} direction="vertical">
            
            {data.tasks.tasks.map((task: any) => {
              return (
                <TasksCard title={task.title} key={task.id} description={task.description} />
              );
            })}
            {data.tasks.tasks.length === 0 ? 'No tasks found' :''}
          </Stack>
        </div>
      </Container>

      <AddTaskModal
        show={showAddTaskModal}
        handleClose={() => setShowAddTaskModal(false)}
      />
    </>
  );
}

export default App;
