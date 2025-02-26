import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from "recharts";
import {mockData} from "@/const/mockData";
import {useAuth} from "@/context/AuthProvider";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const CustomTooltip = ({active, payload}: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-bold text-lg">{data.month}</p>
        <p className="text-gray-700">👥 Users: <b>{data.users}</b></p>
        <p className="text-green-600">💰 Level One: <b>${data.levelOne} / {data.levelOne} BUSD</b></p>
        <p className="text-blue-600">🏦 Level Two: <b>${data.levelTwo} / {data.levelTwo} BUSD</b></p>
      </div>
    );
  }
  return null;
};

const Overview = () => {
  
  const {
    transformOverviewData: overviews,
    overviewLoading,
    overviewRefetch,
    overviewError,
  } = useAuth()
  
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      {!overviewError ? (
        !overviewLoading ? (
          <BarChart data={overviews() ?? mockData}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend/>
            <Bar dataKey="users" fill="#8884d8" name="Users"/>
            <Bar dataKey="levelOne" fill="#82ca9d" name="Level One"/>
            <Bar dataKey="levelTwo" fill="#ffc658" name="Level Two"/>
          </BarChart>
        ) : (<div className='w-full flex justify-center items-center'><Loader2
          className="size-7 animate-spin text-black"/></div>)
      ) : (<div className='w-full flex justify-center items-center'>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className='text-xs text-red-500'>Error fetching Overview</p>
          <Button onClick={overviewRefetch}>Reload Overview</Button>
        </div>
      </div>)}
    </ResponsiveContainer>
  );
};

export default Overview;
