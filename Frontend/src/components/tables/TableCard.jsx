import React from "react"
import { useNavigate } from 'react-router-dom';
import { getBgColor } from '../../utils';
import {useDispatch} from "react-redux";
import { updateTable } from '../../redux/slices/customerSlice';

const TableCard = ({name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (name) => {
    if (status === "Rezerve") return;
    dispatch(updateTable({tableNo: name}))
    navigate("/menu");   // boşluk bırakma: `/menu`
  };

  return (
    <div 
      onClick={()=> handleClick(name)} 
      className="w-[300px] hover:bg-[#2c2c2c] bg-[#1e1e2f] p-4 rounded-lg mb-4 cursor-pointer"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-white text-xl font-semibold">{name}</h1>
        <p
          className={`${
            status === "Rezerve"
              ? "text-green-500 bg-[#2e4a40]"
              : "text-[#f6b100] bg-yellow-100"
          } px-2 py-1 rounded-lg`}
        >
          {status}
        </p>
      </div>

      <div className="flex items-center justify-between mt-5 mb-10">
        <h1 className="text-white rounded-full p-5 text-xl"  style={{ backgroundColor: getBgColor() }}> {initials}</h1>

      </div>

      <p className="text-[#ababab] text-xs">
        Koltuklar: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
