import './navBar.scss';
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

export default function NavBar() {
    const {darkMode,toggle} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);

    return (
        <div className='nav-bar'>
            <div className="left">
                <Link to='/'>
                    <span>lamasocial</span>
                </Link>
                <i className='iconfont home-icon'>&#xe6b8;</i>
                {darkMode ? <i className="iconfont moon" onClick={toggle}>&#xe635;</i> : <i className="iconfont moon" onClick={toggle}>&#xe625;</i>}
                <i className="iconfont function">&#xe84a;</i>
                <div className="search">
                    <i className="iconfont search-icon">&#xe651;</i>
                    <input type="text" placeholder='search....' />
                </div>
            </div>
            <div className="right">
            <i className="iconfont profile">&#xe623;</i>
            <i className="iconfont email">&#xe61c;</i>
            <i className="iconfont remind">&#xe627;</i>
            <div className="user">
            <img src={currentUser.profilePic}/>
                <span>{currentUser.name}</span>
            </div>
            </div>
        </div>
    )
}