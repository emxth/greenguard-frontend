/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import '../styles.css';
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import RecyclingTable from "../components/home/RecyclingTable";
import RecyclingCard from "../components/home/RecyclingCard";
import BackButton from "../components/BackButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RecyclingReport from "../components/home/RecyclingReport";
import { MdFilterList } from 'react-icons/md';

const CenterAdmin = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8081/recycling")
      .then((response) => {
        setEntries(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const filteredEntries = entries
    .filter((entry) => {
      const matchesType = filterType ? entry.type === filterType : true;
      const matchesLocation = filterLocation
        ? entry.location.toLowerCase().includes(filterLocation.toLowerCase())
        : true;
      return matchesType && matchesLocation;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <div className="flex justify-between items-center mt-4 mb-8">
          <h1 className="text-4xl font-bold text-green-800">
            Recycling Entries List
          </h1>

          <div className="flex items-center gap-x-6">
            {/* View Toggle Buttons */}
            <div className="flex gap-x-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  showType === "table"
                    ? "bg-green-600 text-white"
                    : "bg-green-200 text-green-800 hover:bg-green-300"
                }`}
                onClick={() => setShowType("table")}
              >
                Table View
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  showType === "card"
                    ? "bg-green-600 text-white"
                    : "bg-green-200 text-green-800 hover:bg-green-300"
                }`}
                onClick={() => setShowType("card")}
              >
                Card View
              </button>
            </div>

            {/* Generate Report Button */}
            <PDFDownloadLink
              document={<RecyclingReport entries={filteredEntries} />}
              fileName="recycling_report.pdf"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              {({ loading }) => (
                <>
                  <FaFileDownload className="text-xl" />
                  {loading ? "Generating..." : "Generate Report"}
                </>
              )}
            </PDFDownloadLink>

            {/* Add New Entry Button */}
            <Link to="/recycling/create">
              <MdOutlineAddBox
                className="text-green-700 text-4xl hover:text-green-900 transition-colors duration-200"
                title="Add New Entry"
              />
            </Link>
          </div>
        </div>

        {/* Entry Count */}
        <h2 className="mb-6 text-xl font-semibold text-gray-700">
          Total Entries:{" "}
          <span className="text-green-600">{filteredEntries.length}</span>
        </h2>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MdFilterList className="text-2xl text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Types</option>
                <option value="Plastic">Plastic</option>
                <option value="Paper">Paper</option>
                <option value="Glass">Glass</option>
                <option value="Metal">Metal</option>
                <option value="Electronics">Electronics</option>
                <option value="Organic Waste">Organic Waste</option>
                <option value="Textiles">Textiles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                placeholder="Filter by location..."
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <RecyclingTable entries={filteredEntries} />
        ) : (
          <RecyclingCard entries={filteredEntries} />
        )}
      </div>
    </div>
  );
};

export default CenterAdmin;
