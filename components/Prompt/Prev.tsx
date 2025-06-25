
export default function Prev({html}:{html:string}){
  return (
    <iframe srcDoc={html} className="w-full min-h-64 max-h-80 rounded-lg outline outline-1 outline-indigo-950" allowFullScreen />
  )
}