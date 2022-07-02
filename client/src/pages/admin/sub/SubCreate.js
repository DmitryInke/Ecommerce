import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getCategories } from '../../../functions/category';
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearchForm from '../../../components/forms/LocalSearchForm';

const SubCreate = () => {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategories = () => getCategories().then(c => setCategories(c.data));

  const loadSubs = () => getSubs().then(c => setSubs(c.data));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
      })
      .catch(error => {
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async slug => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeSub(slug, user.token)
        .then(res => {
          setLoading(false);
          toast.success(`"${res.data.name}" deleted`);
          loadSubs();
        })
        .catch(error => {
          if (error.response.status === 400) {
            setLoading(false);
            toast.error(error.response.data);
          }
        });
    }
  };

  const searched = keyword => c => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <>
              {' '}
              <h4>
                Loading... <span className="spinner-border text-info"></span>
              </h4>
            </>
          ) : (
            <h4>Create sub category</h4>
          )}
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={e => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map(c => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
          <LocalSearchForm keyword={keyword} setKeyword={setKeyword} />
          {subs.filter(searched(keyword)).map(c => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
