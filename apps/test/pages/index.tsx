import { useRouter } from "next/router";
import { useState } from "react";
import { loginFirebase } from "../util/firebase-client";

export function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onClickLogin() {
    loginFirebase(email, password).then(() => {
      router.push("/main");
    }).catch(error => {
      console.error("Login error", error.message);
    })
  }

  return (<div className="w-screen h-screen flex flex-col items-center justify-center ">
      <label className="font-sans text-4xl font-extrabold antialiased">Test App</label>
      <input placeholder="email" className="border rounded p-2 w-64 mt-5" value={email} onChange={onChangeEmail}/>
      <input placeholder="password" className="border rounded p-2 w-64 mt-5" type="password" onChange={onChangePassword}/>
      <button className="bg-blue-400 hover:bg-blue-500 text-white mt-10 py-2 px-5 rounded select-none" onClick={onClickLogin}>Login</button>
    </div>)
}

export default Index;
