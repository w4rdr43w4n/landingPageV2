import {
  WebSpec,
  carousel as Caro,
  paragraph,
  service,
  FAQ,
  contact_info as Contact,
  theme,
  avStylers,
} from "./config/types";

const logo_link =
  "https://i.pinimg.com/474x/60/61/fc/6061fcb10167f31cd5d572c286c96c86.jpg";

const website_title = "My portfolio";

const carousel: Caro = {
  main_text: "HI I'm Ward",
  caption: "Welcome To My Portfolio Page!",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9XcFB1_i5HPBkdzPJXdfGpzRsjfmrESudQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhgllziZWjBXkAItMQn26U_z0h9lYjmSS7XqvXTPM_Bouf-7B_ppWUpGLsEF_YKYtoais&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE_JU3UkJjOKVUCuN92YEzlU-5Rg8ps35zE5w9eQrTSVPvfD72wqmY3Npa0zloONAyomM&usqp=CAU",
  ],
  duration: 5,
};

export const paragraphs: paragraph[] = [
  {
    title: "My Acheivements",
    content:
      "There are alot of achivements and successes in my life that much I can not type them here",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQXxBP-uJ9G3KpSS-Yk9qHpd-wF7H9UqqWMA&s",
    title: "My Skills",
    content: "I'm A pianist as you see",
  },
  {
    title: "Quote",
    content: "Nothing cure like music -- Bach",
  },
];
const hero_text = "Contact Me To Know More, See Contact Section";
const explainer_video_link = "https://www.youtube.com/embed/LqoV4ZW7xTA";
const services: service[] = [
  {
    service_name: "Piano Lesson",
    image_link:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2lCNXWuup-Z6YiAqg8sbPKKk997e9UenLA&s",
    service_description:
      "Leverage your piano playing skills and benefit from my experience on the platform",
    price: "125$/hour",
  },
];
const reviews_count = 20;

const faqs: FAQ[] = [
  {
    question: "Where Have You Learn Piano?",
    answer: "That's Nothing Of Your Business",
  },
];
const contact_info: Contact = {
  facebook: "myfacebook",
  instagram: "",
  email: "wardrawan535@gmail.com",
  phone: "",
  company_name: "",
  hours: "",
};

const website_theme: theme = {
  main_color: {
    primary: "#FFFFFF",
    secondary: "#000000",
  },
  main_font: "Roboto",
  style_provider: avStylers.Tailwindcss,
};

export const portfolio = new WebSpec({
  logo_link,
  website_title,
  carousel,
  paragraphs,
  hero_text,
  explainer_video_link,
  services,
  reviews_count,
  faqs,
  contact_info,
  website_theme}
);
