import { useQuestionStore } from '../store/question';

export function Footer() {
  const questions = useQuestionStore((state) => state.questions);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;

    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  return (
    <footer style={{ marginTop: '32px' }}>
      <strong>{`✅ ${correct} Correct - ❌ ${incorrect} Incorrect - ❓${unanswered} Unanswered`}</strong>
    </footer>
  );
}
