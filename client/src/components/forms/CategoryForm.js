import React from 'react';

const CategoryForm = ({ handleSubmit, setName, name }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        onChange={e => setName(e.target.value)}
        value={name}
        minLength={2}
        maxLength={32}
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">Create</button>
    </div>
  </form>
);

export default CategoryForm;
