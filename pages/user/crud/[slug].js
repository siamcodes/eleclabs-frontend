import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogUpdate from '../../../components/crud/BlogUpdate';

const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-2 pb-2">
                            <h2>Update blog</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blog;