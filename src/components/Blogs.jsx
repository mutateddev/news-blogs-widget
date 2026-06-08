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
  const [submitted, setSubmitted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        alert('file size exceeds 1 MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
    setTitleValid(true);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
    setContentValid(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!title || !content) {
      if (!title) setTitleValid(false);
      if (!content) setContentValid(false);
      return;
    }

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
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onBack();
    }, 1017);
  };

  return (
    <div className='blogs'>
      <div className='blogs-left'>
        <img src={userImage} alt='user image' />
      </div>

      <div className='blogs-right'>
        {!showForm && !submitted && (
          <button onClick={() => setShowForm(true)} className='post-btn'>
            Create New Post
          </button>
        )}

        {submitted && <p className='submission-message'>Post Submitted !</p>}

        <div className={`blogs-right-form ${showForm ? 'visible' : 'hidden'}`}>
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
              className={`title-input ${!titleValid ? 'invalid' : ''}`}
              value={title}
              onChange={handleTitleChange}
              maxLength={60}
            />

            <textarea
              className={`text-input ${!contentValid ? 'invalid' : ''}`}
              placeholder='Add Text'
              value={content}
              onChange={handleContentChange}
            />
            <button type='submit' className='submit-btn'>
              Submit Button
            </button>
          </form>
        </div>
        <button className='blogs-close-btn' onClick={onBack}>
          Back <ChevronRight className='back-btn' size='md' />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
