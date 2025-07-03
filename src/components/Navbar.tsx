import { useContext } from "react";
import { NodeContext } from "../context/NodeContext";

const Navbar = () => {
  const {  toggleBtnClick, setToggleBtnClick } = useContext(NodeContext);

  const handleSaveBtnClick = () => {
    setToggleBtnClick(!toggleBtnClick);
  };

  return (
    <div className="w-full min-h-[80px] px-20 py-3 bg-gray-100 flex justify-end items-center">
      <button
        onClick={handleSaveBtnClick}
       className={`border rounded-lg px-12 py-2 transition-all duration-200 text-base border-blue-800 text-blue-800 hover:bg-blue-50 active:bg-blue-100 active:border-blue-900 focus:outline-none focus:ring-2 `}
      >
        Save changes
      </button>
    </div>
  );
};

export default Navbar;
