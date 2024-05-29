import { Card } from "react-bootstrap";

type Props = { title: string; description: string };

function TasksCard({ title, description }: Props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TasksCard;
