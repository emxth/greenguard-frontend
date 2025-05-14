import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi'; // You might want to change this icon
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import RecyclingSingleCard from './RecyclingSingleCard'; // Updated component name

const RecyclingCard = ({ entries }) => { // Changed from books to entries
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {entries.map((item) => (
        <RecyclingSingleCard key={item._id} entry={item} /> // Changed props from book to entry
      ))}
    </div>
  );
};

export default RecyclingCard;