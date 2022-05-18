import {useState} from "react";
import { useHttp } from "../hooks/useHttp";
import {useNavigate} from "react-router-dom";

export const AuthenticationPage = function(){

    const {request, loading} = useHttp();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:'', password:''
    });

    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value});
    }

    const authoHandler = () =>{
        const data = request("/", "POST", {...form});
        data.then(
            PromiseResult=>{
                if (PromiseResult.answer==="yes" && !loading){
                    return navigate("/createProject");
                }
            }
        );
    }
    
    return(
        <div className="authentication">
            <h1>АВТОРИЗАЦИЯ</h1>
            <input name="email" placeholder="Электронная почта" value = {form.email} onChange={changeHandler}/>
            <input name="password" placeholder="Пароль" type="password" value = {form.password} onChange={changeHandler}/>
            <button onClick={authoHandler}>АВТОРИЗАЦИЯ</button>
        </div>
    )
}

