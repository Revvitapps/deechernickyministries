import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { gallery } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("gallery");

export default function GalleryPage() {
  return (
    <>
      <PageIntro eyebrow="Gallery" title={<>Ministry <em>moments</em></>} lede="Shine On, prison outreach and the women who fill the room." />
      <section className="wrap" style={{ paddingBottom: 96 }}>
        <div className="masonry">
          {gallery.map((g) => (
            <figure key={g.name}><Photo name={g.name} alt={g.alt} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></figure>
          ))}
        </div>
      </section>
    </>
  );
}
