import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";

const Nav = ({ handleInputChange, query }) => {
  return (
    <nav className="flex justify-around items-center p-5 ml-8 z-[999]">
      <div className="nav-container">
        <input
          className="bg-gray-100 mr-5 rounded relative w-56 px-3 py-3 border-0 outline-0"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
      </div>
      <div className="profile-container">
        <a href="#">
          <FiHeart className="w-6 h-6 ml-8" />
        </a>
        <a href="">
          <AiOutlineShoppingCart className="w-6 h-6 ml-8" />
        </a>
        <a href="">
          <AiOutlineUserAdd className="w-6 h-6 ml-8" />
        </a>
      </div>
    </nav>
  );
};

export default Nav;