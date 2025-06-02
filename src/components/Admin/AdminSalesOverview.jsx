import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetOrderInDays } from "../../hooks/orderHooks/useGetOrderInDays";

//paid order vs date
function AdminSalesOverview() {
  const { data, isLoading } = useGetOrderInDays();
  //console.log(data);
  return (
    <div className="flex items-center justify-center flex-col py-8 my-8 bg-blue-50">
      <h1 className="text-blue-800 font-semibold">Order Overview</h1>
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />

        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="totalPaidOrders"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </div>
  );
}

export default AdminSalesOverview;
