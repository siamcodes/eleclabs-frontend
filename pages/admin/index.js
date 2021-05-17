import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import BlogRead from '../../components/crud/BlogRead';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-3">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-3">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a><i class="bi bi-plus-circle"></i> Create Category</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a><i class="bi bi-plus-circle"></i> Create Tag</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <a href="/admin/crud/blog"><i class="bi bi-plus-square-fill"></i> Create Blog</a>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/blogs">
                                     <a><i class="bi bi-pencil-square"></i> Update/Delete Blogs</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a><i class="bi bi-person-lines-fill"></i> Update Profile</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-9">
                            <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;
