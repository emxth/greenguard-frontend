import { Link } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import RecyclingModal from "./RecyclingModal";

const RecyclingSingleCard = ({ entry }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-2 border-green-500 rounded-xl px-6 py-4 m-4 relative bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      {/* Card Header with Name */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="px-3 py-1 bg-green-200 text-green-800 font-semibold rounded-full text-lg">
          {entry.name}
        </h2>
        <FaRecycle className="text-green-600 text-2xl" />
      </div>

      {/* Photo Display */}
      <div className="mb-4">
        {entry.file ? (
          <img
            src={`../public/images/${entry.file}`}
            alt={`${entry.name}'s recycling`}
            className="w-full h-40 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <BiUserCircle className="text-green-600 text-xl" />
          <p className="text-gray-700 text-sm">{entry.email}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-green-600 text-xl">📍</span>
          <p className="text-gray-700 text-sm">{entry.location}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-green-600 text-xl">♻️</span>
          <p className="text-gray-700 text-sm font-medium">{entry.type}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-x-4 mt-6 p-2 border-t border-gray-200">
        <BiShow
          className="text-2xl text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-200"
          onClick={() => setShowModal(true)}
          title="View Details"
        />
        <Link to={`/recycling/details/${entry._id}`}>
          <BsInfoCircle
            className="text-2xl text-green-600 hover:text-green-800 transition-colors duration-200"
            title="More Info"
          />
        </Link>
        <Link to={`/recycling/edit/${entry._id}`}>
          <AiOutlineEdit
            className="text-2xl text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
            title="Edit"
          />
        </Link>
        <Link to={`/recycling/delete/${entry._id}`}>
          <MdOutlineDelete
            className="text-2xl text-red-600 hover:text-red-800 transition-colors duration-200"
            title="Delete"
          />
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <RecyclingModal entry={entry} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default RecyclingSingleCard;
