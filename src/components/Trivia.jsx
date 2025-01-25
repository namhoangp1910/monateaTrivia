import { useEffect, useState, useMemo } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Trivia({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
}) {
  const [shuffledData, setShuffledData] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  // Shuffle the data on component mount
  useEffect(() => {
    setShuffledData([...data].sort(() => Math.random() - 0.5));
  }, [data]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    if (shuffledData.length > 0) {
      setQuestion(shuffledData[questionNumber - 1]);
    }
  }, [shuffledData, questionNumber]);

  const shuffledAnswers = useMemo(() => {
    if (!question) return [];
    return question.answers
      .map((answer) => ({
        text: answer,
        correct: answer === question.correctAnswer,
      }))
      .sort(() => Math.random() - 0.5);
  }, [question]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });

    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {shuffledAnswers.map((a, index) => (
          <div
            key={index}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}