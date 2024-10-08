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

  // This function is returning the execution of the state method.
  function handleAnswerClick(index: number) {
    return () => selectAnswer(info.id, index);
  }

  // This function is used to obtain the background color of answers, based
  // on user selection.
  function answerBackgroundColor(index: number) {
    const { userSelectedAnswer, isCorrectUserAnswer, correctAnswer } = info;

    // If user hasn't selected an answer.
    // Using only '==' because if i use '===' this condition wont be triggered
    // because the property 'userSelectedAnswer' wont be created until the user
    // clicks on an answer.
    // When we evaluate a property that has not yet been created with '==='
    // this will return undefined not null.
    // If i use !userSelectedAnswer and the index is 0 this will evaluate as true
    // and then this condition will always be true.
    if (userSelectedAnswer == null) return 'transparent';

    // If user has selected an answer, but its incorrect.
    if (!isCorrectUserAnswer && index === userSelectedAnswer) return 'red';

    // The index that correspond to correct answer always should color green.
    // If user select this index as correct answer then it will be colored green.
    if (index === correctAnswer) return 'green';
    return 'transparent';
  }

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', padding: 2, marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333', padding: 2 }}>
        {info.answers.map((answer, index) => (
          <ListItemButton
            key={index}
            divider={info.answers.length !== index + 1}
            disabled={info?.userSelectedAnswer != null}
            onClick={handleAnswerClick(index)}
            sx={{
              backgroundColor: answerBackgroundColor(index),
            }}
          >
            <ListItemText sx={{ textAlign: 'center' }}>{answer}</ListItemText>
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
