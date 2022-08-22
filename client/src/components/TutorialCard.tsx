import { Tutorial } from "local-shared";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { VideoProgressSlider } from "./VideoProgressSlider";
import { VideoStatusSelector } from "./VideoStatusSelector";
import { useDebouncedCallback } from "use-debounce";
import { YoutubePreview } from "./YoutubePreview";
import { tutorialStatus } from "local-shared";
import { useAppContext } from "../context/AppContext";
interface TutorialCardProps {
  tutorial: Tutorial;
}
interface TutorialPatchPayload {
  id: number;
  status: tutorialStatus;
  progress: number;
}
export function TutorialCard({ tutorial }: TutorialCardProps) {
  const { setSelectedTab } = useAppContext();
  const { invalidateQueries } = trpc.useContext();
  const patchMutation = trpc.useMutation("tutorial.patch", {
    onSuccess: () => {
      invalidateQueries(["tutorial.getByStatus"]);
      setSelectedTab(patchTutorial.status);
    },
  });
  const deleteMutation = trpc.useMutation("tutorial.delete", {
    onSuccess: () => {
      invalidateQueries(["tutorial.getByStatus"]);
    },
  });
  const debouncedMutation = useDebouncedCallback(
    (payload: TutorialPatchPayload) => {
      console.log("mutating");
      patchMutation.mutate(payload);
    },
    1000
  );
  const [patchTutorial, setPatchTutorial] = useState({
    status: tutorial.status,
    progress: tutorial.progress,
  });
  const [videoDuration, setVideoDuration] = useState(0);

  //   useEffect(() => {
  //     const { status, progress } = tutorial;
  //     if (
  //       JSON.stringify(patchTutorial) !== JSON.stringify({ status, progress })
  //     ) {
  //       patchMutation.mutate({
  //         id: tutorial.id,
  //         status: patchTutorial.status,
  //         progress: patchTutorial.progress,
  //       });
  //     }
  //   }, [patchTutorial, tutorial, patchMutation]);
  // when patchTutorial changes, debounce the mutation
  useEffect(() => {
    debouncedMutation({
      id: tutorial.id,
      status: patchTutorial.status,
      progress: patchTutorial.progress,
    });
  }, [patchTutorial, debouncedMutation, tutorial.id]);

  return (
    <div className="card">
      <div className="card-image">
        <YoutubePreview
          youtubeUrl={tutorial.youtubeUrl}
          onVideoLoaded={(e) => setVideoDuration(e.duration ?? 0)}
        />
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="subtitle is-6">{tutorial.title}</p>
          </div>
        </div>
        <div className="content">
          <VideoStatusSelector
            status={patchTutorial.status}
            onChange={(status) =>
              setPatchTutorial({ ...patchTutorial, status })
            }
          />
          {tutorial.status === "inProgress" && videoDuration && (
            <VideoProgressSlider
              videoDuration={videoDuration}
              value={tutorial.progress}
              onChange={(v) =>
                setPatchTutorial({ ...patchTutorial, progress: v })
              }
            />
          )}
          <button
            className="button is-danger"
            onClick={() => deleteMutation.mutate({ id: tutorial.id })}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
