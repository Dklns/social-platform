import Stories from '../../components/stories/stories'
import Posts from '../../components/posts/posts'
import Share from '../../components/share/share'
import './home.scss'

export default function Home() {
    return (
        <div className='home'>
            <Stories/>
            <Share/>
            <Posts/>
        </div>
    )
}