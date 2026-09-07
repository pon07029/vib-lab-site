import { HeroCarousel } from "../../components/ui/hero-carousel";
import { ViewportSection } from "../../components/viewport-section";
import { galleryItems } from "../../content/gallery";

export default function NoticePage() {
  return <>
    <ViewportSection chapter="Gallery" tone="ink" className="gallery-section" aria-labelledby="gallery-heading">
      <h1 id="gallery-heading" className="sr-only">Gallery</h1>
      <HeroCarousel items={galleryItems} defaultIndex={0} brand="VIB / GALLERY" className="gallery-hero" />
    </ViewportSection>
  </>;
}
