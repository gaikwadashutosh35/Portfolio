import { render, screen, within } from "@testing-library/react";
import App from "./App";
import { links, projects, sections } from "./data/portfolio";

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
