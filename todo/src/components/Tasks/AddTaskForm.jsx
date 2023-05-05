import React, { useState } from 'react';
import axios from "axios";

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({list, onAddTask}) =>{
	const [visibleForm, setVisibleForm] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsloading] = useState(false);

	const addTask = () => {
		if (!inputValue) {
			alert('Enter task\'s name!');
			return;
		}
		setIsloading(true) //for change text of btn
		const tasksObj = {
			"listId": list.id,
			"text": inputValue
		};
		//add tasks to new obj (save into BE)
		axios
			.post('http://localhost:3001/tasks',tasksObj)
			.then(({data})=>{
				onAddTask(list.id, data);//use data (response from BE, because it contain id, unlike tasksObj)
			
		
		// onClose();//close if get positive res
			})
			.catch(()=>{
				alert("Error! Try later")
			})
			.finally(()=>{
			//for default text of load btn
			setIsloading(false)
			onClose()
		});
	}
	const onClose = () => {
		setVisibleForm(false);
    	setInputValue('');
	}
  return (
	<div className="task__form">
		{!visibleForm ? (
			<div className="add_task" onClick={()=> setVisibleForm(true)}>
				<img src={addSvg} alt="add icon" />
				<span>Add new task</span>
		  </div>
		): (
			<div className="new_task">
				<input
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				className="field"
				type="text"
				placeholder="Task's name"
			/>

			
			<button disabled={isLoading} onClick={addTask} className="button">
				{isLoading ? 'Addeding...' : 'Add task'}
			</button>
			<button onClick={onClose} className="button btn__gray">Cancel
			</button>

			</div>
		)}

	</div>
	  
  )
}
export default AddTaskForm;