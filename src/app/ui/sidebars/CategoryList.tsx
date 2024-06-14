import React from "react";

const categories = [
    {title:'Sports'}, {title:'Politics'}
]
const CategoryList = () => {
  return (
    <div>
      <ul className="checkbox-wrapper-46">
        {categories.map((category, index) => (
          <li className=" flex px-2 border-b border-b-bgdark/50 flex-1 items-center py-3 gap-x-4" key={index}>
            <input type="checkbox" id="cbx-46" className="inp-cbx" />
            <label htmlFor="cbx-46" className="cbx">
                <span>
                <svg viewBox="0 0 12 10" height="10px" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
                </span>
                <span className=" texxt-lg">{category.title}</span>
            </label>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
