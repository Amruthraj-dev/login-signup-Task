import React from 'react'

const UserProfile = ({showProfile, user}) => {
  return (

<div className="card">
    <h2>User Profile</h2>
        {showProfile && user && (
          <div className="profile-card">
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
          </div>
        )}
      </div>
  )
}

export default UserProfile
