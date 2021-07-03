import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API, DOMAIN, FB_APP_ID } from '../../config';

import { withRouter } from 'next/router';

const Card = ({ blog, router }) => {

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <>
                <Link key={i} href={`/categories/${c.slug}`}>
                    <a className="btn btn-secondary btn-sm">{c.name}</a>
                </Link> {' '}
            </>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <>
                <Link key={i} href={`/tags/${t.slug}`}>
                    <a className="btn btn-outline-secondary btn-sm">{t.name}</a>
                </Link> {' '}
            </>
        ));

    return (
        <>
            <div className="card">
                <img
                    className="img img-fluid"
                    style={{ maxHeight: '150px', width: 'auto', objectFit: 'cover' }}
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                />
                <div className="card-body">
                    <h3 className="card-title"> <Link href={`/blogs/${blog.slug}`}><a>{blog.title}</a></Link></h3>
                    <small className="mark">
                        Written by{' '}
                        <Link href={`/profile/${blog.postedBy.username}`}>
                            <a>{blog.postedBy.name}</a>
                        </Link>{' '}
                        | Published {moment(blog.updatedAt).fromNow()}
                    </small>
                    <div className="pt-2 pb-2">
                        {showBlogCategories(blog)}
                        {showBlogTags(blog)}
                    </div>
                    <div className="card-text">
                        <div>{renderHTML(blog.excerpt)}</div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="btn btn-outline-info pt-2">Read more</a>
                        </Link> {' '}
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Card);
