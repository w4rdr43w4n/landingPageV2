import Img from "./Img";

interface props {
  links: string[];
}
export default function ImgList({ links }: props) {
  return (
    <section className="grid grid-flow-col gap-2 py-2 w-48 overflow-x-auto">
      {links && links.map((link, index) => (
        <Img key={index} src={link} alt={"image" + index} width={50} />
      ))}
    </section>
  );
}
