import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MdWarning } from 'react-icons/md';

const DeleteRecyclingEntry = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEntry = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8081/recycling/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Recycling Entry Deleted successfully', { variant: 'success' });
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
        <h1 className="text-4xl font-bold text-green-800 mb-8">Delete Recycling Entry</h1>
        {loading ? <Spinner /> : ''}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center gap-x-2 text-red-600">
              <MdWarning className="text-4xl" />
              <h3 className="text-2xl font-semibold">Warning</h3>
            </div>
            <p className="text-gray-600 text-center">
              Are you sure you want to delete this recycling entry? This action cannot be undone.
            </p>
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              onClick={handleDeleteEntry}
            >
              Yes, Delete Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecyclingEntry;