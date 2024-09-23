import React, { useState } from "react";
import axios from "axios";

const initialPosition = { x: 2, y: 2 };
const initialIndex = 4;

export default function AppFunctional(props) {
  const [position, setPosition] = useState(initialPosition);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const move = (direction) => {
    let { x, y } = position;
    let newIndex = index;

    switch (direction) {
      case "up":
        if (y > 1) {
          setPosition({ x, y: y - 1 });
          newIndex -= 3;
          setSteps(steps + 1);
        } else {
          setMessage("You can't go up");
        }
        break;
      case "down":
        if (y < 3) {
          setPosition({ x, y: y + 1 });
          newIndex += 3;
          setSteps(steps + 1);
        } else {
          setMessage("You can't go down");
        }
        break;
      case "left":
        if (x > 1) {
          setPosition({ x: x - 1, y });
          newIndex -= 1;
          setSteps(steps + 1);
        } else {
          setMessage("You can't go left");
        }
        break;
      case "right":
        if (x < 3) {
          setPosition({ x: x + 1, y });
          newIndex += 1;
          setSteps(steps + 1);
        } else {
          setMessage("You can't go right");
        }
        break;
      default:
        break;
    }

    setIndex(newIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/result", {
        x: position.x,
        y: position.y,
        steps: steps,
        email: email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetGame = () => {
    setPosition(initialPosition);
    setIndex(initialIndex);
    setSteps(0);
    setEmail("");
    setMessage("");
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({position.x}, {position.y})
        </h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move("left")}>
          LEFT
        </button>
        <button id="up" onClick={() => move("up")}>
          UP
        </button>
        <button id="right" onClick={() => move("right")}>
          RIGHT
        </button>
        <button id="down" onClick={() => move("down")}>
          DOWN
        </button>
        <button id="reset" onClick={resetGame}>
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={handleEmailChange}
        />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
