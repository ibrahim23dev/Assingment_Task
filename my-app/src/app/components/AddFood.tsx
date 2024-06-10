"use client";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import Model from "./model";
function AddFood() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <button onClick={openModal} className="btn btn-primary w-72">
        Add Food
        <FaPlusCircle size={20} className="ml-2"/>
      </button>
      <Model modelOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default AddFood;
