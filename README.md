# JavaScript Quiz

This JavaScript Quiz App is built with **React**, **TypeScript**, **Zustand**, and **Material-UI**. The app provides a quiz with JavaScript-related questions, featuring code snippets for users to review and select the correct answer.

## Features

- **JavaScript Questions**: A series of JavaScript questions with code snippets for users to answer.
- **Syntax Highlighting**: Code snippets are rendered with syntax highlighting using `react-syntax-highlighter`.
- **State Management**: Zustand is used to manage the quiz state, including fetching questions, tracking answers, and navigating between questions.
- **Progress Tracking**: The app tracks the number of correct, incorrect, and unanswered questions and displays a summary after each question.
- **Dark Theme**: The app is styled with Material-UI's dark theme for a sleek user interface.
- **Confetti Effect**: A fun confetti animation is triggered when the user selects the correct answer.

## Developed using:

- **[Zustand]('https://zustand-demo.pmnd.rs/')** - Fast and scalable state management solution. They key benefit of using this library: Minimal boilerplate (compared to other state management libraries), doesnt need a context provider, only components that depends on state changes re-render, and it has flexible API (supports simple and advanced use cases).

- **[Material UI]('https://mui.com/')** - React library that implements Google's Material Design. It provides a collection of prebuilt, ready for use, components.

- **[React Syntax Highlighter]('https://github.com/react-syntax-highlighter/react-syntax-highlighter')** - This component shows the code in quiz questions, as it was being displayed through an editor, with syntax highlighting.
