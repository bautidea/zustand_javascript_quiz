import { Button } from '@mui/material';
import { useQuestionStore } from './store/question';

export function Start() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestion);

  const handleClick = () => {
    fetchQuestions(5);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      Start
    </Button>
  );
}
