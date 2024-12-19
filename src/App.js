import { useState} from 'react'
import './App.css'


const App = function() {
  const [taskList, setTaskList] = useState([]);
  const [detail, setDetail] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filter, setFilter] = useState(taskList);
  const [openedTask, setOpenedTask] = useState(null);

  const [deleted, setDeleted] = useState(0);
  const [completed, setCompleted] = useState(0);


  const handleTaskLists = function (tas) {
    setTaskList(curr => [tas, ...curr]);
    setFilterType('all');
  }

  const handleDeleteTasks = function (id) {
    setTaskList(curr => curr.filter(el => el.id !== id))
    setFilter(curr => curr.filter(el => el.id !== id))
    setDeleted(curr => curr += 1);
    if (openedTask === id) setOpenedTask(null);
  }

  const handleCompleteTasks = function (id) {
    setTaskList(curr => curr.filter(el => el.id !== id))
    setFilter(curr => curr.filter(el => el.id !== id))
    setCompleted(curr => curr += 1);
    if (openedTask === id) setOpenedTask(null);

  }


  const handleFilter = function (value) {
    if (value === 'all') setTaskList(curr => curr = taskList);
    else setFilter(curr => taskList.filter(el => el.taskType === value))

    setFilterType(curr => curr = value);
  }


  const handleDetails = function (task, id) {
    if (openedTask === id) {
      setDetail(null)
      setOpenedTask(null)
    } else{
      setDetail(curr => curr = task);
      setOpenedTask(id)
    }
  }

  const closeDetail = function() {
    setDetail(curr => curr = null)
    setOpenedTask(null)
  }

  const handleClearAll = function () {
    setTaskList([]);
    setFilter([]);
    setDeleted(0);
    setCompleted(0);
    setOpenedTask(null);
    setDetail(null);
  }



  
  return (
    <div className="container">
      <Left onHandleTaskList={handleTaskLists} />

      <Right tasks={taskList} onHandleDeleteTasks={handleDeleteTasks} onHandleCompleteTasks={handleCompleteTasks}>
          <TaskFilter onHandleFilter={handleFilter} filterType={filterType} filtered={taskList}/>

          <TaskPreview tasks={filterType === "all" ? taskList : filter} onHandleDeleteTasks={handleDeleteTasks} onHandleCompleteTasks={handleCompleteTasks} onHandleDetails={handleDetails}
          onCloseDetail={closeDetail}
          openedTask={openedTask}
          
          />
          <TaskDetal tasks={detail} onCloseDetail={closeDetail} onHandleDeleteTasks={handleDeleteTasks} onHandleCompleteTasks={handleCompleteTasks}/>
      </Right>

      <Bottom tasks={taskList} deleted={deleted} completed={completed} onHandleClearAll={handleClearAll}/>      
    </div>
  )
}


// TODO: The top level layout
const Right = function ({children}) {
  
  return (
    <div className='right'>
      { children }

    </div>

  )
}

const Left = function ({onHandleTaskList}) {

  return (
    <div className='left'>
      <Hero />
      <Form onHandleTaskList={onHandleTaskList}/>

    </div>
  )
}

const Bottom = function ({tasks, deleted, completed, onHandleClearAll}) {

  return (
    <div className='bottom'>
      <Status tasks={tasks} completed={completed} deleted={deleted} onHandleClearAll={onHandleClearAll}/>

    </div>
  )
}

// TODO: Layout on the left sides
const Hero = function () {

  return (
    <div className="hero-container">
      <h1>Todo-List</h1>
      <p>Make Your Life Easier With Us </p>
    </div>
  )
}


const Form = function ({onHandleTaskList}) {
  const [task, settask] = useState(``);
  const [taskType, setTaskType] = useState('Work');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');





  const handleInput = function(e) {
    e.preventDefault();
    if (task !== "" && date !== "" && message !== "") {
      const tasDic = {
        task: task,
        taskType: taskType,
        date: date,
        message: message,
        id: Date.now(),
        complete: false
      }
      onHandleTaskList(tasDic)
      settask('');
      setTaskType('work');
      setDate('');
      setMessage('')
    }
  }

  



  return (
    <form className='form-container' onSubmit={handleInput}>
      <div className='text-inp'>
        <input type='text' className='inp' value={task} onChange={(e) => settask(e.target.value)} placeholder='Enter Task'/>
      </div>

      <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
        <option>Work</option>
        <option>Personal</option>
        <option>Education</option>
        <option>Birthday</option>
        <option>Wishlist</option>
      </select>

      <input className='date-inp' type='date' value={date} onChange={(e) => {
        setDate(e.target.value)
      }}/>
      <textarea name="Your Messsage" id="" placeholder='Your message' value={message}
      onChange={e => setMessage(e.target.value)}></textarea>
      <button>Add Task</button>
    </form>
  )
}

