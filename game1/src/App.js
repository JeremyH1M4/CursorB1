import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function Space() {
  const [count, setCount] = useState(0);
  const [add, setAdd] = useState(1);
  const [upgradeCost1, setUpgradeCost1] = useState(10);
  const [upgradeCost2, setUpgradeCost2] = useState(100);
  const [autoActive, setAutoActive] = useState(false);
  const [upgradeCost3, setUpgradeCost3] = useState(1000);
  const multiplierUpgrade1 = 0.6;
  const autoRef = useRef(null);
  const Automatic1 = add;

  const Upgrade1 = () => {
    if (count < upgradeCost1) {
      alert('Not enough points to upgrade!');
      return;
    }
    setCount(prev => prev - upgradeCost1);
    setAdd(prev => prev + 1);
    setUpgradeCost1(prev => Math.floor(prev * (1 + multiplierUpgrade1)));
  };

  const Upgrade2 = () => {
    if (count < upgradeCost2) {
      alert('Not enough points to upgrade!');
      return;
    }
    if (autoActive) {
      alert('Auto-upgrade already active!');
      return;
    }


    setCount(prev => prev - upgradeCost2);
    setUpgradeCost2(prev => Math.floor(prev * (1 + multiplierUpgrade1)));
    setAutoActive(true);

    autoRef.current = setInterval(() => {
      setCount(prev => prev + Automatic1);
    }, 1000);
  };

  const Upgrade3 = () => {
    if (count < upgradeCost3) {
      alert('Not enough points to upgrade!');
      return;
    }
    setCount(prev => prev - upgradeCost3);
    setAdd(prev => prev + 10);
    setUpgradeCost3(prev => Math.floor(prev * (1 + multiplierUpgrade1)));
  };

  useEffect(() => {
    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!autoActive) return;
    if (autoRef.current) {
      clearInterval(autoRef.current);
    }
    autoRef.current = setInterval(() => {
      setCount(prev => prev + Automatic1);
    }, 1000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [add, autoActive]);



  return (
    <div className="App">
      <header className="App-header">
        <p>
          You clicked {count} times
        </p>
        <p>Points per click: {add}</p>
        <button className="App-button" onClick={() => setCount(prev => prev + add)}>
          Click me
        </button>
        <button className="App-button" onClick={Upgrade1}>
          Upgrade (cost: {upgradeCost1})
        </button>
        <button className="App-button" onClick={Upgrade2}>
          Upgrade (cost: {upgradeCost2})
        </button>
        <button className="App-button" onClick={Upgrade3}>
          Upgrade (cost: {upgradeCost3})
        </button>
      </header>
    </div>
  );
}

export default Space;