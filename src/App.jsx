import "./App.css";
import { useMemo, useState, useEffect } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";

// Import the TriviaQuestions.json file
import triviaQuestions from "./components/TriviaQuestions.json";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("Chúc May Mắn Lần Sau!");
  const [questions] = useState(triviaQuestions);  // Use the imported JSON file directly

  // Shuffle function for randomizing questions
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const shuffledData = useMemo(() => shuffleArray([...questions]), [questions]);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "Bạn Cần Trả Lời Đúng Câu 2" },
        { id: 2, amount: "Giảm Giá 10% 1 Ly Nước" },
        { id: 3, amount: "Bạn Cần Trả Lời Đúng Câu 4" },
        { id: 4, amount: "Giảm Giá 20% 1 Ly Nước" },
        { id: 5, amount: "Bạn Cần Trả Lời Đúng Câu 6" },
        { id: 6, amount: "Giảm Giá 30% 1 Ly Nước" },
        { id: 7, amount: "Bạn Cần Trả Lời Đúng Câu 8" },
        { id: 8, amount: "Mua 1 Ly Nước, Tặng 1 Ly Nước" },
        { id: 9, amount: "Bạn Cần Trả Lời Đúng Câu 10" },
        { id: 10, amount: "Tặng 1 Ly Nước và 1 Vé Sự Kiện" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">Cảm Ơn Quý Khách, {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={shuffledData} // Pass shuffled data here
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;