import React, { useState } from "react";
import dummyData from "../dummyData";
import PropertyCard from "./PropertyCard";
import { FaSearch } from "react-icons/fa";
const PropertyList = () => {
  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const [moveindate, setMoveInDate] = useState("");
  const [minprice, setMinPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");
  const [propertytype, setPropertyType] = useState("");
  const [filteredData, setFilteredData] = useState(dummyData);
  const [locationSuggestionsVisible, setLocationSuggestionsVisible] =
    useState(false);

  const keys = [
    "location",
    "moveInDate",
    "propertyType",
    "minPrice",
    "maxPrice",
  ];
  const handleLocationChange = (selectedLocation) => {
    setLocation(selectedLocation);
    setLocationSuggestionsVisible(false);
  };

  const handleLocationInput = (input) => {
    setLocation(input);
    setLocationSuggestionsVisible(true);

    const uniqueSuggestions = dummyData
      .map((item) => item.location)
      .filter((value, index, self) => self.indexOf(value) === index);

    setLocationSuggestions(uniqueSuggestions);
  };

  const handleSearch = () => {
    const filteredData = dummyData.filter((item) => {
      return keys.every((key) => {
        if (key === "location") {
          return item[key].toLowerCase().includes(location.toLowerCase());
        } else if (key === "moveInDate") {
          return moveindate === "" || item[key].includes(moveindate);
        } else if (key === "propertyType") {
          return item[key].toLowerCase().includes(propertytype.toLowerCase());
        } else if (key === "minPrice") {
          return minprice === "" || item.price >= parseInt(minprice);
        } else if (key === "maxPrice") {
          return maxprice === "" || item.price <= parseInt(maxprice);
        }
      });
    });

    setFilteredData(filteredData);
  };

  const uniqueLocationSuggestions = Array.from(new Set(locationSuggestions));
  return (
    <>
      <div className="bg-purple-400 py-6 mt-10 rounded-lg ">
        <div className="container mx-auto px-4 md:flex md:items-center">
          {/* Location */}
          <div className="mb-4 md:mr-4 md:mb-0 relative w-full md:w-1/4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Location
            </label>
            <div className="relative z-10">
              <input
                type="text"
                onChange={(e) => handleLocationInput(e.target.value)}
                value={location}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter location"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              {locationSuggestionsVisible && (
                <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {uniqueLocationSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="cursor-pointer py-1 px-3 hover:bg-gray-100"
                      onClick={() => handleLocationChange(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Move-in Date */}
          <div className="mb-4 md:mr-4 md:mb-0 w-full md:w-1/4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Move-in Date
            </label>
            <input
              type="date"
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Price Range */}
          <div className="mb-4 md:mr-4 md:mb-0 w-full md:w-1/4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Price Range
            </label>
            <div className="flex items-center">
              <span className="text-slate-500 text-lg mr-1">$</span>
              <input
                type="number"
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 px-2 py-2 border-t border-b border-l border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Min"
              />
              <span className="text-gray-500 mx-2">-</span>
              <input
                type="number"
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 px-2 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="mb-4 md:mb-0 w-full md:w-1/4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Property Type
            </label>
            <select
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="cottage">Cottage</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex mt-5 ml-5">
            <button
              onClick={handleSearch}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <FaSearch className="text-lg mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Property Card */}
      <div className="container mx-auto px-4 py-12">
        <PropertyCard data={filteredData} />
      </div>
    </>
  );
};

export default PropertyList;
