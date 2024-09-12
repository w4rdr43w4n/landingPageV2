import { service } from "@/lib/config/types";
import Item from "./Item";

export default function ItemsList({Items}:{Items: service[]}) {
  return (
    <section className="flex max-w-48 overflow-x-auto gap-2 p-2">
      {Items.map((item, index) => (
        <Item
          key={index}
          image_link={item.image_link}
          service_description={item.service_description}
          service_name={item.service_name}
          price={item.price}
        />
      ))}
    </section>
  );
}
