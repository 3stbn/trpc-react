import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { YoutubePreview } from "./YoutubePreview";
import { videoStatusOptions } from "../pages/Dashboard";
import { trpc } from "../utils/trpc";
import { VideoStatusSelector } from "./VideoStatusSelector";
import { VideoProgressSlider } from "./VideoProgressSlider";

export function VideoModal() {
  const { setShowModal, setSelectedTab } = useAppContext();
  const trpcContext = trpc.useContext();
  const videoMutation = trpc.tutorial.create.useMutation({
    onSuccess: () => {
      setShowModal(false);
      trpcContext.tutorial.getByStatus.invalidate();
      setSelectedTab(tutorial.status);
    },
  });

  const [tutorial, setTutorial] = useState({
    title: "",
    youtubeUrl: "",
    status: videoStatusOptions[0].value,
  });

  const [videoDuration, setVideoDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  function closeModal() {
    setShowModal(false);
  }
  function canSubmit() {
    return tutorial.title.length > 0 && tutorial.youtubeUrl.length > 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    videoMutation.mutate({
      title: tutorial.title,
      youtubeUrl: tutorial.youtubeUrl,
      status: tutorial.status,
      progress: videoProgress,
    });
  }

  return (
    <div className="modal is-active is-clipped">
      <div className="modal-background" />
      <form className="modal-card" onSubmit={handleSubmit}>
        <header className="modal-card-head">
          <p className="modal-card-title">New Tutorial</p>
          <button className="delete" aria-label="close" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Youtube Url</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={tutorial.youtubeUrl}
                placeholder="https://www.youtube.com/"
                onChange={(e) =>
                  setTutorial({ ...tutorial, youtubeUrl: e.target.value })
                }
              />
            </div>
          </div>
          {tutorial.title && (
            <div className="field">
              <label className="label">Video Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={tutorial.title}
                  disabled
                />
              </div>
            </div>
          )}
          {tutorial.youtubeUrl && (
            <YoutubePreview
              youtubeUrl={tutorial.youtubeUrl}
              onVideoLoaded={(e) => {
                setTutorial({
                  ...tutorial,
                  title: e.title ?? "",
                });
                setVideoDuration(e.duration ?? 0);
              }}
            />
          )}

          <VideoStatusSelector
            status={tutorial.status}
            onChange={(status) => setTutorial({ ...tutorial, status })}
          />
          {tutorial.status === "inProgress" && videoDuration ? (
            <VideoProgressSlider
              value={videoProgress}
              onChange={(value) => setVideoProgress(value)}
              videoDuration={videoDuration}
            />
          ) : null}
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-primary"
            type="submit"
            disabled={!canSubmit()}
          >
            Save changes
          </button>
          <button className="button" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
}
