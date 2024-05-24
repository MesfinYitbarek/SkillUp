import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(`http://localhost:4444/api/result`, (res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="title text-2xl font-bold text-gray-800 text-left my-4">Result Table</h1>
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Attempts</th>
            <th className="px-4 py-2 text-left">Earn Points</th>
            <th className="px-4 py-2 text-left">Result</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr key={i} className="text-left odd:bg-gray-100 even:bg-gray-200">
              <td className="border px-4 py-2">{v?.username || ""}</td>
              <td className="border px-4 py-2">{v?.attempts || 0}</td>
              <td className="border px-4 py-2">{v?.points || 0}</td>
              <td className={`border px-4 py-2 ${v?.achived === 'Passed' ? 'text-green-500' : 'text-red-500'}`}>{v?.achived || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    );
}
