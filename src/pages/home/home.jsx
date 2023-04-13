import Share from '../../components/share/share';
import Posts from '../../components/post/post';
import './home.scss';

export default function Home() {
    return (
        <div className="home">
            <Share/>
            <Posts/>
        </div>
    )
}