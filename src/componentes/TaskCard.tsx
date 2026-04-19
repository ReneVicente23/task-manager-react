import './style/TaskCard.css'
//define props como lucen

type TaskCardProps = {
    id: number;
    text: string;
    onDelete: () => void;
    completed: boolean;
    onToggle: () => void;
};
function TaskCard(props:TaskCardProps){
    return(
        <div>
        <li className={props.completed ? 'list_completed':'list'} onClick={props.onToggle}>
            {props.text}{props.completed}{/*display text*/}
        </li>
        <button className='btn2' onClick={props.onDelete}>
                Eliminar
            </button>
        </div>
    );
}

export default TaskCard;