import React from "react"
import { useNavigate } from 'react-router-dom';
import { getAvatarName, getBgColor } from '../../utils';
import { useDispatch } from "react-redux";
import { updateTable } from '../../redux/slices/customerSlice';
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (name) => {
    if (status.toLowerCase() === "meşgul") return; // ✅ Meşgul olunca tıklanamaz
    dispatch(updateTable({ tableNo: name }));
    navigate("/menu");
  };

  return (
    <div
      onClick={() => handleClick(name)}
      className="w-[300px] hover:bg-[#2c2c2c] bg-[#1e1e2f] p-4 rounded-lg mb-4 cursor-pointer"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-white text-xl font-semibold">Masa 
          <FaLongArrowAltRight className="text-[#ababab] ml-2 inline"/> {name}</h1>
        <p
          className={`px-2 py-1 rounded-lg font-semibold
            ${status.toLowerCase() === "uygun" ? "bg-green-600 text-white" : ""}
            ${status.toLowerCase() === "meşgul" ? "bg-red-600 text-white" : ""}
          `}
        >
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center mt-5 mb-10">
        <h1
          className="text-white rounded-full p-5 text-xl"
          style={{ backgroundColor:initials ? getBgColor() : "#1f1f1f"}}
        >
          {getAvatarName(initials)|| "N/A"}
        </h1>
      </div>

      <p className="text-[#ababab] text-xs">
        Koltuklar: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
