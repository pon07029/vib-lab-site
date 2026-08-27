import type { HeroCarouselItem } from "../components/ui/hero-carousel";

const galleryAccents = ["#7c61ff", "#c76b3b", "#2f8c93", "#b04039", "#d08a35", "#536ccf"];

function galleryItem(id: string, title: string, image: string, meta: string[], index: number): HeroCarouselItem {
  return {
  id,
  title,
  image,
  credit: "VIB LAB / FIELD NOTES.",
  meta,
  accent: galleryAccents[index % galleryAccents.length],
  };
}

const conference = [
  galleryItem("2023-kosmi-spring", "2023\nKOSMI Spring", "/gallery/conference/2023_kosmi_spring.jpg", ["CONFERENCE", "KOSMI", "2023"], 0),
  galleryItem("2023-kosmi-fall", "2023\nKOSMI Fall", "/gallery/conference/2023_kosmi_fall.jpg", ["CONFERENCE", "KOSMI", "2023"], 1),
  galleryItem("2026-kosmi-spring-01", "2026\nKOSMI Spring 01", "/gallery/conference/2026_kosmi_spring_1.jpg", ["CONFERENCE", "KOSMI", "2026"], 2),
  galleryItem("2026-kosmi-spring-02", "2026\nKOSMI Spring 02", "/gallery/conference/2026_kosmi_spring_2.jpg", ["CONFERENCE", "KOSMI", "2026"], 3),
  galleryItem("2026-kosmi-spring-03", "2026\nKOSMI Spring 03", "/gallery/conference/2026_kosmi_spring_3.jpg", ["CONFERENCE", "KOSMI", "2026"], 4),
  ...Array.from({ length: 8 }, (_, index) => galleryItem(
    `2026-veterinary-academy-${String(index + 1).padStart(2, "0")}`,
    `2026\nVeterinary Academy ${String(index + 1).padStart(2, "0")}`,
    `/gallery/conference/2026_vet_academy_${index + 1}.jpg`,
    ["CONFERENCE", "VETERINARY ACADEMY", "2026"],
    index + 5,
  )),
];

export const galleryItems: HeroCarouselItem[] = [
  ...conference,
  galleryItem("2026-teachers-day", "2026\nTeachers' Day", "/gallery/daily/2026_teachers_day.jpg", ["DAILY LIFE", "TEACHERS' DAY", "2026"], 13),
  galleryItem("2026-spring-festival", "2026\nSpring Festival", "/gallery/daily/2026_spring_festival.jpg", ["DAILY LIFE", "SPRING FESTIVAL", "2026"], 14),
];
