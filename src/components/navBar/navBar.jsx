import {HomeOutlined, 
    BulbOutlined, 
    BulbFilled, 
    AppstoreOutlined,
    SearchOutlined,
    UserOutlined,
    MailOutlined,
    BellOutlined
} from '@ant-design/icons'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/darkModeContext'
import { AuthContext } from '../../context/authContext'
import './navBar.scss'

export default function NavBar() {
    const {darkMode, toggle} = useContext(DarkModeContext);
    const {currentUser, logout} = useContext(AuthContext);
    const [userActionDisplay, setUserActionDisplay] = useState('none');
    const navigate = useNavigate();

    function handleClick() {
        logout();
        navigate('/login');
    }

    return (
        <div className='nav-bar'>
            <div className="left">
                <Link to='/'>
                    <span>lamasocial</span>
                </Link>
                <HomeOutlined/>
                {darkMode ?  <BulbFilled onClick={toggle}/> : <BulbOutlined onClick={toggle} /> }
                <AppstoreOutlined />
                <div className="search">
                    <SearchOutlined />  
                    <input type="text" placeholder='search....' />
                </div>
            </div>
            <div className="right">
            <UserOutlined onClick={() => navigate(`/profile/${currentUser.userId}`)}/>
            <MailOutlined />
            <BellOutlined />
            <div className="user" onClick={() => setUserActionDisplay(prev => prev === 'none' ? 'block' : 'none')}>
                <img src={currentUser.profilePic}/>
                <span>{currentUser.name}</span>
                <div className="user-action" style={{display: userActionDisplay}} onClick={handleClick}>
                    logout
                </div>
            </div>
            </div>
        </div>
    )
}