import { videoStatusOptions } from "../pages/Dashboard";
import { tutorialStatus } from "../../../lib";
interface VideoStatusSelectorProps {
  status: tutorialStatus;
  onChange: (status: tutorialStatus) => void;
}
export function VideoStatusSelector({
  status,
  onChange,
}: VideoStatusSelectorProps) {
  function isChecked(currStatus: tutorialStatus) {
    return status === currStatus;
  }
  return (
    <div className="control mt-5">
      {videoStatusOptions.map((option, idx) => (
        <label className="radio" key={idx}>
          <input
            type="radio"
            name="answer"
            className="mr-2"
            value={status}
            checked={isChecked(option.value)}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
