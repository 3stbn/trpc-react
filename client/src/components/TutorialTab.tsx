import { Tutorial, tutorialStatus } from "../../../lib";
import { trpc } from "../utils/trpc";
import { TutorialCard } from "./TutorialCard";

const NUMBER_OF_COLUMNS = 2;

interface TutorialTabProps {
  tab: tutorialStatus;
}

export function TutorialTab({ tab }: TutorialTabProps) {
  const { data } = trpc.tutorial.getByStatus.useQuery({ status: tab });

  function chunkTutorials(data: Tutorial[], chunkSize: number) {
    const chunks = [];
    let i = 0;
    while (i < data.length) {
      chunks.push(data.slice(i, (i += chunkSize)));
    }
    return chunks;
  }

  if (!data) {
    return null;
  }
  return (
    <>
      {chunkTutorials(data, NUMBER_OF_COLUMNS).map((row, index) => (
        <div key={index} className="columns">
          {row.map((tutorial) => (
            <div className="column">
              <TutorialCard tutorial={tutorial} />
            </div>
          ))}
          {row.length < NUMBER_OF_COLUMNS &&
            Array(NUMBER_OF_COLUMNS - row.length)
              .fill(null)
              .map((_, index) => <div className="column" key={index} />)}
        </div>
      ))}
    </>
  );
}
