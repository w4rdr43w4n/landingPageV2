import { service } from "@/lib/config/types";
import Img from "./Img";

export default function Item({
  image_link,
  service_description,
  service_name,
  price,
}: service) {
  return (
    <section className="flex flex-col items-center bg-slate-900 w-fit max-w-[170px] text-white p-2 rounded-md">
      <Img src={image_link} alt={service_name} width={150} />
      <p className="font-extrabold text-[18px] font-sans ">{service_name}</p>
      <p className="w-full font-sans p-1 text-wrap max-h-12 overflow-y-auto">
        {service_description}
      </p>
      <p className="font-extrabold text-[16px] font-sans text-green-700">
        {price}.00$
      </p>
    </section>
  );
}
