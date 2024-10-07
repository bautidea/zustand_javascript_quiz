import { Container, Stack, Typography } from '@mui/material';
import './App.css';
import { JavaScriptIcon } from './assets/Icons';
import { Start } from './components/Start';
import { useQuestionStore } from './store/question';
import { type Question } from './types';
import { Game } from './components/Game';

function App() {
  const questions: Question[] = useQuestionStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptIcon />

          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
