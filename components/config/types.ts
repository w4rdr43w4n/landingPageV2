import { WebSpecType } from "@/lib/config/types";

export interface ImageData {
  image_name: string;
  image_size: string;
}
export const placeholders:WebSpecType = {
  logo_link: "https://logo.com",
  website_title: "Lightbulb Eclectronics Co.",
  hero_text: "Welcome To Our Company",
  explainer_video_link: "https://www.youtube.com/embed/",
  carousel:{
    main_text:"Welcome To My Website!",
    caption:"Feel Free To Navigate All Seciton!",
    images:[],
    duration:0
  },
  faqs:[{
    question: "What's Your Name?",
  answer:"I'm Mr.",
  }],
  services:[{
    service_name:"New Lamp",
    service_description:"A very good lamp",
    image_link:"https://imagelink",
    price:"50"
  }],
  reviews_count:5,
  paragraphs:[{
    title:"My paragraph",
    content:"My Text"
  }],
  contact_info:{
    facebook:"Myfacebook",
    instagram:"MyInstagram",
    email:"info@mycompany.com",
    phone:"+111 098 765 4321",
    company_name:"Mycompany",
    hours:"5AM-6PM"
  },
  website_theme:{
    main_color:"blackAndBlue",
    main_font:"Roboto",
    style_provider:"tailwind"
  }

};
