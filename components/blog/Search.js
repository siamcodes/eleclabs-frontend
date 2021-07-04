import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const searchedBlogs = (results = []) => {
        return (
            <div className="pt-1 mb-6 bg-light">
                {message && <p className="pt-5 text-muted font-italic">{message}</p>}

                {results.map((blog, i) => {
                    return (
                        <>
                            <div key={i}>
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a className="text-primary"><i class="bi bi-dash"></i> {blog.title}</a>
                                </Link>
                            </div>
                        </>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit} >
            <div className="input-group">
                <input type="search" className="form-control me-1" placeholder="Search" onChange={handleChange} />
                <button className="btn btn-outline-secondary" type="submit"> Search  </button>
            </div>
        </form>
    );

    return (
        <div style={{ zIndex:4000 }}>
            <div>{searchForm()}</div>
            {searched && <div style={{position: 'fixed', padding:'0px'}}>{searchedBlogs(results)}</div>}
        </div>
    );
};

export default Search;
