import React from 'react'
import Table from 'react-bootstrap/Table';

const User = ({id,email,name,onDelete}) => {


  const handleDelete = () => {
    onDelete(id)
  }


  return (
    <>
        {/* <span>{name}</span>
        <span>{email}</span>
        <span>
            <button onClick={handleDelete}>DELETE</button>
        </span> */}


        {/* <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody> */}
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          
        </tr>
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        </tbody>
        </Table> */}







    </>
  )
}

export default User