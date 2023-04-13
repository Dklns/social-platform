import {useState} from 'react';
import './update.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export default function Update({setOpenUpdate, user}) {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        name: user.name,
        city: user.city,
        website: user.website,
    })

    function handleChange(e) {
        setTexts((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    async function upload(file){
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation((user) => {
        return makeRequest.put('/user', user);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
        }
    })

    async function handleClick(e) {
        e.preventDefault();
        let coverUrl, profileUrl;

        coverUrl = cover ? await upload(cover) : coverUrl;
        profileUrl = profile ? await upload(profile) : profileUrl;

        mutation.mutate({...texts, coverPic: coverUrl, profilePic: profileUrl});
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }

    return (
        <div className="update">
            <div className="wrapper">
            <h1>Update Your Profile</h1>
            <form>
                <div className="files">
                <label htmlFor="cover">
                    <span>Cover Picture</span>
                    <div className="imgContainer">
                    <img
                        src={
                        cover
                            ? URL.createObjectURL(cover)
                            : user.coverPic
                        }
                        alt=""
                    />
                    </div>
                </label>
                <input
                    type="file"
                    id="cover"
                    style={{ display: "none" }}
                    onChange={(e) => setCover(e.target.files[0])}
                />
                <label htmlFor="profile">
                    <span>Profile Picture</span>
                    <div className="imgContainer">
                    <img
                        src={
                        profile
                            ? URL.createObjectURL(profile)
                            : user.profilePic
                        }
                        alt=""
                    />
                    </div>
                </label>
                <input
                    type="file"
                    id="profile"
                    style={{ display: "none" }}
                    onChange={(e) => setProfile(e.target.files[0])}
                />
                </div>
                <label>Email</label>
                <input type="text"  name="email" onChange={handleChange} />
                <label>Password</label>
                <input type="text"  name="password" onChange={handleChange} />
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} />
                <label>Country / City</label>
                <input type="text" name="city" onChange={handleChange}/>
                <label>Website</label>
                <input type="text" name="website"  onChange={handleChange}/>
                <button onClick={handleClick}>Update</button>
            </form>
            <button className="close" onClick={() => setOpenUpdate(false)}>
                close
            </button>
            </div>
        </div>
    );
}