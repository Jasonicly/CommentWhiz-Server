import Button from "../ReportListComponents/button.js";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="ml-64 mb-5 mt-5 text-xl">Recommended</h2>
        <div className="flex ml-64">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Nike" title="Nike" />
          <Button onClickHandler={handleClick} value="Adidas" title="Adidas" />
          <Button onClickHandler={handleClick} value="Puma" title="Puma" />
          <Button onClickHandler={handleClick} value="Vans" title="Vans" />
        </div>
      </div>
    </>
  );
};

export default Recommended;