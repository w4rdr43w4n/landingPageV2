import { retrier } from "../utils";
import { generatePage } from "../webGen/claude_spec";

export interface ClaudeHTMLResp {
  success: Boolean;
  source_code: string;
  errMsg?: string;
}
export interface fixedResp {
  type: string;
  text: string;
}
export interface carousel {
  images: string[];
  main_text: string;
  caption: string;
  duration: number | 5000;
}

export interface paragraph {
  title: string;
  content: string;
  image?: string;
}

export interface service {
  image_link: string;
  service_name: string | "";
  service_description: string | "";
  price: string | "0.00$";
}

export interface FAQ {
  question: string;
  answer: string;
}
export interface contact_info {
  company_name: string;
  location?: string;
  phone?: number | string;
  email: string;
  instagram?: string;
  facebook?: string;
  hours: string;
}

export type colorThemeName =
  | "navyAndWhite"
  | "slateAndTurquoise"
  | "midnightAndCoral"
  | "forestAndBeige"
  | "charcoalAndMint"
  | "royalAndYellow"
  | "purpleAndPink"
  | "oliveAndYellow"
  | "blackAndBlue"
  | "orangeAndGray"
  | "crimsonAndGray"
  | "tealAndIvory";

export interface ThemeColors {
  primary: string;
  secondary: string;
}
export enum avFonts {
  Roboto = "Roboto",
  OpenSans = "Open Sans",
  Lato = "Lato",
  Montserrat = "Montserrat",
  Poppins = "Poppins",
  PlayfairDisplay = "Playfair Display",
  Merriweather = "Merriweather",
}

export enum avStylers {
  Tailwindcss = "Tailwindcss",
  PlainCSS = "Plain CSS",
}

export const themes: Record<colorThemeName, ThemeColors> = {
  navyAndWhite: {
    primary: "#1D3557",
    secondary: "#F1FAEE",
  },
  slateAndTurquoise: {
    primary: "#2A2A2A",
    secondary: "#00B4D8",
  },
  midnightAndCoral: {
    primary: "#2C3E50",
    secondary: "#FF6F61",
  },
  forestAndBeige: {
    primary: "#2A9D8F",
    secondary: "#E9C46A",
  },
  charcoalAndMint: {
    primary: "#333333",
    secondary: "#2ECC71",
  },
  royalAndYellow: {
    primary: "#00509E",
    secondary: "#FFC300",
  },
  purpleAndPink: {
    primary: "#4B0082",
    secondary: "#FFC0CB",
  },
  oliveAndYellow: {
    primary: "#3D9970",
    secondary: "#FFEB99",
  },
  blackAndBlue: {
    primary: "#0A0A0A",
    secondary: "#0074D9",
  },
  orangeAndGray: {
    primary: "#E07A5F",
    secondary: "#6C757D",
  },
  crimsonAndGray: {
    primary: "#DC143C",
    secondary: "#D3D3D3",
  },
  tealAndIvory: {
    primary: "#008080",
    secondary: "#FFFFF0",
  },
};

export interface theme {
  main_color: ThemeColors;
  main_font: string;
  style_provider: avStylers;
}
export const categories = [
  "Business",
  "Portfolio",
  "Blog",
  "Learning",
  "Entertainment",
  "Medical",
] as const;

export type Category = (typeof categories)[number];

export interface WebSpecType {
  // Logo
  logo_link: string;
  // Type
  website_type: Category | null;
  // Title
  website_title: string;
  // Carousel
  carousel: carousel | null;
  // Hero Section
  hero_text: string;
  // Custom Paragraphs
  paragraphs: paragraph[];
  // Explainer Video
  explainer_video_link: string;
  // Services / Products
  services: service[] | null;
  // Reviews Count
  reviews_count: number;
  // FAQ
  faqs: FAQ[];
  // Contact Info
  contact_info: contact_info | null;
  // Theme
  website_theme: theme | null;
}

export class WebSpec {
  // Website Config Data
  private data: WebSpecType;

