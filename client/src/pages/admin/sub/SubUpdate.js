import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from '../../../functions/category';
import { updateSub, getSub } from '../../../functions/sub';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = () => {
  const { user } = useSelector(state => ({ ...state }));
  const { slug } = useParams();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategories = () => getCategories().then(c => setCategories(c.data));

  const loadSub = () =>
    getSub(slug).then(s => {
      setName(s.data.sub.name);
      setParent(s.data.sub.parent);
    });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/sub');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };
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
            <h4>Update Sub</h4>
          )}
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={e => {
                setParent(e.target.value);
              }}
              value={parent}
            >
              {categories.length > 0 &&
                categories.map(c => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
