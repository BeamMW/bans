import React, { useState, useEffect } from 'react';
import { TransactionProgressDonutProps } from './types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

const Donut = React.memo(
    CircularProgressbarWithChildren,
    ({ value: prev }, { value: next }) => prev === next
);

const strokeWidth = 10;

const circularProgressbarStyle = {
    strokeLinecap: "butt",
    pathColor: "white",
    trailColor: "rgba(255, 255, 255, 0.33)",
    strokeWidth: "50"
  };

const slowProgress = {
    strokeWidth,
    styles: buildStyles({
        ...circularProgressbarStyle,
        pathTransitionDuration: 30
    })
};

const fastProgress = {
    strokeWidth,
    styles: buildStyles({
        ...circularProgressbarStyle,
        pathTransitionDuration: 0.75
    })
};

export const TransactionProgressDonut: React.FC<TransactionProgressDonutProps> = ({ state }) => {
    const [value, setValue] = useState(0);
    const maxValue = 1;

    useEffect(() => {
        if (state === "completed") {
            setTimeout(() => setValue(maxValue), 40);
        } else {
            setTimeout(() => setValue(maxValue * 0.67), 20);
        }

        return () => {
            state = false;
            setValue(0);
        }
    }, [state]);

    return state === "completed" ? (
        <Donut {...{ value, maxValue, ...fastProgress }}>
            {/* ✔️ */}
        </Donut>
    ) : state === "failed" || state === "cancelled" ? (
        <Donut value={0} {...{ maxValue, ...fastProgress }}>
            {/* ✖️ */}
        </Donut>
    ) : (
        <Donut {...{ value, maxValue, ...slowProgress }}>
            {/* ⚙️ */}
        </Donut>
    );
};