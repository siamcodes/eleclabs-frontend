import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import { signout, isAuth } from '../actions/auth';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import Card from '../components/blog/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
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
    PinterestShareCount,
    TelegramShareButton,
    TelegramIcon,
} from "react-share";

const Index = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

    const shareUrl = `${DOMAIN}`;

    const head = () => (
        <Head>
            <title>Electronics Laboratory | {APP_NAME}</title>
            <meta
                name="description"
                content="Electronics and Programming Tutorials on Embedded System Internet of Things IoT Microcontrollers ESP32 ESP8266 PIC Arduino ATMEGA MCS-51 DIY"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Electronics & Programming Tutorials | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Electronics and Programming Tutorials on Embedded System Internet of Things IoT Microcontrollers ESP32 ESP8266 PIC Arduino ATMEGA MCS-51 DIY"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            <script data-ad-client="ca-pub-8190308026925658" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };


    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article key={i}>
                    <Card blog={blog} />
                    <hr />
                </article>
            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <>
                <Link href={`/categories/${c.slug}`} key={i}>
                    <a className="btn btn-secondary btn-sm mt-1">{c.name}</a>
                </Link>{' '}
            </>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <>
                <Link href={`/tags/${t.slug}`} key={i}>
                    <a className="btn btn-outline-secondary btn-sm mt-1">{t.name}</a>
                </Link> {' '}
            </>
        ));
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog} />
            </article>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                {/*  {JSON.stringify(isAuth())} */}
                <main>
                    <div className="container">
                        <div className="row">

                            <div className="col-md-8">
                                <div className="container">
                                    {showAllBlogs()}
                                </div>
                                <div className="container">{showLoadedBlogs()}</div>
                                <div className="text-center pt-3 pb-3">{loadMoreButton()}</div>
                            </div>
                            <div className="col-md-4">
                                <div className="pb-3 text-center">
                                    {showAllCategories()}
                                    <br />
                                    {showAllTags()}
                                </div>
                                <hr />
                                <FacebookShareButton url={shareUrl} >
                                    <FacebookIcon size={40} round />
                                </FacebookShareButton>
                                <FacebookShareCount url={shareUrl}>
                                    {shareCount => <span>{shareCount}</span>}
                                </FacebookShareCount>
                                <LineShareButton url={shareUrl}>
                                    <LineIcon size={40} round />
                                </LineShareButton>
                                <EmailShareButton url={shareUrl}>
                                    <EmailIcon size={40} round />
                                </EmailShareButton>
                                <FacebookMessengerShareButton url={shareUrl} appId={`${FB_APP_ID}`}  >
                                    <FacebookMessengerIcon size={40} round />
                                </FacebookMessengerShareButton>
                                <TwitterShareButton url={shareUrl} title={blog.title} >
                                    <TwitterIcon size={40} round />
                                </TwitterShareButton>
                                <TelegramShareButton url={shareUrl} title={blog.title}  >
                                    <TelegramIcon size={40} round />
                                </TelegramShareButton>
                                <LinkedinShareButton url={shareUrl}>
                                    <LinkedinIcon size={40} round />
                                </LinkedinShareButton>
                                <PinterestShareButton url={shareUrl} media={`${DOMAIN}/images/seoblog.jpg`} >
                                    <PinterestIcon size={40} round />
                                </PinterestShareButton>
                                <PinterestShareCount url={shareUrl} className="btn btn-light" />
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Index.getInitialProps = () => {
    let skip = 0;
    let limit = 5;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        console.log('Data:', data)
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default withRouter(Index);
