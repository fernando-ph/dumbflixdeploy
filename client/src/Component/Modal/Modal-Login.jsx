import { useMutation } from "react-query";
import React, { useContext, useState } from "react";
import { Form, FloatingLabel, Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { API, setAuthToken } from '../../Config/Api'

export default function Login() {

    let Navigate = useNavigate()

    const [ _ , dispatch] = useContext(UserContext)

    const [message, setMessage] = useState(null)
    const [form, setForm ] = useState ({
        email:'',
        password:'',
    })

    const {email, password} = form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const response = await API.post("/login", form)

            console.log("login success : ", response)
            dispatch ({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data
            })

            setAuthToken(localStorage.token)

            if (response.data.data.role === 'admin') {
                Navigate('/admin')
            } else {
                Navigate('/')
            }

            const alert = (
                <Alert variant="success" className="py-1">
                    Login success
                </Alert>
            )
            setMessage(alert)
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Login Failed
                </Alert>
            )
            setMessage(alert)
            console.log("login failed : ", error)
        }
    })

    return (
        <div className="Modal-login">
        <div style={{fontSize:"40px", marginBottom:"10px", color:"white", fontWeight:"bold"}}>Login</div>
        { message && message }
        <Form onSubmit={ (e) => handleSubmit.mutate(e)}>
        <div>    
            <FloatingLabel controlId="email"label="Email"className="mb-3">
                <Form.Control type="text" placeholder='Email' className='formControl'  name="email" value={email} onChange={handleChange}  />
            </FloatingLabel>
            <FloatingLabel controlId="password"label="Password"className="mb-3">
                <Form.Control type="password" placeholder='Password'  name="password" value={password} onChange={handleChange}/>
            </FloatingLabel>
        </div>
        <div className='containerLoginButton'>
            <button className='loginButton'>Login</button>
        </div>
        </Form>
            
     </div>
    )
}