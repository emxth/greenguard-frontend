import { AiOutlineClose } from 'react-icons/ai';
import { MdEmail } from "react-icons/md";
import { BiUserCircle } from 'react-icons/bi';
import { MdContactPhone } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa"; // New icon for location
import { FaRecycle } from "react-icons/fa"; // New icon for recycling type
import { MdAttachFile } from "react-icons/md"; // New icon for file

// eslint-disable-next-line react/prop-types
const RecyclingModal = ({ entry, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-green-300 rounded-lg'>
          {entry._id} {/* Changed to show ID since registrationNumber is removed */}
        </h2>
        <h4 className='my-2 text-gray-500'>Entry ID</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-green-300 text-2xl' /> {/* Changed icon color */}
          <div className="stat-title">Name = </div>
          <h2 className='my-1'>{entry.name}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <MdEmail className='text-green-300 text-2xl' />
          <div className="stat-title">Email = </div>
          <h2 className='my-1'>{entry.email}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <MdContactPhone className='text-green-300 text-2xl' />
          <div className="stat-title">Contact Number = </div>
          <h2 className='my-1'>{entry.contactNumber}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaMapMarkerAlt className='text-green-300 text-2xl' /> {/* New location icon */}
          <div className="stat-title">Location = </div>
          <h2 className='my-1'>{entry.location}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaRecycle className='text-green-300 text-2xl' /> {/* New recycling type icon */}
          <div className="stat-title">Type = </div>
          <h2 className='my-1'>{entry.type}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <MdAttachFile className='text-green-300 text-2xl' /> {/* New file icon */}
          <div className="stat-title">File = </div>
          <h2 className='my-1'>{entry.file || 'No file attached'}</h2>
        </div>
      </div>
    </div>
  );
};

export default RecyclingModal;