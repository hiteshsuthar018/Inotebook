import React ,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Singnup = (props) => {
    const [credential,setCredentail] = useState({name:"",email:"",password:""});
    const history = useNavigate();
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const {name,email,password} = credential;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name,email,password})
        });
        const json = await response.json(); 
        console.log(json);
        if(json.success){
        //   save the authtoken and redirect
          localStorage.setItem('token',json.authtoken);
          props.showAlert("Account created Successfully" ,"success");
          history('/');
        }
        else{
          props.showAlert("Invalid credential" ,"danger");
        }
    }
    const onChange = (e) => {
        setCredentail({ ...credential, [e.target.name]: e.target.value })
    
      }
    return (
        <div className='container'>
              <div className="main">
    <p className="sign" align="center">Sign Up</p>
    <form className="form1" onSubmit={handleSubmit}>
      <input htmlFor="name" className="un " type="text" id="name" name='name' align="center" placeholder="Username" onChange={onChange}/>
      <input htmlFor="email" className="un " type="email" id="email" name='email' align="center" placeholder="email" onChange={onChange}/>
      <input className="pass" htmlFor="password"  type="password"  name='password' id="password" onChange={onChange} align="center" placeholder="Password" minLength={5} required />
      <input className="pass" htmlFor="password"  type="password"  name='cpassword' id="cpassword" onChange={onChange} align="center" placeholder="Consfirm Password"  minLength={5} required />
      <button className="submit my-3" align="center">Sign in</button>              
    </form>
    </div>
        </div>
    )
}

export default Singnup
