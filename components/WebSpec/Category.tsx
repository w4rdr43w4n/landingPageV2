import { categories, Category } from "@/lib/config/types";
import { useEffect, useState } from "react";

interface Props{
  setType:(value:any)=>void
}

export default function SelectCategory({setType}:Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Business");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory((prev) => {
      const update = e.target.value as Category;
      return update;
    });
  };
  useEffect(()=>{
    setType({website_type:selectedCategory}) 
  },[selectedCategory])
  return (
    <div className="w-full">
      <label
        htmlFor="category"
        className="block text-[0.85rem] font-extrabold text-slate-950"
      >
        Website Type
      </label>
      <select
        id="category"
        name="category"
        value={selectedCategory}
        onChange={handleSelectChange}
        className="p-2 bg-gray-800 w-full text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
