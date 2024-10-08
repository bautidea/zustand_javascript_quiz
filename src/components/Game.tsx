import {
  Card,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useQuestionStore } from '../store/question';
import { type Question } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Props {
  info: Question;
}

function ShowQuestion({ info }: Props) {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', padding: 2, marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }}>
        {info.answers.map((answer, index) => (
          <ListItemButton
            key={index}
            sx={{ textAlign: 'center' }}
            divider
            onClick={() => selectAnswer(info.id, index)}
          >
            <ListItemText>{answer}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Card>
  );
}

export function Game() {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestions = useQuestionStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestions];

  return (
    <>
      <ShowQuestion info={questionInfo} />
    </>
  );
}
