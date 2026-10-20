// Stroke icon paths used across the homepage boards (the `I` and `J` maps in
// 01-home-mobile). 24px grid, drawn with a round stroke.
export const ICON = {
  linux: "M4 5h16v14H4zM7 9l3 3-3 3M12 15h5",
  bash: "M5 7l5 5-5 5M12 17h7",
  py: "M8 4c-2 0-3 1-3 3v2c0 1-1 2-2 2 1 0 2 1 2 2v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1 1 2 2 2-1 0-2 1-2 2v2c0 2-1 3-3 3",
  aws: "M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.2 4.5 4.5 0 0 0 7 18z",
  tf: "M3 5l6 3v7l-6-3zM10 9l6 3v7l-6-3zM17 5v7l4-2V3z",
  docker: "M3 12h18c0 4-3 7-9 7s-9-3-9-7zM6 9h3v3H6zM9 9h3v3H9zM12 9h3v3h-3zM9 6h3v3H9z",
  k8s: "M12 3l7 3.5v8L12 21l-7-6.5v-8zM12 8v8M8.5 10l7 4M15.5 10l-7 4",
  ans: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 16l3-8 4 8-5-3",
  git: "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9c0 4-6 3-12 6",
  siem: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  ws: "M2 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0",
  ai: "M9 4h6M12 4v3M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM10 13h.01M14 13h.01M9 17h6",
  pipe: "M12 12c-2-3-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1 6-4s4-4 6-4a4 4 0 0 1 0 8c-2 0-4-1-6-4z",
  radar: "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12l6-6",
  key: "M14.5 9.5a4 4 0 1 0-1.4 3L20 19.5M17 16.5l2-2",
  cert: "M5 4h14v11H5zM9 21l3-3 3 3M12 15v3M9 8h6M9 11h4",
  user: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6",
  net: "M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9zM7 10v2h10v-2M12 12v2",
  log: "M6 3h12v18H6zM9 8h6M9 12h6M9 16h4",
  inj: "M4 5h16v11H9l-5 4zM9 9l2 2-2 2M13 13h3",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M10 14l2 2 3-3",
  wave: "M3 12h4l3-7 4 14 3-7h4",
  tree: "M12 4v16M12 8l-6 4M12 8l6 4M12 14l-4 3M12 14l4 3",
} as const;

export type IconName = keyof typeof ICON;
