import Image from "next/image";
import { photo } from "@/lib/photos";

/**
 * Serves a recovered photo through next/image (AVIF/WebP, responsive). With
 * `fill` the parent sets the box; otherwise intrinsic size from the manifest.
 * An unknown name renders a branded ember plate, never a grey box.
 */
export function Photo({
  name,
  alt,
  fill,
  sizes = "(max-width: 860px) 100vw, 50vw",
  priority,
  className,
  style,
}: {
  name: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const asset = photo(name);
  if (!asset) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{ position: fill ? "absolute" : "relative", inset: 0, aspectRatio: fill ? undefined : "4 / 3", background: "radial-gradient(60% 60% at 70% 30%, rgba(227,160,79,.35), transparent 70%), var(--night-2)", ...style }}
      />
    );
  }
  return fill ? (
    <Image src={asset.src} alt={alt} fill sizes={sizes} priority={priority} className={className} style={style} />
  ) : (
    <Image src={asset.src} alt={alt} width={asset.width} height={asset.height} sizes={sizes} priority={priority} className={className} style={style} />
  );
}