//////////////////////////////////////////////////////////////////////////
// TODO: Layout on the right sides

const TaskFilter = function ({onHandleFilter, filterType, filtered}) {

  return (
    <div className='task-filter'>
      <button style={filterType === 'all' && filtered.length !== 0 ? {backgroundColor: 'orange', color: '#f7f7f7'} : {}} onClick={() => onHandleFilter('all')}>All</button>
      <button style={filterType === 'Personal' && filtered.length !== 0 ? {backgroundColor: 'orange', color: '#f7f7f7'} : {}} onClick={() => onHandleFilter('Personal')}>Personal</button>
      <button style={filterType === 'Work' && filtered.length !== 0 ? {backgroundColor: 'orange', color: '#f7f7f7'} : {}} onClick={() => onHandleFilter('Work')}>Work</button>
      <button style={filterType === 'Education' && filtered.length !== 0 ? {backgroundColor: 'orange', color: '#f7f7f7'} : {}} onClick={() => onHandleFilter('Education')}>Education</button>
      <button style={filterType === 'Birthday' && filtered.length !== 0 ? {backgroundColor: 'orange', color: '#f7f7f7'} : {}} onClick={() => onHandleFilter('Birthday')}>Birthday</button>
      <button style={filterType === 'Wishlist' && filtered.length !== 0 ? {backgroundColor: 'orange', color: '#f7f7f7'} : {}} onClick={() => onHandleFilter('Wishlist')}>Wishlist</button>


    </div>
  )
}

const TaskPreview = function ({tasks, onHandleDeleteTasks, onHandleCompleteTasks, onHandleDetails, onCloseDetail, openedTask}) {


  return (
    <div className='task-preview'>
     
      {
        tasks.length === 0 ? <p className='pre'>Task Preview</p> :
        tasks.map((el, i) => {
          return (
              <div className={`prev-task ${openedTask === el.id ? 'opened-task' : ""} `} key={i}>
                <input type='checkbox' value={el.complete} onChange={ () => onHandleCompleteTasks(el.id)}/>
                <button onClick={() => onHandleDeleteTasks(el.id)} className='delete-task'>&times;</button>
                <p style={el.complete ? {textDecoration: 'line-through'}: {}} >{el.task}</p>
                <button className='detail-btn' onClick={() => onHandleDetails(el, el.id)}>Detail</button>
             </div>
          )
        } )
      }
    </div>
  )
}

const TaskDetal = function ({tasks, onCloseDetail, onHandleDeleteTasks, onHandleCompleteTasks }) {

  return (
    <div className='task-detail'>
     {
      
      !tasks ? <p className='pre'> Task Detail</p> :  (
          <>
          <button className='close-detail' onClick={onCloseDetail}>X</button>
          <div className='first-detail'>
            <p>STATUS : <span>{tasks.taskType}</span> </p>
            <p>DATE : <span>{tasks.date}</span> </p>
          </div>
   
         <div className='second-detail'>
          <span>Message</span>
          <p>{tasks.message}</p>
         </div>
         <div className='detail-action'>
          <button className='delete-btn' onClick={() => onHandleDeleteTasks(tasks.id)}>
            Delete Task
          </button>

          <button className='complete-btn' onClick={() => onHandleCompleteTasks(tasks.id)}>
            Complete Task
          </button>

         </div>
        </>
      )
      
    }
    </div>
  )
}

//////////////////////////////////////////////////////////////////////////
// Layout on the botttom side

const Status = function ({tasks, deleted, completed, onHandleClearAll}) {
  

  return (
    <div className='status-container'>
      <div className='task-status'>
        <p>Total Tasks <span>{tasks.length}</span></p>
        <p>Completed Tasks <span>{completed}</span></p>
        <p>Deleted Tasks <span>{deleted}</span></p>
        <p>Completion Rate <span>{tasks.length !== 0 ?`${Math.trunc((completed * 100) / tasks.length)}%` : '0%'}</span></p>
      </div>

      <div className='status-set'>
        <button onClick={onHandleClearAll}> Clear All</button>
      </div>
    </div>
  )
}

export default App;