import { useEffect, useState } from "react"

const App = () => {

  const [gameState, setGameState] = useState("idle"); 
  const [message, setMessage] = useState("Kattints a START gombra!");
  const [startTime, setStartTime] = useState(0);
  const [timeoutId, setTimeoutId] = useState(0);

 

  function startGame() {

    setGameState("waiting");
    setMessage("Várj a zöld színre...");

    const delay = Math.random() * 4000 + 1000; 
    const id = setTimeout(() => {
      setGameState("ready");
      setMessage("KATTINTS MOST!");
      setStartTime(Date.now());
    }, delay);

    setTimeoutId(id);
  }
  function handleClick() {

    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("idle");
      setMessage("Túl korán kattintottál! Próbáld újra.");
    }

 

    if (gameState === "ready") {
      const reaction = Date.now() - startTime;
      setGameState("result");
      setMessage(`Reakcióidő: ${reaction} ms`);
    }

  }

  function reset() {
    setGameState("idle");
    setMessage("Kattints a START gombra!");
  }

  return (
    <div id="backg"
      onClick={handleClick}
      style={{
        background:
          gameState === "ready" ? "#4CAF50" : "white",
      }}

    >

      <h1>Reflex Teszt</h1>
      <h2>{message}</h2>
      {gameState === "idle" && (
        <button id="start" onClick={startGame}>
          START
        </button>
      )}
      {gameState === "result" && (
        <button id="reset" onClick={reset}>
          ÚJRA
        </button>
      )}
    </div>
  );
}

export default App