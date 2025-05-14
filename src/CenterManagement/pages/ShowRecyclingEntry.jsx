import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { BiUserCircle } from "react-icons/bi";
import { MdEmail, MdContactPhone } from "react-icons/md";
import { FaMapMarkerAlt, FaRecycle } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";

const ShowRecyclingEntry = () => {
  const [entry, setEntry] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8081/recycling/${id}`)
      .then((response) => {
        setEntry(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-bold text-green-800 mb-8">Recycling Entry Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-x-2">
                <BiUserCircle className="text-2xl text-green-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">Name</label>
                  <span className="text-lg text-gray-900">{entry.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <MdEmail className="text-2xl text-green-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <span className="text-lg text-gray-900">{entry.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <MdContactPhone className="text-2xl text-green-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">Contact Number</label>
                  <span className="text-lg text-gray-900">{entry.contactNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <FaMapMarkerAlt className="text-2xl text-green-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">Location</label>
                  <span className="text-lg text-gray-900">{entry.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <FaRecycle className="text-2xl text-green-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">Type</label>
                  <span className="text-lg text-gray-900">{entry.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <MdAttachFile className="text-2xl text-green-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">File</label>
                  <span className="text-lg text-gray-900">{entry.file || "No file attached"}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Created At</label>
                    <span className="text-sm text-gray-900">
                      {new Date(entry.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                    <span className="text-sm text-gray-900">
                      {new Date(entry.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowRecyclingEntry;