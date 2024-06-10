import Header from "./components/Header";

import { getAllfoods } from "../../api";
import AddFood from "./components/AddFood";
import FoodList from "./components/FoodList";

export default async function Home() {
  const foods = await getAllfoods();
  console.log(foods);
  return (
    <div>
      <Header/>
       <main className="mx-auto mt-4 ml-10 mr-10">
      
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Food List</h1>
        <AddFood/>
      </div>
      <FoodList foods={foods}/>
   </main>
    </div>
   
  );
}
