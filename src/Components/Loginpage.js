import React ,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const history = useNavigate();

  const [credential,setCredentail] = useState({email:"",password:""});
  const onChange = (e) => {
    setCredentail({ ...credential, [e.target.name]: e.target.value })

  }
  const handleSubmit =async(e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credential.email,password:credential.password})
      });
      const json=await  response.json(); 
      console.log(json);
      if(json.success){
        //save the authtoken and redirect
        localStorage.setItem('token',json.authtoken)
        props.showAlert("Logged In Successfully" ,"success");

        history('/');
      }
      else{
        props.showAlert("Invalid Details" ,"danger");

      }
  }
  return (
    <div>
      <div className="main">
    <p className="sign" align="center">Log in</p>
       <form className="form1" onSubmit={handleSubmit} >
      
      <input htmlFor="email" className="un " type="email" id="email" name='email' align="center" placeholder="Username" onChange={onChange}/>
      <input className="pass"  type="password"  name='password' id="password" onChange={onChange} align="center" placeholder="Password"/>
      <button className="submit my-3" align="center">Sign in</button>  
</form> </div>
    </div>
  )
}

export default Login



      