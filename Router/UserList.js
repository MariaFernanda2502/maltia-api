import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './userList.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
  } from 'react-router-dom';
function UserList(props) {
    const [status,setStatus] = useState('idle');
    const [users,setUsers] = useState([]);
    useEffect(() =>{
        setStatus('loading')
        axios.get('http://localhost:5000/analista')
        .then((result) =>{
            setStatus('resolved');
            setUsers(result.data.data)
        })
        .catch((error) =>{})
    },[])

    if (status === 'idle' || status === 'loading') {
        return <h1>Cargando....</h1>
    }
    if (status === 'error') {
        <h1>Hubo un error</h1>
    }
    if (status === 'resolved') {
        
    
        return (
            <section className="Page">
                <ul>
                    
                    <li>
                        Crear nuevo usuario
                    </li>
                    {users.length > 0 && users.map((user) =>{
                        return(
                            <li key={user.id}>
                                <Link to={`/users/${user.id}`}>
                                {user.nombre}
                                </Link>
                            </li> 
                        )
                    })}
                </ul>
            </section>
        )
    }
}
export default UserList;
