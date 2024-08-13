import React from 'react'

const Author = async({ params : {uid}}:{ params: { uid: string } }) => {
    console.log(uid)
  return (
    <div>
      <h2>Author Page</h2>
    </div>
  )
}

export default Author
