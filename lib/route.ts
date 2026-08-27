import { site } from "../content/site";

export function activeRoute(pathname: string) {
  if (pathname === "/" || pathname.startsWith("/overview")) return "Overview";

  return (
    site.navigation.find(
      (item) => item.href !== "/" && pathname.startsWith(item.href),
    )?.label ?? "Overview"
  );
}
