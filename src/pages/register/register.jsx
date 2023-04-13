import { Link,useNavigate } from "react-router-dom"
import {register} from '../../query/queries';
import './register.scss'
import { useState } from "react";
import {Button} from 'antd'

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        nickname: ""
    })
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setInputs(prev => ({...prev,[e.target.name]: e.target.value}));
    }

    function checkInputs() {
        for(let key in inputs) {
            if(inputs[key] === "") {
                setErr("The form has blank space");
                return "disqualification";
            }
        }
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!reg.test(inputs.email)) {
            setErr("email format error")
            return "disqualification";
        }

        const len = inputs.password.length
        if(len < 6 || len > 20) {
            setErr("The password length should be between 6 and 20")
            return "disqualification";
        }
    }

    async function handleClick() {
        if(checkInputs() === "disqualification") return;
        setIsLoading(true); 
        const res = await register(inputs);
        if(res === 'success') {
            setIsLoading(false);
            navigate(`/login/${inputs.username}`);
            console.log('test');
        } else {
            setErr(res);
        }
    }

    return (
        <div className='register'>
            <div className='card'>
                <div className='left'>
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos,error nam,
                        consequatur.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder='Username' name='username' onChange={handleChange} />
                        <input type="email" placeholder='Email' name='email' onChange={handleChange} />
                        <input type="password" placeholder="Password" name='password' onChange={handleChange} />
                        <input type="text" placeholder='Name' name='nickname' onChange={handleChange} />
                        <Button type="primary" loading={isLoading} onClick={handleClick}>Register</Button>
                        {err && err}
                    </form>
                </div>
            </div>
        </div>
    )
}