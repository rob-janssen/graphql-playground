import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Modal, Button } from "react-bootstrap";

import { ADD_TASK } from "../queries/add_task";

interface ModalProps {
  show: boolean;
  handleClose: any;
}

export default function AddTaskModal({ show, handleClose }: ModalProps) {
  const [addTask] = useMutation(ADD_TASK);
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            // e.preventDefault();
            addTask({
              variables: {
                title: taskInput.title,
                description: taskInput.description,
              },
            });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setTaskInput({ ...taskInput, title: e.target.value })
                }
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setTaskInput({ ...taskInput, description: e.target.value })
                }
                as={"textarea"}
                rows={3}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}
