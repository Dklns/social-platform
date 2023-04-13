import { Link,
    useParams,
    useNavigate
} from "react-router-dom"
import { useState,useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from "antd";
import './login.scss'

export default function Login() {
    const param = useParams();
    const [inputs, setInputs] = useState({
        username: param.username,
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    function checkInputs() {
        for(let key in inputs) {
            if(inputs[key] === "") {
                setErr("The form has blank space");
                return "disqualification";
            }
        }
    }

    async function handleLogin() {
        if(checkInputs() === "disqualification") return;
        setIsLoading(true);
        const res = await login(inputs);
        setIsLoading(false);
        if(res === 'success') {
            console.log('test');
            navigate("/");
        } else {
            setErr(res);
        }
    }

    return (
        <div className='login'>
            <div className='card'>
                <div className='left'>
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos,error nam,
                        consequatur.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to='/register'>
                    <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder={inputs.username ? inputs.username : 'Username'}
                            name='username' onChange={handleChange} />
                        <input type="password" placeholder="Password" name='password' onChange={handleChange} />
                        <Button type="primary" loading={isLoading} onClick={handleLogin}>Login</Button>
                        {err && err}
                    </form>
                </div>
            </div>
        </div>
    )
}