import { useState,useEffect } from 'react'
import './App.css'
import User from './components/User'
import AddUser from './components/AddUser'
import Post from './components/Post'
import CreateNewPostComp from './components/CreateNewPostComp'
import Todo from './components/Todo'
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





function App() {

  const [users,setUsers] = useState([])
  const [posts,setPosts] = useState([])
  const [currentComment,setCurrentComment] = useState([])
  const [todos,setTodos] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    fetchData()
    fetchPosts()
    fetchTodos()

  },[])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.json())
    .then((data)=>setUsers(data))
    .catch((err)=>console.log(err))
  }

  const fetchPosts = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>res.json())
    .then((data)=>setPosts(data))
    .catch((err)=>console.log(err))
  }

  const fetchTodos = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res)=>res.json())
    .then((data)=>setTodos(data))
    .catch((err)=>console.log(err))
  }

  const onAdd = async (name,email) => {
    
    await fetch('https://jsonplaceholder.typicode.com/users',
      {
        method:'POST',
        body: JSON.stringify({
          name:name,
          email:email
        }),
        headers:{
          "Content-type":"application/json; charset=UTF-8"
        }
      }
    )
    .then((res)=>{
      if(res.status !== 201){
        return
      }else{
        
        return res.json()
      }
    })
    .then((data)=>{
      
      data = {
        name:name,
        email:email,
        id:Math.floor(1000 + Math.random() * 9000)
      }
      setUsers((users)=>[...users,data])
    })
    .catch((err)=>{console.log(err)})
  }

  const CreateNewPost = async (title,body) => {
    
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res)=>{
      if(res.status !== 201){
        return
      }else{
        
        return res.json()
      }
    })
    .then((data)=>{
      
      data = {
        title:title,
        body:body,
        id:Math.floor(1000 + Math.random() * 9000)
      }
      setPosts((posts)=>[...posts,data])
      
      console.log(`created post with ID number ${data.id}`)
    })
    .catch((err)=>{console.log(err)})
  }

  const CreateNewTodo = async (is_completed,todo_title,id,userId) => {
    
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        completed: false,
        id: 1,
        userId: 1,
        title:'lork'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res)=>{
      if(res.status !== 201){
        return
      }else{
        
        return res.json()
      }
    })
    .then((data)=>{
      
      data = {
        id:Math.floor(1000 + Math.random() * 9000),
        completed:is_completed,
        title:todo_title,
        userId:1
      }
      setTodos((todos)=>[...todos,data])
      
      console.log(`created new TODO with ID number ${data.id}`)
      
    })
    .catch((err)=>{console.log(err)})
  }

  const handleNewTodo = (e) => {
    e.preventDefault()
    CreateNewTodo(e.target.is_completed.value,e.target.todo_title.value)
    e.target.is_completed.value = ''
    e.target.todo_title.value = ''
  }

  const handleUpdateTodo = (e) => {
    e.preventDefault()
    updateTodo(e.target.todo_id.value,e.target.update_todo_completed.value,e.target.update_todo_title.value)
    e.target.todo_id.value = ''
    e.target.update_todo_completed.value = ''
    e.target.update_todo_title.value = ''
  }

  const updateTodo = async (paramID,is_completed,title) => {

    const paramIDorig = paramID

    if(paramID >= 1 && paramID <= 200) {

    } else {
      paramID = Math.floor(parseInt(paramID)/100)
    }

    await fetch(`https://jsonplaceholder.typicode.com/todos/${paramID}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: paramID,
        title: title,
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      // .then((json) => console.log(json))
      .catch((err)=>{console.log(err)})

    todos.forEach(element => {
      if(element.id === parseInt(paramIDorig)){
        
        setTodos(todos.filter((todo)=>{return todo.id !== element.id}))
        const newentry = {
          completed:is_completed,
          id:element.id,
          userId:1,
          title:title
        }
        setTodos((todos)=>[...todos,newentry])
        console.log(`updated todo with ID number ${element.id}, title changed to '${newentry.title}'`)
      }
    });

  }

  const handleSubmitNewForm = (e) => {
    e.preventDefault()
    anotherfunc(e.target.unique_name.value,e.target.update_post_body.value,e.target.update_post_title.value)
    e.target.unique_name.value = ''
    e.target.update_post_body.value = ''
    e.target.update_post_title.value = ''
  }

  const anotherfunc = async (paramID,body,title) => {

    const paramIDorig = paramID

    if(paramID >= 1 && paramID <= 100) {

    } else {
      paramID = Math.floor(parseInt(paramID)/100)
    }

    await fetch(`https://jsonplaceholder.typicode.com/posts/${paramID}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: paramID,
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      // .then((json) => console.log(json))
      .catch((err)=>{console.log(err)})

    posts.forEach(element => {
      if(element.id === parseInt(paramIDorig)){
        
        setPosts(posts.filter((post)=>{return post.id !== element.id}))
        const newentry = {
          body:body,
          id:element.id,
          userId:10,
          title:title
        }
        setPosts((posts)=>[...posts,newentry])
        console.log(`updated post with ID number ${element.id}, body changed to '${newentry.body}', title changed to '${newentry.title}'`)
      }
    });
  }

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method:"DELETE"
      }
    )
    .then((res) => {
      if(res.status !== 200){
        return
      } else {
        setUsers(users.filter((user)=>{return user.id !== id}))
      }
    })
    .catch((err)=>{console.log(err)})
  }

  const deletePost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method:"DELETE"
      }
    )
    .then((res) => {
      if(res.status !== 200){
        return
      } else {
        setPosts(posts.filter((post)=>{return post.id !== id}))
        console.log(`deleted post with ID number ${id}`)
      }
    })
    .catch((err)=>{console.log(err)})
  }

  const deleteTodo = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method:"DELETE"
      }
    )
    .then((res) => {
      if(res.status !== 200){
        
        return
      } else {
        
        setTodos(todos.filter((todo)=>{return todo.id !== id}))
        console.log(`deleted todo with ID number ${id}`)
      }
    })
    
    .catch((err)=>{console.log(err)})
  }

  const fetchComments = async (id) => {
    console.log(`fetching comment data of post with ID ${id}`)
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((response) => response.json())
    .then((data)=>{handleShow(),setCurrentComment(data),console.log(data)})
    
  }


  const handleOnSubmitCreateNewPost = (e) => {
    e.preventDefault()
    CreateNewPost(e.target.title.value,e.target.body.value)
    e.target.title.value = ""
    e.target.body.value = ""
    
  }




  
  return (
    <>

      <h1 className='display-1'>Fina Task 1</h1>

      <Container className='mb-5'>
      
      <Row className='m-5'>

        <Col>

        <h2 className='mb-4'>Update Existing Post</h2>

        <Form onSubmit={handleSubmitNewForm}>
        <Form.Group className="mb-3" controlId="post_identifier">
          <Form.Label>Specify Post ID</Form.Label>
          <Form.Control type="text" name='unique_name' placeholder="Enter post identifier" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="post_body_update">
          <Form.Label>Update Post Body</Form.Label>
          <Form.Control name='update_post_body' type="text" placeholder="Enter body..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="post_title_update">
          <Form.Label>Update Post Title</Form.Label>
          <Form.Control name='update_post_title' type="text" placeholder="Enter title..." />
        </Form.Group>
        
        <Button onSubmit={handleSubmitNewForm} variant="primary" type="submit">
          Update
        </Button>
        </Form>
        
        </Col>

        <Col>

        <h2 className='mb-4'>Create New Post</h2>
        
        <Form onSubmit={handleOnSubmitCreateNewPost}>
        <Form.Group className="mb-3" controlId="post_title">
          <Form.Label>Post Title</Form.Label>
          <Form.Control type="text" name='title' placeholder="Enter post title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="post_body">
          <Form.Label>Post Body</Form.Label>
          <Form.Control name='body' type="text" placeholder="Enter post body" />
        </Form.Group>
        
        <Button onSubmit={handleOnSubmitCreateNewPost} variant="primary" type="submit">
          Create
        </Button>
        </Form>

        </Col>

        <Col>
        
        <h2 className='mb-4'>Create New Todo</h2>
        
        <Form onSubmit={handleNewTodo}>
        <Form.Group className="mb-3" controlId="todo_complete">
          <Form.Label>Is Completed?</Form.Label>
          <Form.Control type="text" name='is_completed' placeholder="Is todo completed?" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="todo_title">
          <Form.Label>Todo Title</Form.Label>
          <Form.Control name='todo_title' type="text" placeholder="Enter title..." />
        </Form.Group>
        
        <Button onSubmit={handleNewTodo} variant="primary" type="submit">
          Create
        </Button>
        </Form>
        
        </Col>

        </Row>

        <Row>
        
        <Col></Col>

        <Col>
        
        <h2 className='mb-4'>Update Existing Todo</h2>
        
        <Form onSubmit={handleUpdateTodo}>
        <Form.Group className="mb-3" controlId="update_todo_complete">
          <Form.Label>Is Completed?</Form.Label>
          <Form.Control type="text" name='update_todo_completed' placeholder="Is todo completed?" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="todo_id">
          <Form.Label>Specify Todo ID</Form.Label>
          <Form.Control type="text" name='todo_id' placeholder="Enter todo identifier" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="update_todo_title">
          <Form.Label>Update Todo Title</Form.Label>
          <Form.Control name='update_todo_title' type="text" placeholder="Enter title..." />
        </Form.Group>
        
        <Button onSubmit={handleUpdateTodo} variant="primary" type="submit">
          Update
        </Button>
        </Form>
        
        </Col>

        <Col></Col>

        </Row>

        </Container>

      <div>

      <h1 className='display-3'>Users Table</h1>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          
        </tr>
      </thead>
      <tbody>
      {users.map((user)=>(

      <User id={user.id} key={user.id} name={user.name} email={user.email} onDelete={onDelete} />

      )
      )
      }
        
      </tbody>
      </Table>

      </div>

      <div className='mt-5'>

      <h1 className='display-1'>All Posts</h1>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
          <th>Functions</th>
          
        </tr>
      </thead>
      <tbody>
      {posts.map((post)=>(

      <Post deletePost={deletePost} userId={post.userId} id={post.id} key={post.id} title={post.title} body={post.body} fetchComments={fetchComments} />

      )
      )
      }
        
      </tbody>
      </Table>

      </div>

      <div>

      <h1 className='display-1'>All Todos</h1>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          {/* <th>Body</th> */}
          <th>Is Completed?</th>
          <th>Functions</th>
          
        </tr>
      </thead>
      <tbody>
      {todos.map((todo)=>(

      <Todo completedd={todo.completed} deleteTodo={deleteTodo} userId={todo.userId} id={todo.id} key={todo.id} title={todo.title} />

      )
      )
      }
        
      </tbody>
      </Table>

      </div>

      <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {currentComment.map((comment)=>(
          <div className='mb-5' key={comment.id}>
            <p><strong>Author Email:</strong> {comment.email}</p>
            <p><strong>Author Name:</strong> {comment.name}</p>
            <p><strong>Comment Body:</strong> {comment.body}</p>
          </div>
          ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      </>

    </>
  )
}

export default App