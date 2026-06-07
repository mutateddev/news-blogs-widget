import {
  ArrowFromBottom,
  ArrowFromBottomStroke,
  ArrowUpDown,
  ChevronRight,
} from '@boxicons/react';
import './Blogs.css';
import userImage from '../assets/images/user.jpg';

const Blogs = () => {
  return (
    <div className='blogs'>
      <div className='blogs-left'>
        <img src={userImage} alt='user image' />
      </div>

      <div className='blogs-right'>
        {/* <button className='post-btn'>Create New Post</button> */}
        <div className='blogs-right-form'>
          <h1>New Post</h1>
          <form>
            <div className='img-upload'>
              <label htmlFor='file-upload' className='file-upload'>
                <ArrowFromBottom
                  className='upload-icon'
                  fill='#b88efc'
                  size='md'
                />
                Upload Image
              </label>
              <input type='file' id='file-upload' />
            </div>
            <input
              type='text'
              placeholder='Add Title (Max 60 Character)'
              max={60}
              className='title-input'
            />

            <textarea className='text-input' placeholder='Add Text' />
            <button type='submit' className='submit-btn'>
              Submit Button
            </button>
          </form>
        </div>
        <button className='blogs-close-btn'>
          Back <ChevronRight className='back-btn' size='md' />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
