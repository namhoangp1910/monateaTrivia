import { useRef } from "react";

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    const username = inputRef.current.value.trim(); // Trim whitespace
    if (username) {
      setUsername(username);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick(); // Trigger handleClick on Enter
    }
  };

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="Nhập Tên Quý Khách"
        ref={inputRef}
        onKeyPress={handleKeyPress} // Handle Enter key
      />
      <button className="startButton" onClick={handleClick}>
        Bắt Đầu Chơi
      </button>
    </div>
  );
}