import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa"; // Added download icon
import { useState } from "react";
import RecyclingPDF from "./RecyclingPDF"; // Updated to use your modified PDF component
import { PDFDownloadLink } from "@react-pdf/renderer";

const RecyclingTable = ({ entries }) => {
  const [query, setQuery] = useState("");
  const keys = ["name", "location"]; // Updated search keys for recycling

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div className="mt-6">
      {/* Search Input */}
      <div className="form-control mb-4 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-separate border-spacing-0 bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border-b border-green-700 rounded-tl-md p-3 text-left text-sm font-semibold">
                No
              </th>
              <th className="border-b border-green-700 p-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="border-b border-green-700 p-3 text-left text-sm font-semibold hidden md:table-cell">
                Email
              </th>
              <th className="border-b border-green-700 p-3 text-left text-sm font-semibold">
                Contact No
              </th>
              <th className="border-b border-green-700 p-3 text-left text-sm font-semibold hidden md:table-cell">
                Location
              </th>
              <th className="border-b border-green-700 p-3 text-left text-sm font-semibold">
                Type
              </th>
              <th className="border-b border-green-700 p-3 text-left text-sm font-semibold">
                File
              </th>
              <th className="border-b border-green-700 rounded-tr-md p-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {search(entries).map((entry, index) => (
              <tr
                key={entry._id}
                className="h-12 even:bg-gray-50 hover:bg-green-50 transition-colors duration-150"
              >
                <td className="border-b border-gray-200 p-3 text-gray-700">
                  {index + 1}
                </td>
                <td className="border-b border-gray-200 p-3 text-gray-700 font-medium">
                  {entry.name}
                </td>
                <td className="border-b border-gray-200 p-3 text-gray-700 hidden md:table-cell">
                  {entry.email}
                </td>
                <td className="border-b border-gray-200 p-3 text-gray-700">
                  {entry.contactNumber}
                </td>
                <td className="border-b border-gray-200 p-3 text-gray-700 hidden md:table-cell">
                  {entry.location}
                </td>
                <td className="border-b border-gray-200 p-3 text-gray-700 font-medium">
                  {entry.type}
                </td>
                <td className="border-b border-gray-200 p-3 text-gray-700">
                  {entry.file ? (
                    <img
                      src={`../public/images/${entry.file}`}
                      alt="Recycling file"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    "No file"
                  )}
                </td>
                <td className="border-b border-gray-200 p-3">
                  <div className="flex justify-start items-center gap-x-3">
                    <Link to={`/recycling/details/${entry._id}`}>
                      <BsInfoCircle
                        className="text-xl text-green-600 hover:text-green-800 transition-colors duration-200"
                        title="Details"
                      />
                    </Link>
                    <Link to={`/recycling/edit/${entry._id}`}>
                      <AiOutlineEdit
                        className="text-xl text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                        title="Edit"
                      />
                    </Link>
                    <Link to={`/recycling/delete/${entry._id}`}>
                      <MdOutlineDelete
                        className="text-xl text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Delete"
                      />
                    </Link>
                    <PDFDownloadLink
                      document={<RecyclingPDF entry={entry} />}
                      fileName={`Recycling_${entry.name}.pdf`}
                    >
                      {({ loading }) =>
                        loading ? (
                          <span className="text-sm text-gray-500">
                            Loading...
                          </span>
                        ) : (
                          <FaFileDownload
                            className="text-xl text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            title="Download PDF"
                          />
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecyclingTable;
