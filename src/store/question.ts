import { create } from 'zustand';
import { type Question } from '../types';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => void;
}

export const useQuestionStore = create<State>((set) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestion: async (limit) => {
    set((state) => ({
      questions: [
        {
          'id': 1,
          'question': '¿Cuál es la salida de este código?',
          'code': 'console.log(typeof NaN)',
          'answers': ['undefined', 'NaN', 'string', 'number'],
          'correctAnswer': 3,
        },
      ],
    }));
  },
}));
