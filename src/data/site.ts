// Central place for site-wide text + nav. Edit these freely.

export const site = {
  name: "Michelle Xiang",
  title: "Michelle Xiang",
  tagline: "Analogue & digital — photographs, art, and code.",
  description:
    "Michelle Xiang — photographer and technologist. A personal site split between an analogue (art) world and a digital (tech) world.",
  email: "michelle001.xiang@gmail.com",
};

export const nav = [
  { href: "/", label: "About me" },
  { href: "/photography/", label: "Photography" },
  { href: "/contact/", label: "Contact" },
];

// Wallpaper behind the About-me desktop. Any CSS background value works.
//   • a gradient (default below), or
//   • an image: set to  `url('/wallpaper.jpg')`  and drop wallpaper.jpg in public/
export const desktopWallpaper =
  "linear-gradient(150deg, #e4edef 0%, #e9efe9 55%, #eef0ee 100%)";

// Used on the Contact page. Replace hrefs with your real handles.
export const socials = [
  {
    label: "Email",
    href: "mailto:michelle001.xiang@gmail.com",
    text: "michelle001.xiang@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/michelle-xiang-160b38265/",
    text: "in/michelle-xiang",
  },
];
