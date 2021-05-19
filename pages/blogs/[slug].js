import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';

import {
    FacebookShareButton,
    FacebookShareCount,
    FacebookIcon,
    LineShareButton,
    LineIcon,
    EmailShareButton,
    EmailIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon,
    TelegramShareButton,
    TelegramIcon,
} from "react-share";

const SingleBlog = ({ blog, query }) => {
    const shareUrl = `${DOMAIN}/blogs/${query.slug}`; //
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            <script data-ad-client="ca-pub-8190308026925658" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <>
                <Link key={i} href={`/categories/${c.slug}`}>
                    <a className="btn btn-secondary mt-2">{c.name}</a>
                </Link>{' '}
            </>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <>
                <Link key={i} href={`/tags/${t.slug}`}>
                    <a className="btn btn-outline-secondary mt-2">{t.name}</a>
                </Link>{' '}
            </>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };


    const showComments = () => {
        return (
            <div>
                <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        );
    };



    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container">
                            <section>
                                <div className="row" style={{ marginTop: '-30px' }}>
                                    <img
                                        src={`${API}/blog/photo/${blog.slug}`}
                                        alt={blog.title}
                                        className="img img-fluid featured-image"
                                    />
                                </div>
                            </section>

                            <section>
                                <h2 className="display-2 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h2>
                                <small className="mt-2 mark ">
                                    Written by{' '}
                                    <Link href={`/profile/${blog.postedBy.username}`}>
                                        <a>{blog.postedBy.name}</a>
                                    </Link>{' '}
                                   | Published {moment(blog.updatedAt).fromNow()}
                                </small>
                            </section>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    {renderHTML(blog.body)}
                                </div>
                                <div className="col-md-4">
                                    {showBlogCategories(blog)}
                                    {showBlogTags(blog)}
                                    <hr />
                                    <FacebookShareButton url={shareUrl} quote={blog.title} className="btn" >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <FacebookShareCount url={shareUrl}>
                                        {shareCount => <span className="btn">{shareCount}</span>}
                                    </FacebookShareCount>
                                    <LineShareButton url={shareUrl}>
                                        <LineIcon size={32} round />
                                    </LineShareButton>
                                    <EmailShareButton url={shareUrl}>
                                        <EmailIcon size={32} round />
                                    </EmailShareButton>
                                    <FacebookMessengerShareButton url={shareUrl} appId={`${FB_APP_ID}`} className="btn"  >
                                        <FacebookMessengerIcon size={32} round />
                                    </FacebookMessengerShareButton>
                                    <TwitterShareButton url={shareUrl} title={blog.title} className="btn"  >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <TelegramShareButton url={shareUrl} title={blog.title} className="btn"  >
                                        <TelegramIcon size={32} round />
                                    </TelegramShareButton>
                                    <LinkedinShareButton url={shareUrl} className="btn">
                                        <LinkedinIcon size={32} round />
                                    </LinkedinShareButton>

                                    <PinterestShareButton
                                        url={String(window.location)}
                                        media={`${String(window.location)}/${API}/blog/photo/${blog.slug}`}
                                        className="btn"
                                    >
                                        <PinterestIcon size={32} round />
                                    </PinterestShareButton>
                                    <PinterestShareCount url={shareUrl} className="btn" />
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                            <hr />
                            {/* {JSON.stringify(related)} */}
                            <div className="row">{showRelatedBlog()}</div>
                        </div>

                        <div className="container pt-5 pb-5">{showComments()}</div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleBlog;
