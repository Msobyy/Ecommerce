import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const UserLayout = ({children,title}) => {
  return (
    <Layout title={title}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
           {children}
        </div>
        
      </div>
    </div>
  </Layout>
  )
}

export default UserLayout