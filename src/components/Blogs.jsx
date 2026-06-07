import { ChevronRight } from '@boxicons/react';
import './Blogs.css';
import userImage from '../assets/images/user.jpg';

const Blogs = () => {
  return (
    <div className='blogs'>
      <div className='blogs-left'>
        <img src={userImage} alt='user image' />
      </div>

      <div className='blogs-right'>
        <button className='post-btn'>Create New Post</button>
        <button className='blogs-close-btn'>
          Back <ChevronRight className='back-btn' size='md' />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
