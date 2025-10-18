import React, { useEffect, useReducer } from "react";
import { Container, Button, Card, ProgressBar, Badge } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    { id: 1, question: "Thủ đô của Việt Nam là?", options: ["Hồ Chí Minh", "Hà Nội", "Huế", "Đà Nẵng"], answer: "Hà Nội" },
    { id: 2, question: "Hoàng Sa, Trường Sa là của?", options: ["Việt Nam", "越南", "Viet Nam", "Tất cả đáp án trên"], answer: "Tất cả đáp án trên" },
    { id: 3, question: "Quốc kỳ của Việt Nam có màu gì?", options: ["Cờ đỏ sao vàng", "Cờ đỏ sao đỏ", "Cờ vàng sao đỏ", "Cờ vàng sao vàng"], answer: "Cờ đỏ sao vàng" },
    { id: 4, question: "Tiêu ngữ của Việt Nam là?", options: ["Độc lập", "Tự do", "Hạnh phúc", "Độc lập - Tự do - Hạnh phúc"], answer: "Độc lập - Tự do - Hạnh phúc" },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  phase: "question", //quá trình thực hiện "question", "feedback", "finished"
  lastResult: null,
  timeLeft: 10,
  highScore: 0
};

const getHighScore = () => {
  try {
    const raw = localStorage.getItem("quiz_high_score");
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "TICK": {
      const next = Math.max(0, state.timeLeft - 1);
      return { ...state, timeLeft: next };
    }

    case "TIMES_UP": {
      if (state.phase !== "question") return state;
      const q = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === q.answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        phase: "feedback",
        lastResult: { correct: isCorrect, correctAnswer: q.answer },
      };
    }

    case "CHECK": {
      if (state.phase !== "question") return state;
      const q = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === q.answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        phase: "feedback",
        lastResult: { correct: isCorrect, correctAnswer: q.answer },
      };
    }

    case "CONTINUE": {
      const nextIndex = state.currentQuestion + 1;
      // câu cuối -> kết thúc
      if (nextIndex >= state.questions.length) {
        const finalScore = state.score;
        const newHigh = Math.max(finalScore, state.highScore);
        if (newHigh !== state.highScore) {
          localStorage.setItem("quiz_high_score", String(newHigh));
        }
        return {
          ...state,
          phase: "finished",
          highScore: Math.max(finalScore, state.highScore),
        };
      }
      // sang câu mới
      return {
        ...state,
        currentQuestion: nextIndex,
        selectedOption: "",
        phase: "question",
        lastResult: null,
        timeLeft: 10,
      };
    }

    case "RESTART_QUIZ": {
      return {
        ...state,
        currentQuestion: 0,
        selectedOption: "",
        score: 0,
        phase: "question",
        lastResult: null,
        timeLeft: 10,
      };
    }

    default:
      return state;
  }
}


function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, 
    initialState,
    (s) => ({ ...s, highScore: getHighScore() })
  );
  const { questions, currentQuestion, selectedOption, score, phase, lastResult, timeLeft, highScore } = state;

  const total = questions.length;

  const percent = Math.round(((currentQuestion + 1)/ total) * 100);

  const handleOptionSelect = (option) =>
    dispatch({ type: "SELECT_OPTION", payload: option });

  const handleCheck = () => dispatch({ type: "CHECK" });

  const handleContinue = () =>  dispatch({ type: "CONTINUE" });

  const handleRestartQuiz = () => dispatch({ type: "RESTART_QUIZ" });

  useEffect(() => {
    if (phase !== "question") return;
    if (timeLeft <= 0) {
      dispatch({ type: "TIMES_UP" });
      return;
    }
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft]);

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {phase === "finished" ? (
          <div className="text-center">
            <h2>Your Score: {score} / {total}</h2>
            <p>
              High Score: <Badge bg="success">{String(highScore)}</Badge>
            </p>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="px-5 py-3">
              <ProgressBar now={percent} label={`${percent}%`} />
            </div>
            <div style={{ minWidth: 120 }} className="text-end">
                <Badge bg={timeLeft < 5 ? "danger" : "secondary"}>
                  ⏱ {timeLeft}s
                </Badge>
            </div>
            <h4>
              Question {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedOption === option ? "success" : "outline-secondary"}
                  className="m-2"
                  onClick={() => (phase === "question" ? handleOptionSelect(option) : null)}
                  disabled={phase !== "question"}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Nút hành động theo phase */}
            {phase === "question" ? (
              <Button
                variant="primary"
                className="mt-4"
                disabled={!selectedOption && timeLeft > 0}
                onClick={handleCheck}
              >
                {currentQuestion === total - 1 ? "Finish" : "Check"}
              </Button>
            ) : (
              <>
                {/* FEEDBACK */}
                <div className="mt-4">
                  {lastResult?.correct ? (
                    <div className="d-flex align-items-center justify-content-center gap-2 text-success">
                      <FaCheckCircle />
                      <span>Correct! 🎉</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center gap-2 text-danger">
                      <FaTimesCircle />
                      <span>
                        Incorrect! The correct answer is{" "}
                        <strong>{lastResult?.correctAnswer}</strong>
                      </span>
                    </div>
                  )}
                </div>

            <Button
              variant="primary"
              className="mt-3"
              onClick={handleContinue}
            >
              {currentQuestion === total - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
            </>
            )}
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;