import React from 'react'
import Button from 'react-bootstrap/Button';

const Todo = ({completedd,userId,id,title,completed,deleteTodo}) => {


  const handleDeleteTodo = () => {
    deleteTodo(id)
  }



  return (
    <>
        {/* <span>{title}</span> */}
        {/* <span>{body}</span> */}
        {/* <span>{id}</span> */}

        {/* <span>

            <button onClick={handleDeleteTodo}>DELETE</button>

        </span> */}



        <tr>
          <td>{id}</td>
          <td>{title}</td>
          <td>{String(completedd)}</td>
          {/* <td>{body}</td> */}
          <td>
            {/* <Button className='mb-1' size='sm' onClick={handleFetchComments} variant="primary">Fetch Comments</Button>{' '} */}
            <Button size='sm' onClick={handleDeleteTodo} variant="danger">Delete</Button>{' '}
          </td>
          
        </tr>
        
    </>
  )
}

export default Todo