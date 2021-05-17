import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';
import BlogRead from '../../components/crud/BlogRead';
import { isAuth } from '../../actions/auth';

const UserIndex = () => {
    const username = isAuth() && isAuth().username;

    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-2 pb-2">
                            <h2>User Dashboard</h2>
                        </div>
                        <div className="col-md-3">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <a href="/user/crud/blog"><i class="bi bi-plus-square-fill"></i> Create Blog</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/crud/blogs">
                                        <a><i class="bi bi-pencil-square"></i>  Update/Delete Blog</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <a href="/user/update"><i class="bi bi-person-lines-fill"></i> Update profile</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-9">
                            <BlogRead username={username} />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserIndex;
