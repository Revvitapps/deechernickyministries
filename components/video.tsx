"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { Photo } from "./photo";

/** Click-to-load YouTube: no third-party requests until the visitor asks for the video. */
export function Video({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <div className="video">
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  return (
    <button type="button" className="video" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      <Photo name={poster} alt="" fill sizes="(max-width: 860px) 100vw, 60vw" />
      <span className="video-play"><span><Play size={18} aria-hidden="true" /> Watch</span></span>
      <span className="video-title">{title}</span>
    </button>
  );
}
