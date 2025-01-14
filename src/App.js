import React, { useState, useEffect } from 'react';
import './App.css';
// import MyName from './Components/Myame';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function App() {
  const [balls, setBalls] = useState([]);

  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  

  const generateBalls = () => {
    const newBalls = [];
    for (let i = 0; i < 10; i++) {
      newBalls.push({
        id: i,
        size: randomNumber(30, 100),
        left: randomNumber(0, window.innerWidth - 100), 
        top: randomNumber(0, window.innerHeight - 100),
        speedX: randomNumber(1, 5),
        speedY: randomNumber(1, 5),
        color: getRandomColor(),
      });
    }
    setBalls(newBalls);
  };

  useEffect(() => {
    generateBalls();

    const interval = setInterval(() => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => ({
          ...ball,
          left: ball.left + ball.speedX > window.innerWidth
            ? -ball.size
            : ball.left + ball.speedX < -ball.size
            ? window.innerWidth
            : ball.left + ball.speedX,
          
          top: ball.top + ball.speedY > window.innerHeight
            ? -ball.size
            : ball.top + ball.speedY < -ball.size
            ? window.innerHeight
            : ball.top + ball.speedY,
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="ball"
          style={{
            width: ball.size + 'px',
            height: ball.size + 'px',
            left: ball.left + 'px',
            top: ball.top + 'px',
            backgroundColor: ball.color,
          }}
        ></div>
      ))}
      {/* <MyName /> */}
    </div>
  );
}

export default App;
