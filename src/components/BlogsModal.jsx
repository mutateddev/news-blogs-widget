import { X } from '@boxicons/react';
import demoImg from '../assets/images/demo.jpg';
import './BlogsModal.css';
const BlogsModal = ({ show, blog, onClose }) => {
  if (!show) return null;
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <span className='close-button'>
          <X pack='brand' onClick={onClose} fill='#f4143c' />
        </span>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className='blogs-modal-image'
          />
        )}
        <h2 className='blogs-modal-title'>{blog.title}</h2>
        <p className='blogs-post-content'>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogsModal;
