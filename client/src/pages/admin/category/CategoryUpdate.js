import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = () => {
  const { user } = useSelector(state => ({ ...state }));
  const { slug } = useParams();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getCategory(slug).then(c => setName(c.data.category.name));
  }, [slug]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/category');
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
            <h4>Update category</h4>
          )}
          <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
