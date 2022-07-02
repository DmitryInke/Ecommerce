import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  color: '',
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);

  const { user } = useSelector(state => ({ ...state }));
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // router
  const { slug } = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProduct = () => {
    getProduct(slug).then(p => {
      // 1 load single proudct
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then(res => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      arr = p.data.subs.map(s => s._id);
      setArrayOfSubs(prev => arr); // required for ant design select to work
    });
  };

  const loadCategories = () =>
    getCategories().then(c => {
      setCategories(c.data);
    });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then(res => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        navigate('/admin/products');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = e => {
    e.preventDefault();
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then(res => {
      setSubOptions(res.data);
    });

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <>
              {' '}
              <h4>
                Loading... <span className="spinner-border text-info"></span>
              </h4>
            </>
          ) : (
            <h4>Product update</h4>
          )}

          <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
