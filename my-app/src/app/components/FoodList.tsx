"use client";
import React, { FormEventHandler, useState } from "react";
import { FoodLists } from "../../../types/foods";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { editFood, deleteFood } from "../../../api";

interface FoodListProps {
  foods: FoodLists[];
}

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  const [modelOpenEdit, setModelOpenEdit] = useState<boolean>(false);
  const [modelOpenDelete, setModelOpenDelete] = useState<boolean>(false);
  const [currentFoodIndex, setCurrentFoodIndex] = useState<number | null>(null);
  const [foodNameEdit, setFoodNameEdit] = useState<string>("");
  const [foodTypeEdit, setFoodTypeEdit] = useState<string>("");
  const [foodDescriptionEdit, setFoodDescriptionEdit] = useState<string>("");

  const Router = useRouter();

  const openModalEdit = (index: number) => {
    setCurrentFoodIndex(index);
    setFoodNameEdit(foods[index].name);
    setFoodTypeEdit(foods[index].type);
    setFoodDescriptionEdit(foods[index].description);
    setModelOpenEdit(true);
  };

  const closeModalEdit = () => {
    setModelOpenEdit(false);
    setCurrentFoodIndex(null);
  };

  const openModalDelete = (index: number) => {
    setCurrentFoodIndex(index);
    setModelOpenDelete(true);
  };

  const closeModalDelete = () => {
    setModelOpenDelete(false);
    setCurrentFoodIndex(null);
  };

  const handleSubmitFoodEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (currentFoodIndex !== null) {
      const updatedFood = {
        id: foods[currentFoodIndex].id,
        name: foodNameEdit,
        type: foodTypeEdit,
        description: foodDescriptionEdit,
      };

      await editFood(updatedFood);

      // Refresh the page to show updated data
      Router.refresh();
      closeModalEdit();
    }
  };

  const handleDeleteFood = async () => {
    if (currentFoodIndex !== null) {
      await deleteFood(foods[currentFoodIndex].id);

      // Refresh the page to show updated data
      Router.refresh();
      closeModalDelete();
    }
  };

  return (
    <div className="pt-3 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 shadow-inner">
      {foods.map((food, index) => (
        <div key={index} className="card w-72 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 shadow-xl">
          <div className="card-body ">
            <div className="badge badge-secondary">NEW</div>
            <h2 className="card-title text-yellow-50 font-bold text-[26px] line-clamp-1 object-cover object-center">
              {food.name}
              
            </h2>
            <p className="text-white font-semibold text-[14px] line-clamp-2">{food.type}</p>
            <p className="text-white font-normal text-[11px] line-clamp-2">{food.description}</p>
            <div className="card-actions justify-end ml-2">
              <div
                className="badge badge-outline cursor-pointer"
                onClick={() => openModalEdit(index)}
              >
                <FaEdit size={25} className=" text-green-800" />
              </div>
              <div
                className="badge badge-outline cursor-pointer"
                onClick={() => openModalDelete(index)}
              >
                <MdDelete size={25} className="text-red-700" />
              </div>
            </div>
          </div>
        </div>
      ))}
      {modelOpenEdit && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleSubmitFoodEdit}>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModalEdit}
              >
                ✕
              </button>
              <div>
                <h3 className="font-bold text-lg mb-4">Edit Food</h3>
                <input
                  value={foodNameEdit}
                  onChange={(e) => setFoodNameEdit(e.target.value)}
                  type="text"
                  placeholder="Food Name"
                  className="input input-bordered w-full max-w-xs mb-3"
                />
                <input
                  value={foodTypeEdit}
                  onChange={(e) => setFoodTypeEdit(e.target.value)}
                  type="text"
                  placeholder="Food Type"
                  className="input input-bordered w-full max-w-xs mb-3"
                />
                <input
                  value={foodDescriptionEdit}
                  onChange={(e) => setFoodDescriptionEdit(e.target.value)}
                  type="text"
                  placeholder="Food Description"
                  className="input input-bordered w-full max-w-xs mb-3"
                />
                <br />
                <button type="submit" className="btn btn-primary mb-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {modelOpenDelete && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Are you sure you want to delete this food?
            </h3>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={closeModalDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteFood}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
