import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './leftBar.scss';
import Friends from '../../assets/imgs/泡泡.png';
import Groups from '../../assets/imgs/蛋糕.png';
import Gallery from '../../assets/imgs/相机.png';
import Watch from '../../assets/imgs/眼睛.png';
import Memories from '../../assets/imgs/闹钟.png';
import Market from '../../assets/imgs/购物.png';
import Events from '../../assets/imgs/风筝.png';
import Gaming from '../../assets/imgs/纸飞机.png';
import Video from '../../assets/imgs/礼花.png';
import Message from '../../assets/imgs/对话框.png';
import Fundraiser from '../../assets/imgs/花.png';
import Tutorials from '../../assets/imgs/彩铅.png';
import Courses from '../../assets/imgs/煎蛋.png';

export default function LeftBar() {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className='left-bar'>
            <div className="container">
                <div className="menu">
                    <div className="user">
                    <img src={currentUser.profilePic}/>
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <img src={Friends}/>
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups}/>
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market}/>
                        <span>Market</span>
                    </div>
                    <div className="item">
                        <img src={Watch}/>
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories}/>
                        <span>Memories</span>
                    </div>
                    
                </div>
                <hr/>
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Events}/>
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming}/>
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery}/>
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Video}/>
                        <span>Video</span>
                    </div>
                    <div className="item">
                        <img src={Message}/>
                        <span>Message</span>
                    </div>
                </div>
                <hr/>
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Fundraiser}/>
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <img src={Tutorials}/>
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses}/>
                        <span>Courses</span>
                    </div>
                </div>
            </div>
        </div>
    )
}