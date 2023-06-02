import { VeltPresence, useVeltClient } from '@veltdev/react';
import React, { useEffect, useState } from 'react';
import { Users } from '../../users';
import Menus from '../Menus/Menus';

function Toolbar({ onMenuSelect }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const users = Users;

    const { client } = useVeltClient();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setSelectedUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [])

    useEffect(() => {
        // To call identifyVelt once Velt is loaded and user is available
        if (selectedUser && client) {
            identifyVelt();
        }
    }, [selectedUser, client])

    // To set user in Velt
    const identifyVelt = async () => {
        if (client) {
            client.identify(selectedUser).then(() => {
                // User login successful
            }).catch(() => {
                // User login failure
            });
        }
    }

    const signIn = (user) => {
        // Add custom logic here to login user
        // Once user is available call identifyVelt
        localStorage.setItem('user', JSON.stringify(user));
        setSelectedUser(user);
    }

    const signOut = async () => {
        if (client) {
            await client.signOutUser();
        }
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <div className='header'>
            <VeltPresence />
            <Menus onMenuSelect={onMenuSelect} />
            <div>
                {
                    selectedUser ?
                        <div>
                            <span>Hi, {selectedUser?.name}</span>
                            <button className='custom-btn' onClick={() => signOut()}>Sign Out</button>
                        </div>
                        :
                        <div>
                            <span>Sign In with:</span>
                            {
                                users.map((user) => {
                                    return (
                                        <button key={user.userId} className='custom-btn' onClick={() => signIn(user)}>{user?.name}</button>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Toolbar;