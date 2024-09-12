
export default function Iframe({html}:{html:string}){
  return (
    <iframe srcDoc={html} className="w-full min-h-48 max-h-[450px]" allowFullScreen/>
  )
}