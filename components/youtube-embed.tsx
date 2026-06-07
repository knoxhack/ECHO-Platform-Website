import Image from "next/image";
import Link from "next/link";
import { ExternalLink, PlayCircle } from "lucide-react";

export function YouTubeEmbed({
  videoId,
  title,
  thumbnailUrl,
  youtubeUrl
}: {
  videoId?: string;
  title: string;
  thumbnailUrl?: string;
  youtubeUrl?: string;
}) {
  if (videoId) {
    return (
      <div className="cyber-panel overflow-hidden rounded-[6px] p-0">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (thumbnailUrl && youtubeUrl) {
    return (
      <Link
        href={youtubeUrl}
        className="cyber-panel relative block aspect-video overflow-hidden rounded-[6px]"
      >
        <Image src={thumbnailUrl} alt="" fill className="object-cover" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-[5px] border border-echo-amber/40 bg-[#05070a]/80 text-echo-amber backdrop-blur">
            <PlayCircle size={34} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div className="cyber-panel rounded-[6px] p-6">
      <p className="cyber-label">Video</p>
      <p className="mt-3 text-sm leading-6 text-echo-muted">
        This update does not have a public video embed.
      </p>
      {youtubeUrl ? (
        <Link href={youtubeUrl} className="cyber-button cyber-button-secondary mt-5">
          <ExternalLink size={16} />
          Open on YouTube
        </Link>
      ) : null}
    </div>
  );
}
