import React, { useState } from 'react';
import axios from "axios";

import removeSvg from '../../assets/img/remove.svg';

import Badge from '../Badge';

import './List.scss';

const List = ({ items, isRemovable, onClick, onClickItem, onRemove, activeItem }) => {
  const removeList = item => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
		//send request to delete list by id
		axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
			onRemove(item.id);
        });
      	
    }
  };
  //className={classNames(item.className, { active: item.active })}

  return (
    <ul onClick={onClick} className="list">
      {items && items.map((item, index) => (
		
        <li
          key={index}
          className={activeItem && item.id===activeItem.id? 'active' : '' || item.className}
		  onClick={onClickItem ? ()=>onClickItem(item) : null}
		
		>
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
			{item.name}
			{item.tasks && ` (${item.tasks.length}) `}
			</span>
		  
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
