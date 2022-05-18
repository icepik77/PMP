import {useState} from "react";
import { useHttp } from "../hooks/useHttp";
import {useNavigate} from "react-router-dom";

export const RegistrPage = function(){

    const {request} = useHttp();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:'', password:''
    });

    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value});
    }

    const registrHandler = () =>{
        const data = request("/registr", "POST", {...form});
        
        if (data){
            navigate("/HostPage");
        }
    }    
    return(
        <div className="authentication">
            <h1>РЕГИСТРАЦИЯ</h1>
            <input name="email" placeholder="Электронная почта" value = {form.email} onChange={changeHandler}/>
            <input name="password" placeholder="Пароль" type="password" value = {form.password} onChange={changeHandler}/>
            <button onClick={registrHandler}>РЕГИСТРАЦИЯ</button>
        </div>
    )
}