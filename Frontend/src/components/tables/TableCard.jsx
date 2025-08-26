// src/components/tables/TableCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ tableId, name, status, initials, seats }) => { // ✅ tableId eklendi
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isBusy = (typeof status === "string") && status.toLowerCase() === "meşgul";

  const handleClick = () => {
    if (isBusy) return;
    // ✅ Hem id (Mongo _id) hem görünen masa numarası
    dispatch(updateTable({ tableId, table: name }));
    navigate("/menu");
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[300px] bg-[#1e1e2f] p-4 rounded-lg mb-4 cursor-pointer hover:bg-[#2c2c2c] ${
        isBusy ? "opacity-80" : ""
      }`}
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-white text-xl font-semibold">
          Masa <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {name}
        </h1>
        <p className={`px-2 py-1 rounded-lg font-semibold ${!isBusy ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center mt-5 mb-10">
        <h1
          className="text-white rounded-full p-5 text-xl"
          style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>

      <p className="text-[#ababab] text-xs">
        Koltuklar: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
