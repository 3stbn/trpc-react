import { useEffect, useMemo, useState } from "react";
import Youtube from "react-youtube";

interface YoutubePreviewProps {
  youtubeUrl: string;
  onVideoLoaded?: (event: VideoLoadedEvent) => void;
}
interface VideoLoadedEvent {
  title?: string;
  duration?: number;
}

export function YoutubePreview({
  youtubeUrl,
  onVideoLoaded,
}: YoutubePreviewProps) {
  const [childKey, setChildKey] = useState(1);
  useEffect(() => {
    setChildKey((prev) => prev + 1);
  }, [youtubeUrl]);
  const videoId = useMemo(() => {
    if (!youtubeUrl) {
      return null;
    }
    const segments = youtubeUrl.split("watch?v=");
    if (!segments[1]) {
      return null;
    }
    return segments[1].split("&")[0];
  }, [youtubeUrl]);

  if (!videoId) {
    return null;
  }

  return (
    <Youtube
      key={childKey}
      videoId={videoId}
      className="video-container"
      onReady={(e) => {
        const videoEvent = {
          title: (e.target.getVideoData && e.target.getVideoData().title) || "",
          duration: e.target.getDuration && e.target.getDuration(),
        } as VideoLoadedEvent;
        onVideoLoaded && onVideoLoaded(videoEvent);
      }}
      onError={() => {
        onVideoLoaded && onVideoLoaded({ title: "", duration: 0 });
      }}
    />
  );
}
