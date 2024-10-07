import { Button } from '@mui/material';
import { useQuestionStore } from '../store/question';

const QUESTION_LIMIT = 10;

export function Start() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestion);

  const handleClick = () => {
    fetchQuestions(QUESTION_LIMIT);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      Start
    </Button>
  );
}
