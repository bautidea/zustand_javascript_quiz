import { Container, Stack, Typography } from '@mui/material';
import './App.css';
import { JavaScriptIcon } from './assets/Icons';
import { Start } from './Start';

function App() {
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

        <Start />
      </Container>
    </main>
  );
}

export default App;
