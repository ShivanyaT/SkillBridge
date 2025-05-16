import React, { useState } from 'react';

// Types
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  javascript: QuizQuestion[];
  python: QuizQuestion[];
  html: QuizQuestion[];
}

const quizData: QuizData = {
  javascript: [
    {
      question: "What is the output of `typeof NaN` in JavaScript?",
      options: ["undefined", "object", "number", "NaN"],
      correctAnswer: "number"
    },
    {
      question: "Which method is used to convert JSON to a JavaScript object?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
      correctAnswer: "JSON.parse()"
    },
    {
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "const", "let", "both let and const"],
      correctAnswer: "both let and const"
    },
    {
      question: "What does `===` do in JavaScript?",
      options: ["Assigns a value", "Compares value only", "Compares value and type", "Checks only type"],
      correctAnswer: "Compares value and type"
    },
    {
      question: "Which of these is not a primitive data type?",
      options: ["Boolean", "Null", "Object", "String"],
      correctAnswer: "Object"
    }
  ],
  python: [
    {
      question: "Which keyword is used for function in Python?",
      options: ["func", "def", "function", "lambda"],
      correctAnswer: "def"
    },
    {
      question: "What is the output of `bool(0)` in Python?",
      options: ["True", "False", "0", "Error"],
      correctAnswer: "False"
    },
    {
      question: "Which of the following is a mutable type?",
      options: ["Tuple", "List", "String", "Integer"],
      correctAnswer: "List"
    },
    {
      question: "What is the correct file extension for Python files?",
      options: [".py", ".python", ".pt", ".pyt"],
      correctAnswer: ".py"
    },
    {
      question: "What is used to handle exceptions in Python?",
      options: ["try/except", "catch/except", "throw/catch", "try/catch"],
      correctAnswer: "try/except"
    }
  ],
  html: [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used for inserting a line break?",
      options: ["<lb>", "<break>", "<br>", "<line>"],
      correctAnswer: "<br>"
    },
    {
      question: "Which attribute is used to define inline styles?",
      options: ["style", "class", "css", "font"],
      correctAnswer: "style"
    },
    {
      question: "What is the correct HTML for creating a hyperlink?",
      options: ["<a>link</a>", "<a href='url'>link</a>", "<link href='url'>", "<href>link</href>"],
      correctAnswer: "<a href='url'>link</a>"
    },
    {
      question: "Which HTML element is used for the largest heading?",
      options: ["<h1>", "<head>", "<heading>", "<h6>"],
      correctAnswer: "<h1>"
    }
  ]
};

const QuizPage: React.FC = () => {
  type Subject = keyof typeof quizData;
  const [selectedSubject, setSelectedSubject] = useState<Subject>('javascript');
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    if (!submitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: answer
      }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quizData[selectedSubject].forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Quiz Application
        </h1>

        {/* Subject Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {Object.keys(quizData).map((subject) => (
            <button
              key={subject}
              onClick={() => {
                if (!submitted) {
                  setSelectedSubject(subject as Subject);
                  setUserAnswers({});
                }
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-colors
                ${selectedSubject === subject
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                } ${submitted ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={submitted}
            >
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </button>
          ))}
        </div>

        {/* Quiz Questions */}
        <div className="space-y-6">
          {quizData[selectedSubject].map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {questionIndex + 1}. {question.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(questionIndex, option)}
                    className={`p-3 rounded-lg text-left transition-colors
                      ${!submitted
                        ? userAnswers[questionIndex] === option
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                        : userAnswers[questionIndex] === option
                        ? option === question.correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-red-100 border-2 border-red-500'
                        : option === question.correctAnswer
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-50'
                      }`}
                    disabled={submitted}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit/Reset Button */}
        <div className="mt-8 flex justify-center">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              disabled={Object.keys(userAnswers).length !== 5}
            >
              Submit Answers
            </button>
          ) : (
            <div className="text-center">
              <p className="text-xl font-medium mb-4">
                Your Score: {calculateScore()} out of 5
              </p>
              <button
                onClick={handleReset}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 