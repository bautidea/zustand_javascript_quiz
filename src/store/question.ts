import { create } from 'zustand';
import { type Question } from '../types';
import { persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionInd: number, answerInd: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  resetGame: () => void;
}

export const useQuestionStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestion: async (limit) => {
        // Fetching from public data.
        const response = await fetch('http://localhost:5173/data.json');

        if (!response.ok)
          throw new Error('Couldnt load quiz questions, try again.');

        const data = await response.json();

        // From 50 question im keeping randomly up to the limit variable.
        const questions = data
          .map((q: Question) => ({ q, rand: Math.random() }))
          .sort(
            (
              { rand: aRand }: { q: Question; rand: number },
              { rand: bRand }: { q: Question; rand: number }
            ) => aRand - bRand
          )
          .map(({ q }: { q: Question; rand: number }) => q)
          .slice(0, limit);

        set({ questions });
      },

      selectAnswer: (questionInd, answerInd) => {
        // Retrieving state, to get all questions.
        const { questions } = get();
        // Using structuredClone to clone all questions.
        const newQuestions = structuredClone(questions);

        // Finding the question index that the answer was selected from.
        const questionIndex = newQuestions.findIndex(
          (q) => q.id === questionInd
        );

        // Im retrieving the index of the question (and not the id), because it will be
        // easier to update the question based on the array index, than the id from the question.
        const questionInfo = newQuestions[questionIndex];

        // Checking if its the correct answer.
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerInd;

        if (isCorrectUserAnswer) {
          confetti();
        }

        // Updating the state, adding the properties for selected answer by user.
        newQuestions[questionIndex] = {
          ...questionInfo,
          userSelectedAnswer: answerInd,
          isCorrectUserAnswer,
        };

        set({ questions: newQuestions });
      },

      goNextQuestion: () => {
        const { currentQuestion, questions } = get();
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion <= questions.length) {
          set({ currentQuestion: nextQuestion });
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestion } = get();
        const previousQuestion = currentQuestion - 1;
        if (previousQuestion >= 0) {
          set({ currentQuestion: previousQuestion });
        }
      },

      resetGame: () => {
        set({ currentQuestion: 0, questions: [] });
      },
    }),
    { name: 'questions' }
  )
);
