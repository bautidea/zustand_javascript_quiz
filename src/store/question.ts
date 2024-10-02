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
}));
