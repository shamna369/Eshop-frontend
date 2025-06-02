import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
function Dropdown() {
  const navigate = useNavigate();
  function handleClick(item) {
    navigate(`/allProducts/category/${item.name}`);
    // navigate(0);
  }
  return (
    <ul className="  bg-white shadow-md max-h-[100vh] overflow-auto">
      {categoriesData.map((el, i) => (
        <div
          className=" flex items-center gap-2 py-1 border-b  border-slate-200 px-1 cursor-pointer hover:bg-blue-200 hover:font-semibold text-[13px] font-Roboto text-[#333] "
          key={i}
          onClick={() => handleClick(el)}
        >
          <img
            src={el.url}
            style={{
              width: "25px",
              height: "25px",
              objectFit: "contain",
              marginLeft: "10px",
              userSelect: "none",
            }}
            alt=""
          />
          <li className="">{el.name}</li>
        </div>
      ))}
    </ul>
  );
}

export default Dropdown;
