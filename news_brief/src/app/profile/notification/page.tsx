import Notification from '@/components/notification_component/notification'
import Sidebar from '@/components/siderbar/profile'
import React from 'react'

const page = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className='p-8 flex-1'>
        <Notification />
      </div>
    </div>
  );
}

export default page
