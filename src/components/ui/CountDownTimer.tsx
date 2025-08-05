import React from "react";

type CountdownTimerProps = {
  secondsRemaining: number;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  secondsRemaining,
}) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 text-sm ">
      <span className="font-semibold  transition-all duration-300">
        Próxima actualización en:
      </span>
      <span className="font-bold text-crypto-yellow tabular-nums text-accent-foreground">
        {formattedTime}
      </span>
    </div>
  );
};
