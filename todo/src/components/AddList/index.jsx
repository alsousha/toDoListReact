import React, { useEffect, useState } from 'react';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge';


import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false); //in first useState get for visiblePopup false
  const [seletedColor, selectColor] = useState(3);
  const [isLoading, setIsloading] = useState(false);
  const [inputValue, setInputValue] = useState('');

//   const textInput = useRef(null);
  useEffect(()=>{
	//check is colors array
	if(Array.isArray(colors)){
		selectColor(colors[0].id)
	}
  },[colors])

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  };
 

  const addList = () => {
    if (!inputValue) {
      alert('Enter list\'s name!');
      return;
    }

	setIsloading(true) //for change text of btn
	//send object ({name: inputValue, colorId: seletedColor}) as post to server)
	axios
		.post('http://localhost:3001/lists',{name: inputValue, colorId: seletedColor})
		.then(({data})=>{
			//get name of color by id
			const color = colors.filter(c => c.id === seletedColor)[0].name;
			//data is respond from server (object thaw was created)

			//add to end of new object new attr color
			const listObj = {...data, color:{name:color}}
			onAdd(listObj);

			onClose();//close if get positive res
		})
		.catch(()=>{
			alert("Error! Try later")
		})
		.finally(()=>{
			//for default text of load btn
			setIsloading(false)
		});
  };


  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Add list'
          }
        ]}
      />
	  {/* in first visiblePopup = false. use instead if(!visiblePopup)... */}
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          />

          <input
		    // ref={textInput}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="List's name"
          />

          <div className="add-list__popup-colors">
            {colors.map(color => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={seletedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
