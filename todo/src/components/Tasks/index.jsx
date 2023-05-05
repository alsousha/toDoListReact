import React, { useEffect, useState } from 'react';
import axios from "axios";

import AddTaskForm from './AddTaskForm';
import Task from './Task';
import editSvg from '../../assets/img/edit.svg';


import './Tasks.scss';

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onRemove, onEditTask }) => {
	// console.log(list);


	const editTitle = ()=>{
		const newTitle = window.prompt("Enter new title: ", list.name)
		if(newTitle){
			onEditTitle(list.id, newTitle)
			//send patch to server for search lists with list.id and change data 
			axios.patch('http://localhost:3001/lists/' + list.id, {
				name: newTitle
			}).catch(()=>{
				alert("Sorry, we have some problem. Try again later")
			})
		}

	}
	
  return(
    <div className="tasks">
      <h2 
	  	className="tasks__title"
		style={{color: list.color.hex}}
	  >
        {list.name}
        <img 
			src={editSvg} alt="Edit icon" 
			onClick={editTitle}
		/>
      </h2>
	  {!list.tasks.length && !withoutEmpty && <h3>tasks list is empty</h3>}	
      <div className="tasks__items">
		
		{list.tasks.map(task=>(
			<Task 
				key={task.id} 
				listId={list.id} 
				task={task} 
				onRemove={onRemove}
				onEdit={onEditTask}
			/>
		))}
        
      </div>
	  <AddTaskForm list={list} onAddTask={onAddTask}/>
	  
	  
    </div>
  );
};

export default Tasks;
