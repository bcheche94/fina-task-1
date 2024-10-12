import React from 'react'
import Button from 'react-bootstrap/Button';

const Post = ({userId,id,title,body,fetchComments,deletePost}) => {


  const handleFetchComments = () => {
    fetchComments(id)
  }

  const handleDeletePost = () => {
    deletePost(id)
  }



  return (
    <>
        {/* <span>{title}</span> */}
        {/* <span>{body}</span> */}
        {/* <span>{id}</span> */}
        {/* <span>

            <button onClick={handleFetchComments}>fetch comments</button>

        </span> */}

        {/* <span>

            <button onClick={handleDeletePost}>DELETE</button>

        </span> */}



        <tr>
          <td>{id}</td>
          <td>{title}</td>
          <td>{body}</td>
          <td>
            <Button className='mb-1' size='sm' onClick={handleFetchComments} variant="primary">Fetch Comments</Button>{' '}
            <Button size='sm' onClick={handleDeletePost} variant="danger">Delete</Button>{' '}
          </td>
          
        </tr>
        
    </>
  )
}

export default Post