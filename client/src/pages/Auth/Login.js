import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth.js";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   // form login function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate(location.state || "/");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout title="Login">
//       <div className="form-logincontainer " style={{ minHeight: "90vh" }}>
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">SIGN IN</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email "
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             LOGIN
//           </button>
//         </form>
//       </div>

//     </Layout>
//   );
// };

// export default Login;


const Login = () => {

  const infoBtnClick = ()=>{
    document.querySelector(".logincontainer").classList.toggle('log-in')
  }

  const logincontainerBtnClick = ()=>{
    document.querySelector(".logincontainer").classList.remove("log-in")

  }

const [Name, setName] = useState("")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate();
  const location = useLocation();


  const registerHandler = async e =>{
    e.preventDefault();

    try{
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "name": Name,
        "email": email,
        "password": password,
        "phone": phone,
        "address": address
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8080/api/v1/auth/register", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          toast(JSON.parse(result).message)

        })
        .catch(error => {
          console.log('error', error)
          toast("Signup failed. Error: "+error)

      });

    }catch(e){
      console.log(e);
    }
  }

  // form function
const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": document.querySelector("#login-username").value,
      "password": document.querySelector("#login-password").value
    });

    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        result = JSON.parse(result)

        if (result.success) {
          toast("Login Successful")
          localStorage.setItem("auth", JSON.stringify(result));
          setAuth({
            ...auth,
            user: result.user,
            token: result.token,
          });
          navigate(location.state || "/");
        }else{
          toast.error(result.message)

        }
      
      })
      .catch(error => console.log('error', error));

  }catch(e){console.error(e)}

};






return (
  <Layout title="Login">
<div className="logincontainer">
<div className="box" />
<div className="logincontainer-forms">
  <div className="logincontainer-info">
    <div className="info-item">
      <div className="table">
        <div className="table-cell">
          <p>
            Have an account?
          </p>
          <div className="btn" onClick={logincontainerBtnClick}>
            Log in
          </div>
        </div>
      </div>
    </div>
    <div className="info-item signup-item">
      <div className="table">
        <div className="table-cell">
          <p>
            Don't have an account? 
          </p>
          <div className="btn" onClick={infoBtnClick}>
            Sign up
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="logincontainer-form">
    <div className="form-item log-in">
      <div className="table">
        <div className="table-cell">
        <form onSubmit={handleLogin}> 

          <input name="Username" id="login-username" placeholder="Username" type="text" />
          <input name="Password" id="login-password" placeholder="Password" type="Password" />
          <button type="submit" className="btn" >
            Log in
          </button>
          </form>
        </div>
      </div>
    </div>
    <div className="form-item sign-up">
      <div className="table">
        <div className="table-cell">
        <form onSubmit={registerHandler}> 

          <input
           
            placeholder="Name" 
            type="text" 
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            />

          <input
          
          placeholder="Email" 
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          />

          <input 
          
          placeholder="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />

          <input 
          
          placeholder="Phone" 
          type="number" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          />

          <input
          
          placeholder="Address" 
          type="address" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          />
          <button type='submit' className="btn">
            Sign up
          </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  </Layout>

)
}

export default Login;
