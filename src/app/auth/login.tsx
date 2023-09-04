'use client'
import { useAuthContext } from "@/context/authContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuthContext();
  const [isLoginPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '' || trimmedPassword === '') {
      setError(true);
      return;
    }

    try {
      setError(false);
      await login(trimmedEmail, trimmedPassword);
    } catch (err) {
      console.error(err);
    }
    setError(true);
  }

  return (
    <div className={`${isLoginPage ? 'bg-gradient-login h-screen' : ''}`}>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="p-8 shadow-custom h-[25rem] aspect-video rounded-lg">
          <h1 className="flex items-center justify-center font-bold text-3xl mt-0">
            Soft Clever
          </h1>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col mx-auto gap-4 mt-[4rem]">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b outline-none" />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-b outline-none" />

              <button
                type="submit"
                className={`text-center bg-transparent p-4 rounded-md mt-[1.5rem] 
                border  transition-all hover:bg-loginBtn ${error ? 'border-red-700' : 'border-border'}`}
              >
                {error ? 'Credenciais inválidas' : 'Acessar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}


