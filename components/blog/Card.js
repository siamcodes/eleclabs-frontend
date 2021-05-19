import Head from 'next/head'
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API, DOMAIN } from '../../config';
import {
    FacebookShareButton,
    FacebookShareCount,
    FacebookIcon,
    LineShareButton,
    LineIcon,
    EmailShareButton,
    EmailIcon,
} from "react-share";
import { withRouter } from 'next/router'; //

const Card = ({ blog, router }) => {
    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <>
                <Link key={i} href={`/categories/${c.slug}`}>
                    <a className="btn btn-secondary btn-sm mt-2">{c.name}</a>
                </Link> {' '}
            </>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <>
                <Link key={i} href={`/tags/${t.slug}`}>
                    <a className="btn btn-outline-secondary btn-sm mt-2">{t.name}</a>
                </Link> {' '}
            </>
        ));
    
    const shareUrl = `${DOMAIN}/blogs/${blog.slug}`;

    return (
        <div className=" pb-4">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h2 className="pt-2 pb-2 font-weight-bold">{blog.title}</h2>
                    </a>
                </Link>
            </header>
            <section>
                <small className="mark">
                    Written by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.name}</a>
                    </Link>{' '}
                    | Published {moment(blog.updatedAt).fromNow()}
                </small>
            </section>
            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
            </section>

            <div className="row">
                <div className="col-md-4">
                    <section>
                        <img
                            className="img img-fluid"
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                    </section>
                </div>
                <div className="col-md-8">
                    <section>
                        <div className="pb-2">{renderHTML(blog.excerpt)}</div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="btn btn-outline-info pt-2">Read more</a>
                        </Link> {' '}
                        <FacebookShareButton url={shareUrl} >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <FacebookShareCount url={shareUrl}>
                            {shareCount => <span className="btn btn-primary">{shareCount}</span>}
                        </FacebookShareCount>
                        <LineShareButton url={shareUrl}>
                            <LineIcon size={32} round={true} />
                        </LineShareButton>
                        <EmailShareButton url={shareUrl}>
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Card);