import Category from "./category";
import Price from "./price";
import Colours from "./colour";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="fixed h-full flex flex-col items-center z-[3] w-1/6 border-r-2">
        <div className="mb-16">
          <h1 className="mt-5">🛒</h1>
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <Colours handleChange={handleChange} />
      </section>
    </>
  );
};
export default Sidebar;