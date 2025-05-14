/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import '../styles.css';
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FaRecycle, FaPlus } from "react-icons/fa";
import { MdFilterList } from 'react-icons/md';

const Centers = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const keys = ["name", "location"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-700 flex items-center gap-2">
            <FaRecycle /> Green Guard Solutions
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/recycling/admin">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
                Admin Dashboard
              </button>
            </Link>
          
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile<span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="hero min-h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://t3.ftcdn.net/jpg/07/11/77/28/360_F_711772818_fWLmwTiBonKPKlbPQz8GYbRp8LW56kJt.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Green Guard</h1>
            <p className="mb-6 text-lg">
              Join us in making recycling simple and impactful. Drop off your
              recyclables, track your efforts, or report issues. Together, we
              can create a greener planet! 🌍♻️
            </p>
            <Link to="/recycling/create">
              <button className="btn btn-primary bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg">
                Add Recycling Entry
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Drop-off Points",
            desc: "Find and contribute to local recycling centers.",
            img: "https://cdn-cms.pgimgs.com/static/2020/11/nea-recycling-bin-1024x682.jpg",
          },
          {
            title: "Material Sorting",
            desc: "Sort and recycle various materials efficiently.",
            img: "https://angelwaste.com.au/wp-content/uploads/nareeta-martin-FoG7PKNYjpM-unsplash-scaled.jpg",
          },
          {
            title: "Report Issues",
            desc: "Report any problems with our centers.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFHQSfcsb0RdiC_OAatsDx29Fw63wnTOQJQ&s",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="card glass shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <figure>
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-green-700">{card.title}</h2>
              <p className="text-gray-600">{card.desc}</p>
              <div className="card-actions justify-end">
                <Link to="/recycling/create">
                  <button className="btn btn-sm btn-primary bg-green-600 hover:bg-green-700 text-white">
                    Add Entry
                  </button>
                </Link>
                 
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">Recycling Entries</h1>
          <Link
            to="/recycling/create"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
          >
            <FaPlus /> Add New Entry
          </Link>
        </div>

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

        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full bg-white">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 text-left rounded-tl-md">No</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left hidden md:table-cell">Email</th>
                  <th className="p-3 text-left">Contact No</th>
                  <th className="p-3 text-left hidden md:table-cell">
                    Location
                  </th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Photo</th>
                  <th className="p-3 text-left rounded-tr-md">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <tr
                    key={entry._id}
                    className="even:bg-gray-50 hover:bg-green-50 transition-colors duration-150"
                  >
                    <td className="p-3 text-gray-700">{index + 1}</td>
                    <td className="p-3 text-gray-700 font-medium">
                      {entry.name}
                    </td>
                    <td className="p-3 text-gray-700 hidden md:table-cell">
                      {entry.email}
                    </td>
                    <td className="p-3 text-gray-700">{entry.contactNumber}</td>
                    <td className="p-3 text-gray-700 hidden md:table-cell">
                      {entry.location}
                    </td>
                    <td className="p-3 text-gray-700">{entry.type}</td>
                    <td className="p-3 text-gray-700">
                      {entry.file ? (
                        <img
                          src={`../public/images/${entry.file}`}
                          alt={`${entry.name}'s recycling`}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        "No photo"
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-x-3">
                        <Link to={`/recycling/details/${entry._id}`}>
                          <BsInfoCircle className="text-xl text-green-600 hover:text-green-800" />
                        </Link>
                        <Link to={`/recycling/edit/${entry._id}`}>
                          <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-800" />
                        </Link>
                        <Link to={`/recycling/delete/${entry._id}`}>
                          <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer p-10 bg-gray-800 text-white text-center">
        <p>
          RecycleSmart Centers © {new Date().getFullYear()} - All Rights
          Reserved
        </p>
      </footer>
    </div>
  );
};

export default Centers;
