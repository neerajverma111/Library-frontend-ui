import React from "react";
import Skeleton from "react-loading-skeleton"; // Optional, if you prefer using this package
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonLoading = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm border border-gray-200 bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700 ">
          <tr>
            <th className="px-4 py-2 text-lg">
              <Skeleton width={40} height={20} />
            </th>
            <th className="px-4 py-2 text-lg">
              <Skeleton width={150} height={20} />
            </th>
            <th className="px-4 py-2 text-lg">
              <Skeleton width={120} height={20} />
            </th>
            <th className="px-4 py-2 text-lg">
              <Skeleton width={80} height={20} />
            </th>
            <th className="px-4 py-2 text-lg">
              <Skeleton width={120} height={20} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(8) // Generating 8 skeleton rows
            .fill(null)
            .map((_, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-2 text-base">
                  <Skeleton width={40} height={20} />
                </td>
                <td className="px-4 py-2 text-base">
                  <Skeleton width={150} height={20} />
                </td>
                <td className="px-4 py-2 text-base">
                  <Skeleton width={120} height={20} />
                </td>
                <td className="px-4 py-2 text-base text-center">
                  <Skeleton width={60} height={20} />
                </td>
                <td className="px-4 py-2 text-base">
                  <Skeleton width={100} height={30} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonLoading;