  constructor(data: Partial<WebSpecType> = {}) {
    this.data = {
      logo_link: data.logo_link || "",
      website_title: data.website_title || "",
      explainer_video_link: data.explainer_video_link || "",
      hero_text: data.hero_text || "",
      carousel: data.carousel || null,
      paragraphs: data.paragraphs || [],
      services: data.services || [],
      faqs: data.faqs || [],
      contact_info: data.contact_info || null,
      website_theme: data.website_theme || null,
      reviews_count: data.reviews_count || 0,
      website_type: data.website_type || null,
    };
  }
  public setData(newData: Partial<WebSpecType>) {
    this.data = {
      ...this.data,
      ...newData,
    };
  }
  public getData(): WebSpecType {
    return this.data;
  }
  get prompt(): string {
    return `You are tasked with creating a modern and elegant one-page website using HTML and CSS or Tailwind CSS. The website should include various sections as specified. Your goal is to generate only the code for this website, without any additional text or explanations.\n\nBegin by creating the basic HTML structure. Then, add each section of the website in the order they are listed below. Use the provided variables to populate the content of each section. Remember to style the website according to the specified theme configuration.\n\nHere's the structure you should follow:\n\n1. Start with the HTML doctype and open the <html> tag.\n2. In the <head> section, include the necessary meta tags, title , and link to the stylesheet.\n3. Open the <body> tag and create a container for the entire page content.\n4. Create the header section with the website title (or logo from ${
      this.data.logo_link
    } if applicable) and navigation tabs.\n5. Add the carousel section with images , time elapsed indicator and a fixed title with some text below it.\n6. Add a hero section with a \"Get Started\" Button in the middle with some text below it.\n7. Include the paragraph section with a title and content.\n8. Create the products/services section with names, preview images, and captions.\n9. Add an explainer video section which contain a video from a provided link, with a title above it, video dimensions should be 640x360.\n9. Add Website Services Review section with star rating, reviewer name and his/her comment, create reviews by reviews count variable.\n10. Add the FAQ section with questions and answers.\n11. Include a feedback form.\n12. Add an online products order form.\n13. Create the footer with contact information, including telephone number, company location (if applicable), and social media links.\n14. Close the container, body, and html tags.\n15. If using CSS, add a <style> section in the head with all the necessary styles. If using Tailwind CSS, make sure to include the appropriate classes in your HTML elements.\n16. Make sure you adapt the general appearance of the website to the provided website type.\n\nUse the following variables in your code:\n\n<website_type>\n${
      this.data.website_type
    }\n</website_type\n\n<website_title>\n${
      this.data.website_title
    }\n</website_title>\n\n\n<carousel_images>\n${JSON.stringify(
      this.data.carousel?.images
    )}\n</carousel_images>\n\n<carousel_title>\n${
      this.data.carousel?.main_text
    }\n</carousel_title>\n\n<carousel_caption>\n${
      this.data.carousel?.caption
    }\n</carousel_caption>\n\n\n<carousel_duration>\n${
      this.data.carousel?.duration
    } seconds \n</carousel_duration>\n\n<hero_section>\n${
      this.data.hero_text
    }\n</hero_section>\n\n\n<EXPLAINER_VIDEO>\n${
      this.data.explainer_video_link
    }\n</EXPLAINER_VIDEO>\n\n<products_services>\n${JSON.stringify(
      this.data.services
    )}\n</products_services>\n\n<reviews_count>\n${
      this.data.reviews_count
    }\n</reviews_count>\n\n<faq>\n${JSON.stringify(
      this.data.faqs
    )}\n</faq>\n\n<contact_info>\n${JSON.stringify(
      this.data.contact_info
    )}\n</contact_info>\n\n<main_color>\n${
      this.data.website_theme?.main_color
    }\n</main_color>\n\n<main_font>\n${
      this.data.website_theme?.main_font
    }\n</main_font>\n\n<style_provider>\n${
      this.data.website_theme?.style_provider
    }\n</style_provider>\n\nEnsure that your code is clean, well-structured, and follows best practices for HTML and CSS/Tailwind CSS. Make the design as modern and elegant as possible, utilizing the main color and font specified in the theme configuration.\n\nDo not include any explanations or additional text outside of these tags.\nMake the website simple but complete and include the whole details.\n\nThe tabs in navigation tab should take you to the different, sections of the page with their section id attribute, you can't create a tab for a non existing section ID.\n\nIn Paragraph section, leave both title and content empty and use \"{t*}\" as a placeholder for the title, \"{p*}\" as a placeholder for the content, remember to insert exactly ${
      this.data.paragraphs.length
    } of {{t*}\n{p*}} pairs.\n\nThe Header should be sticky.\nIf there's a link to a logo image provided, make sure it fits within the header.\nAlways identify website type from its title and adapt the template to it.\nGenerate carousel that switches slides automatically. The carousel should have smooth slide transitions, navigation buttons (previous and next), and a time-elapsed progress bar for each image. Ensure the carousel is responsive and works well on both desktop and mobile. Keep the structure clean and easy to customize.`;
  }
  get pharagraphs(): paragraph[] {
    return this.data.paragraphs;
  }
  public async generate() {
    const website = await retrier(
      generatePage,
      3,
      this.prompt,
      this.data.paragraphs
    );
    return website.success ? website.source_code : website.errMsg;
  }
}
