import React, { useState, useRef } from 'react'
import axios from "axios";

import removeSvg from '../../assets/img/remove.svg'
import editSvg from '../../assets/img/edit.svg'
import saveSvg from '../../assets/img/check-black.svg'

const Task =({listId, task, onRemove, onEdit}) => {
	const [inputValue, setInputValue] = useState(task.text);
	const [isReadonly, setIsReadonly] = useState(true);
	const [isActive, setIsActive] = useState(false);
	const [editIcon, setEditIcon] = useState(editSvg);
	const [inputStyle, setInputStyle] = useState({'borderColor': 'black'});

	const textInput = useRef(null);
	const removeTask = item => {
		if (window.confirm('Are you sure want delete this task?')) {
			//send request to delete task by id
			axios.delete("http://localhost:3001/tasks/" + item.id).then(() => {
				onRemove(listId, item);
			}).catch(()=>{
				alert("Sorry, we have some problem. Try again later")
			})
			  
		}
	};
	const editTask = () => {
		textInput.current.focus()
		if(!inputValue) {
			setInputStyle({'borderColor': 'red'})
			return
		}
		setIsReadonly(prevState => !prevState) //change input visiable
		setIsActive(prevState => !prevState) //toggle active class for task
		setEditIcon(prevState => prevState===editSvg? saveSvg : editSvg) //toggle edit-save btns
		setInputStyle({'borderColor': 'black'})
		axios.patch('http://localhost:3001/tasks/' + task.id, {
				text: inputValue
			}).then(()=>{
				onEdit(listId, task.id, inputValue) //call func for save eddited task

			}).catch(()=>{
				alert("Sorry, we have some problem. Try again later")
			})
		
	};
	
	return (
		<div key={task.id} className="tasks__items-row">
			<div className="checkbox">
				<input id={`task-${task.id}`} type="checkbox" />
				<label htmlFor={`task-${task.id}`} >
				<svg
					width="11"
					height="8"
					viewBox="0 0 11 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
					d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
					stroke="#000"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					/>
				</svg>
				</label>
			</div>
			<input 
				// ref={ref => ref && ref.focus()}
				ref={textInput}
				className={isActive? 'active': ''}
				placeholder="Enter task"
				style={inputStyle}
				readOnly={isReadonly}
				value={inputValue} 
				onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
				onChange={e => setInputValue(e.target.value)}

			/>
    
			<div className={isActive? 'task__btns active': 'task__btns '} >
				<img 
					src={editIcon} 
					alt="edit icon" 
					onClick={editTask}
				/>
				<img 
					src={removeSvg} 
					alt="remove icon" 
					onClick={() => removeTask(task)}
				/>
				
			</div>
		</div>
	)
}
export default Task