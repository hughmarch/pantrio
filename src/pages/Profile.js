import React, {useState} from 'react';

function Profile({ onChangeUsername, startUsername }) {
  const [username, setUsername] = useState(startUsername)

  return (
    <div>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={e => onChangeUsername(username)}>Set username</button>
    </div>
  )
}

export default Profile;