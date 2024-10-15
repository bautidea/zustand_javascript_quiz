import {
  Card,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useQuestionStore } from '../store/question';
import { type Question } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import confetti from 'canvas-confetti';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Footer } from './Footer';

// This function is used to obtain the background color of answers, based
// on user selection.
function answerBackgroundColor(info: Question, index: number) {
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

  // If user select this index as correct answer then it will be colored green.
  if (isCorrectUserAnswer && index === correctAnswer) {
    confetti();
    return 'green';
  }

  // The index that correspond to correct answer always should color green.
  if (index === correctAnswer) return 'green';

  return 'transparent';
}

function ShowQuestion({ info }: { info: Question }) {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);

  // This function is returning the execution of the state method.
  function handleAnswerClick(index: number) {
    return () => selectAnswer(info.id, index);
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
            disabled={info.userSelectedAnswer != null}
            onClick={handleAnswerClick(index)}
            sx={{
              backgroundColor: answerBackgroundColor(info, index),
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
  const nextQuestion = useQuestionStore((state) => state.goNextQuestion);
  const previousQuestions = useQuestionStore(
    (state) => state.goPreviousQuestion
  );

  const questionInfo = questions[currentQuestions];

  return (
    <>
      <ShowQuestion info={questionInfo} />

      <Stack
        gap={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        marginTop={2}
      >
        <IconButton
          onClick={previousQuestions}
          disabled={currentQuestions === 0}
        >
          <ArrowBackIos />
        </IconButton>

        <span>
          {currentQuestions + 1} / {questions.length}
        </span>

        <IconButton
          onClick={nextQuestion}
          disabled={currentQuestions === questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>

      <Footer />
    </>
  );
}
