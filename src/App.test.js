import { render, screen, within } from "@testing-library/react";
import App from "./App";
import { links, projects, sections, skillGroups } from "./data/portfolio";

test("renders identity, navigation and every project", () => {
  render(<App />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Ashutosh Gaikwad");

  const nav = screen.getByRole("navigation", { name: "Primary" });
  sections.forEach((s) => {
    const link = within(nav).getByRole("link", { name: s.label });
    expect(link).toHaveAttribute("href", `#${s.id}`);
    expect(document.getElementById(s.id)).not.toBeNull();
  });

  projects.forEach((p) => {
    expect(screen.getByRole("heading", { name: p.title })).toBeInTheDocument();
  });
});

test("external links open safely and point at real profiles", () => {
  render(<App />);
  const external = screen.getAllByRole("link").filter((a) => a.target === "_blank");
  expect(external.length).toBeGreaterThan(0);
  external.forEach((a) => expect(a).toHaveAttribute("rel", "noopener noreferrer"));

  const hrefs = external.map((a) => a.getAttribute("href"));
  expect(hrefs).toContain(links.github);
  expect(hrefs).toContain(links.linkedin);
});

test("skills section is the logo marquee, with every skill named", () => {
  render(<App />);
  const skills = document.getElementById("skills");
  const names = skillGroups.flatMap((g) => g.items);

  // The marquee lives only in #skills, and each logo shows its name on hover.
  const tiles = [...document.querySelectorAll(".logo-tile")];
  expect(tiles.length).toBeGreaterThan(0);
  tiles.forEach((t) => {
    expect(skills).toContainElement(t);
    expect(names).toContain(t.getAttribute("title"));
  });

  // The marquee is decorative, so screen readers get the names as a list.
  names.forEach((n) => expect(within(skills).getByText(n)).toBeInTheDocument());
});
