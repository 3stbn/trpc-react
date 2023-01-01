import { Tutorial, tutorialStatus } from "../../../lib/";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { VideoProgressSlider } from "./VideoProgressSlider";
import { VideoStatusSelector } from "./VideoStatusSelector";
import { useDebouncedCallback } from "use-debounce";
import { YoutubePreview } from "./YoutubePreview";

import { useAppContext } from "../context/AppContext";
interface TutorialCardProps {
  tutorial: Tutorial;
}
interface TutorialPatchPayload {
  id: number;
  status?: tutorialStatus;
  progress?: number;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  const { setSelectedTab } = useAppContext();
  const trpcContext = trpc.useContext();
  const patchMutation = trpc.tutorial.patch.useMutation({
    onSuccess: () => {
      trpcContext.tutorial.getByStatus.invalidate();
      setSelectedTab(updatedStatus);
    },
  });
  const deleteMutation = trpc.tutorial.delete.useMutation({
    onSuccess: () => {
      trpcContext.tutorial.getByStatus.invalidate();
    },
  });
  const debouncedMutation = useDebouncedCallback(
    (payload: TutorialPatchPayload) => patchMutation.mutate(payload),
    300
  );
  const [updatedStatus, setUpdatedStatus] = useState(tutorial.status);
  const [updatedProgress, setUpdatedProgress] = useState(tutorial.progress);

  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    if (updatedProgress !== tutorial.progress) {
      debouncedMutation({
        id: tutorial.id,
        progress: updatedProgress,
      });
    }
  }, [updatedProgress, tutorial, debouncedMutation]);

  useEffect(() => {
    if (updatedStatus) {
      debouncedMutation({
        id: tutorial.id,
        status: updatedStatus,
      });
    }
  }, [updatedStatus, tutorial, debouncedMutation]);

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
            status={updatedStatus}
            onChange={(status) => {
              setUpdatedStatus(status);
            }}
          />
          {tutorial.status === "inProgress" && videoDuration && (
            <VideoProgressSlider
              videoDuration={videoDuration}
              value={updatedProgress}
              onChange={(v) => setUpdatedProgress(v)}
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
