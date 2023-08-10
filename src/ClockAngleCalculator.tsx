import React, { useState } from 'react';

function getClockAngle(hh_mm: string): number {
  const [hour, minute] = hh_mm.split(':').map(Number);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error("Invalid input time format");
  }

  const angle = Math.abs(30 * hour - (11 / 2) * minute);
  const shorterAngle = Math.min(angle, 360 - angle);

  return shorterAngle;
}

const ClockAngleCalculator: React.FC = () => {
  const [timeInput, setTimeInput] = useState('');
  const [angle, setAngle] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(event.target.value);
  };

  const handleCalculate = () => {
    try {
      const calculatedAngle = getClockAngle(timeInput);
      setAngle(calculatedAngle);
    } catch (error:any) {
      console.error(error.message);
      setAngle(null);
    }
  };

  return (
    <div>
      <h2>Clock Angle Calculator</h2>
      <div>
        <label htmlFor="timeInput">Enter time Ex. hh:mm </label>
        <input
          type="text"
          id="timeInput"
          value={timeInput}
          onChange={handleInputChange}
        />
        <button onClick={handleCalculate}>Calculate Angle</button>
      </div>
      {angle !== null && (
        <p>The shorter angle at {timeInput} is {angle} degrees.</p>
      )}
    </div>
  );
};

export default ClockAngleCalculator;
