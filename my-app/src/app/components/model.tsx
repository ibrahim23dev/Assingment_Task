import React, { FormEventHandler, useState } from "react";
import { addFood } from "../../../api";
import { useRouter } from "next/navigation";
interface ModalProps {
  modelOpen: boolean;
  closeModal: () => void;
}
import { v4 as uuidv4 } from 'uuid';
const Modal: React.FC<ModalProps> = ({ modelOpen, closeModal }) => {
  const Router = useRouter();
  const [foodName, setFoodName] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("");
  const [foodDescription, setFoodDescription] = useState<string>("");

  const handleSubmitFood: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
                                await addFood({
      id: uuidv4(),
      name: foodName,
      type: foodType,
      description: foodDescription,
    });

    // Reset the form fields after submission
    setFoodName("");
    setFoodType("");
    setFoodDescription("");
    Router.refresh();
  };

  return (
    <div className={`modal ${modelOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <form onSubmit={handleSubmitFood}>
          {" "}
          {/* Moved onSubmit to the main form */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <div>
            <h3 className="font-bold text-lg mb-4">Add New Food</h3>
            <input
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              type="text"
              placeholder="Food Name"
              className="input input-bordered w-full max-w-xs mb-3" required
            />
            <input
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              type="text"
              placeholder="Food Type"
              className="input input-bordered w-full max-w-xs mb-3" required
            />
            <input
              value={foodDescription}
              onChange={(e) => setFoodDescription(e.target.value)}
              type="text"
              placeholder="Food Description"
              className="input input-bordered w-full max-w-xs mb-3" required
            />
            <br />
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
