import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";
// let data;
// const getCategoryData = async function () {
//   const res = await axios.get(`${server}/products/total-category-count`);
//   data = res?.data?.data || [];
// };
// getCategoryData();
// console.log(data);
const data = [
  {
    _id: "laptops",
    totalCount: 5,
  },
  {
    _id: "mobile-accessories",
    totalCount: 2,
  },
  {
    _id: "mens-watches",
    totalCount: 6,
  },
  {
    _id: "groceries",
    totalCount: 27,
  },
  {
    _id: "beauty",
    totalCount: 5,
  },
  {
    _id: "fragrances",
    totalCount: 5,
  },
  {
    _id: "furniture",
    totalCount: 5,
  },
  {
    _id: "home-decoration",
    totalCount: 5,
  },
  {
    _id: "kitchen-accessories",
    totalCount: 30,
  },
  {
    _id: "mens-shirts",
    totalCount: 5,
  },
  {
    _id: "mens-shoes",
    totalCount: 5,
  },
];
const data2 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF1919",
  "#19FF32",
  "#FF8C19",
  "#198CFF",
  "#8C19FF",
  "#FF198C",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={10}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function AdminCategoryChart() {
  const [activeId, setActiveId] = useState(null);

  const handleMouseEnter = (data, index) => {
    setActiveId(data._id);
  };

  const handleMouseLeave = () => {
    setActiveId(null);
  };
  return (
    <div className="flex w-full items-center justify-center flex-col mt-8 p-4  bg-blue-50 ">
      <h1 className="text-blue-800 font-semibold">Category Distribution</h1>

      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="totalCount"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      {activeId && (
        <div className="mt-4 text-blue-800 font-semibold">{activeId}</div>
      )}
    </div>
  );
}

export default AdminCategoryChart;
