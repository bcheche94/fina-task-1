import React from 'react'

const CreateNewPostComp = ({CreateNewPost}) => {

  const handleOnSubmit = (e) => {
    e.preventDefault()
    CreateNewPost(e.target.title.value,e.target.body.value)
    e.target.title.value = ""
    e.target.body.value = ""
    
  }



  return (
    <div>

        <form onSubmit={handleOnSubmit}>
        <p>MAKE NEW POST</p>
        <input placeholder='title' name='title' />
        <input placeholder='body' name='body' />
        
        <button onSubmit={handleOnSubmit}>CREATE NEW POST</button>



        </form>

    </div>
  )
}

export default CreateNewPostComp