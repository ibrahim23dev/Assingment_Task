import { json } from "stream/consumers";
import { FoodLists } from "./types/foods";

const baseUrl = "http://localhost:3001";

export const getAllfoods = async (): Promise<FoodLists[]> => {
  const res = await fetch(`${baseUrl}/foodee`, { cache: "no-store" });
  const foods = await res.json();
  return foods;
};

export const addFood = async (food: FoodLists): Promise<FoodLists> => {
  const res = await fetch(`${baseUrl}/foodee`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(food),
  });
  const newFood = await res.json();
  return newFood;
};


export const editFood = async (food: FoodLists): Promise<FoodLists> => {
  const res = await fetch(`${baseUrl}/foodee/${food.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(food),
  });
  const updateFood = await res.json();
  return updateFood;
};

export const deleteFood = async (id:string): Promise<void> => {
  const res = await fetch(`${baseUrl}/foodee/${id}`, {
    method: "DELETE",
})
};
