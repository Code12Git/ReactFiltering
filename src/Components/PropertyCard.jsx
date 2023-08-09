import React from "react";
import { FaBed, FaRegSquare, FaShower } from "react-icons/fa";

const PropertyCard = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((item) => (
        <div
          key={item.id}
          className="max-w-md rounded overflow-hidden shadow-lg translate-x-1 hover:scale-105 cursor-pointer m-4 bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <img
            className="w-full h-48 object-cover"
            src={item.imageUrl}
            alt={item.propertyName}
          />
          <div className="px-6 py-4 ">
            <div className="mb-2 font-bold text-xl text-indigo-500">
              ${item.price}/month
            </div>
            <div className="text-gray-900 font-serif text-lg mb-2">
              {item.propertyName}
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.address}</p>
            <div className="flex items-center">
              <p className="text-indigo-500 inline-flex items-center mr-2">
                <FaBed className="mr-1" />
                {item.bedrooms} Beds
              </p>
              <p className="text-indigo-500 inline-flex items-center mr-2">
                <FaShower className="mr-1" />
                {item.bathrooms} Baths
              </p>
              <p className="text-gray-400 inline-flex items-center">
                <FaRegSquare className="mr-1" />
                {item.size}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;
