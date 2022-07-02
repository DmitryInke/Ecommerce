import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then(c => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map(c => (
      <div
        key={c._id}
        className="btn btn-outline-secondary btn-lg btn-raised my-button shadow bg-white m-3"
      >
        <Link className="h3" to={`/category/${c.slug}`}>
          {c.name}
        </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <>
            {' '}
            <h4>
              Loading... <span className="spinner-border text-info"></span>
            </h4>
          </>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
