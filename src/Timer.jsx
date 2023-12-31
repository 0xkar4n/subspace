import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  const [countdown, setCountdown] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  async function fetchCurrentBlockNumber() {
    // Fetch the current block number from the API
    const response = await fetch('https://rpc-0.gemini-3f.subspace.network/ws', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'chain_getHeader',
        id: 1,
      }),
    });
    const data = await response.json();
    const currentBlockNumber = parseInt(data.result.number, 16);

    return currentBlockNumber;
  }

  async function updateCountdown() {
    // Replace with the actual target date and time (in UTC)
    const targetDate = new Date('2023-09-06T17:00:00Z').getTime();

    // Fetch the current block number
    const currentBlockNumber = await fetchCurrentBlockNumber();

    // Calculate remaining time in seconds
    const blockProductionRateInSeconds = 20; // Example: 20 seconds per block
    const remainingTimeInSeconds = (targetDate - Date.now()) / 1000;

    if (remainingTimeInSeconds <= 0) {
      // The target date and time have passed
      setCountdown({
        hours: '00',
        minutes: '00',
        seconds: '00',
      });
    } else {
      const estimatedTargetBlock = currentBlockNumber + Math.floor(remainingTimeInSeconds / blockProductionRateInSeconds);

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(remainingTimeInSeconds / 3600);
      const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
      const seconds = Math.floor(remainingTimeInSeconds % 60);

      // Update the countdown timer
      setCountdown({
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
    }
  }

  // Update the countdown timer immediately on component mount
  useEffect(() => {
    updateCountdown();
  }, []);

  // Update the countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      updateCountdown();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="m-12 p-12  backdrop-blur-md bg-gray-100/10 text-white border border-white rounded-lg shadow-lg">
      
      <h1 className="text-3xl m-8 pb-4 flex justify-center ">Subspace Incentives Testnet 3F Countdown</h1>
      <div className="flex gap-32 m-4 justify-center">
        <div className="col-span-2 flex items-center gap-2 text-center">
          <div className="text-5xl font-bold">{countdown.hours}</div>
          <div className="text-lg">Hours</div>
        </div>
        <div className="col-span-2 flex gap-2 items-center text-center">
          <div className="text-5xl font-bold">{countdown.minutes}</div>
          <div className="text-lg">Minutes</div>
        </div>
        <div className="col-span-2 flex  gap-2 items-center text-center">
          <div className="text-5xl font-bold">{countdown.seconds}</div>
          <div className="text-lg">Seconds</div>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
