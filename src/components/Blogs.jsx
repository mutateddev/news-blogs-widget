import { useState } from 'react';
import { ArrowFromBottom, ChevronRight } from '@boxicons/react';
import userImage from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import './Blogs.css';

const Blogs = ({ onBack, onCreateBlog }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newBlog = {
      image: image || noImg,
      title,
      content,
    };
    onCreateBlog(newBlog);
    setImage(null);
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  return (
    <div className='blogs'>
      <div className='blogs-left'>
        <img src={userImage} alt='user image' />
      </div>

      <div className='blogs-right'>
        {showForm ? (
          <div className='blogs-right-form'>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className='img-upload'>
                <label htmlFor='file-upload' className='file-upload'>
                  <ArrowFromBottom
                    className='upload-icon'
                    fill='#b88efc'
                    size='md'
                  />
                  Upload Image
                </label>
                <input
                  type='file'
                  id='file-upload'
                  onChange={handleImageChange}
                />
              </div>
              <input
                type='text'
                placeholder='Add Title (Max 60 Character)'
                max={60}
                className='title-input'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              <textarea
                className='text-input'
                placeholder='Add Text'
                value={content}
                onChange={e => setContent(e.target.value)}
              />
              <button type='submit' className='submit-btn'>
                Submit Button
              </button>
            </form>
          </div>
        ) : (
          <button onClick={() => setShowForm(true)} className='post-btn'>
            Create New Post
          </button>
        )}
        <button className='blogs-close-btn' onClick={onBack}>
          Back <ChevronRight className='back-btn' size='md' />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
