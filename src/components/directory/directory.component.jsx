import React from 'react'
import PropTypes from 'prop-types'
import './directory.style.scss';
import CategoryItem from '../category-item/category-item.component';


const Directory = ({categories}) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  )
}

Directory.propTypes = {}

export default Directory