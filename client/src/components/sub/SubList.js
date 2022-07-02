import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then(res => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map(s => (
      <div
        key={s._id}
        className="btn btn-outline-secondary btn-lg btn-raised my-button shadow bg-white m-3"
      >
        <Link className="h3" to={`/sub/${s.slug}`}>
          {s.name}
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
          showSubs()
        )}
      </div>
    </div>
  );
};

export default SubList;
