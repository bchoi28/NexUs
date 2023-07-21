import './NetworkPage.css';
import FeedNavBar from '../FeedNavBar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllConnectionRequests, fetchAllConnections, getConnectionRequests, getConnections } from '../../store/connection';
import ConnectionRequestItem from './ConnectionRequestItem';
import ConnectionItem from './ConnectionItem';

const NetworkPage = () => {
    const dispatch = useDispatch();
    const connectionRequests = Object.entries(useSelector(getConnectionRequests));
    const connectionRequestsList = connectionRequests?.map(([id, connectionRequest]) => {
        return <ConnectionRequestItem id={id} connectionRequest={connectionRequest} key={id} />
    })
    const connections = Object.values(useSelector(getConnections));
    const connectionsCount = connections?.length;
    const connectionsList = connections?.map(connection => {
        return <ConnectionItem connection={connection} key={connection.user.id} />
    })

    useEffect(() => {
        dispatch(fetchAllConnectionRequests())
        dispatch(fetchAllConnections());
    }, [])

    // if (!connectionRequests.length) {
    //     return <div>Loading connections...</div>
    // }

    const loadingRequests = !connectionRequests.length ? <div>Loading connections...</div> : null;
    const loading = !connections.length ? <div>Loading connections...</div> : null;

    return (
        <div className='network-page-container'>
            <header className='feed-navbar-container'>
                <FeedNavBar />
            </header>
            <div className='network-main-container'>
                <div className='network-left-container'>
                    <div className='manage-network'>
                        <div className='manage-network-title'>Manage my network</div>
                        <div className='manage-network-item'>
                            <i className="fa-solid fa-user-group"></i>
                            <span>Alliances</span>
                            <span className='manage-network-number'>{connectionsCount}</span>
                        </div>
                        <div className='manage-network-item'>
                            <i className="fa-solid fa-address-book"></i>
                            <span>Contacts</span>
                            <span className='manage-network-number'>13</span>
                        </div>
                        <div className='manage-network-item'>
                            <i class="fa-solid fa-user"></i>
                            <span>Following & Followers</span>
                            <span className='manage-network-number'>20</span>
                        </div>
                        <div className='manage-network-item'>
                            <i className="fa-solid fa-people-group"></i>
                            <span>Groups</span>
                            <span className='manage-network-number'>9</span>
                        </div>
                        <div className='manage-network-item'>
                            <i className="fa-solid fa-calendar-days"></i>
                            <span>Events</span>
                            <span className='manage-network-number'>2</span>
                        </div>
                        <div className='manage-network-item'>
                            <i className="fa-solid fa-file-lines"></i>
                            <span>Pages</span>
                            <span className='manage-network-number'>65</span>
                        </div>
                        <div className='manage-network-item'>
                            <i className="fa-solid fa-newspaper"></i>
                            <span>Newsletters</span>
                            <span className='manage-network-number'>4</span>
                        </div>
                        <div className='manage-network-item'>
                            <i className="fa-solid fa-hashtag"></i>
                            <span>Hashtags</span>
                            <span className='manage-network-number'>7</span>
                        </div>
                    </div>
                </div>
                <div className='network-right-container'>
                    <div className='network-invitations-container'>
                        <div className='manage-invitations-title'>Invitations</div>
                        <div>{loadingRequests}</div>
                        {connectionRequestsList}
                    </div>
                    <div className='network-connections-container'>
                        <div className='manage-invitations-title'>Alliances</div>
                        <div>{loading}</div>
                        <div className='connections-list-container'>
                            {connectionsList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NetworkPage;