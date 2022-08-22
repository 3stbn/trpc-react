import { useMemo } from "react";

interface VideoProgressSliderProps {
  onChange: (value: number) => void;
  value: number;
  videoDuration: number;
}

export function VideoProgressSlider({
  value,
  onChange,
  videoDuration,
}: VideoProgressSliderProps) {
  const secondsProgress = useMemo(
    () => Math.floor((videoDuration * value) / 100),
    [videoDuration, value]
  );
  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    const hoursString = hours > 0 ? `${hours}:` : "";
    const minutesString = minutes >= 10 ? `${minutes}` : `0${minutes}`;
    const secondsString =
      secondsLeft >= 10 ? `${secondsLeft}` : `0${secondsLeft}`;
    return `${hoursString}${minutesString}:${secondsString}`;
  }
  return (
    <div className="field">
      <input
        className="slider primary is-fullwidth"
        step={0.5}
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        type="range"
      />
      <span>
        {formatTime(secondsProgress)} / {formatTime(videoDuration)}
      </span>
    </div>
  );
}
