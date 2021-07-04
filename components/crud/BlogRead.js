import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';
import { API } from '../../config';

const BlogRead = ({ username }) => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
    };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <>
                    <a href={`/user/crud/${blog.slug}`} className="btn btn-sm btn-warning">Update</a>
                    {' '}
                </>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <>
                    <a href={`/admin/crud/${blog.slug}`} className="ml-2 btn btn-sm btn-warning">Update</a>
                    {' '}
                </>
            );
        }
    };


    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="col">
                    <div className="card" >
                        <img
                            className="card-img-top"
                            style={{ objectFit: 'cover' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link href={`/blogs/${blog.slug}`}><a>
                                    {blog.title}
                                </a></Link>
                            </h5>
                            <p className="card-text">
                                <small class="text-muted">  Written by {blog.postedBy.name}  | Published on {moment(blog.updatedAt).fromNow()} </small>
                            </p>
                            <div className="text-center">
                                <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                                    Delete
                                </button> {' '}
                                {showUpdateButton(blog)}
                            </div>
                        </div>

                    </div>
                </div>
            );
        });
    };


    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <div className="row row-cols-1 row-cols-md-4 g-1">
                        {showAllBlogs()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BlogRead;
