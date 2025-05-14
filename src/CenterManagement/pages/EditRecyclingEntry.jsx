import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditRecyclingEntry = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8081/recycling/${id}`)
    .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setContactNumber(response.data.contactNumber);
        setLocation(response.data.location);
        setType(response.data.type);
        setFile(response.data.file);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while fetching recycling entry data', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditEntry = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("contactNumber", contactNumber);
    data.append("location", location);
    data.append("type", type);
    data.append("file", file);

    setLoading(true);
    axios
      .put(`http://localhost:5000/recycling/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Recycling Entry Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-bold text-green-800 mb-8">Edit Recycling Entry</h1>
        {loading ? <Spinner /> : ''}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Contact Number</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              >
                <option value="">Select recycling type</option>
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
              <label className="block text-lg font-medium text-gray-700 mb-2">File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              />
            </div>
            <button 
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              onClick={handleEditEntry}
            >
              Update Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecyclingEntry;