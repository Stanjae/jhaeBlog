import React from 'react'

const MailingListForm = () => {
  return (
    <form action={''} >
      <div className="relative gap-x-2 flex items-center">
          <input
              type="email"
              placeholder="Enter email"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          />
          <button className=' rounded-e-md py-3 bg-primary hover:bg-primary/85 transition-colors duration-500 text-white px-6'>Join</button>
      </div>
    </form>
  )
}

export default MailingListForm
