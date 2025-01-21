import { useEffect, useState } from "react";

export default function Timer({ setTimeOut, questionNumber }) {
  const [timer, setTimer] = useState(30);
  const [paused, setPaused] = useState(false); // State to track if the timer is paused

  // Timer logic
  useEffect(() => {
    if (paused) return; // Pause the timer if `paused` is true
    if (timer === 0) {
      setTimeOut(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, paused, setTimeOut]);

  // Reset timer when question number changes
  useEffect(() => {
    setTimer(45); // Reset to 45 seconds when a new question starts
  }, [questionNumber]);

  // Toggle pause state
  const togglePause = () => {
    setPaused((prev) => !prev);
  };

  return (
    <div
      onClick={togglePause} // Add click functionality to the timer itself
      style={{
        cursor: "pointer",
        fontSize: "45px",
        fontWeight: "bold",
        textAlign: "center",
        color: "white", // Adjust color as needed
        userSelect: "none", // Prevent text selection
      }}
      title={paused ? "Nhấn Để Tiếp Tục Thời Gian" : "Nhấn Để Dừng Thời Gian"} // Tooltip for user clarity
    >
      {timer}
    </div>
  );
}