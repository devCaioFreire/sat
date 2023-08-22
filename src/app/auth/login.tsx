'use client'
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLoginPage] = useState(true);

  function handleLogin() {
    alert('OK')
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
                className="bg-transparent border-b outline-none" />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                className="bg-transparent border-b outline-none" />

              <Link
                href={'/dashboard/home'}
                type="submit"
                className="text-center bg-transparent p-4 rounded-md mt-[1.5rem] border border-border transition-all hover:bg-loginBtn">
                Acessar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}


