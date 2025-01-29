import { useState, useEffect } from "react";
import { fetchUserData, handleClick } from "./utils/api"; // Import API functions

const App = () => {
  const [username, setUsername] = useState("");
  const [enteredUsername, setEnteredUsername] = useState(null);
  const [counter, setCounter] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (enteredUsername) {
      fetchUserData(enteredUsername).then((data) => {
        setCounter(data.counter);
        setRewards(data.rewards);
      });
    }
  }, [enteredUsername]);

  const handleClickButton = async () => {
    const data = await handleClick(enteredUsername);
    setCounter(data.counter);
    setRewards(data.rewards);

    if (data.prize > 0) {
      setMessage("🎉 You won a prize!");
    } else if (data.points > 0) {
      setMessage(`✨ Bonus! +${data.points} points`);
    } else {
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#EFEFEF]">
      {!enteredUsername ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-[#16262E]">Welcome to Clicker Game</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border border-[#A4A4A4] rounded-lg focus:outline-none"
          />
          <button
            onClick={() => username && setEnteredUsername(username)}
            className="ml-2 px-6 py-2 bg-[#006064] text-white rounded-lg shadow-lg hover:bg-[#087F8C] transition"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-[#16262E]">Clicker Game</h1>
          <button
            onClick={handleClickButton}
            className="px-6 py-3 bg-[#006064] text-white rounded-lg shadow-lg hover:bg-[#087F8C] transition"
          >
            Click Me!
          </button>
          <p className="mt-4 text-lg text-[#16262E]">Score: {counter}</p>
          <p className="text-lg text-[#16262E]">Prizes Won: {rewards}</p>
          {message && <p className="mt-2 text-[#7B0D1E] font-bold">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
