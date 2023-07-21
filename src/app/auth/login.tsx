import Link from "next/link";

export default function Login() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="p-8 shadow-2xl h-[25rem] aspect-video bg-slate-700 rounded-lg">
        <h1 className="flex items-center justify-center font-bold text-3xl mt-0">
          Soft Clever
        </h1>
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
            href={'/dashboard'}
            type="submit"
            className="text-center bg-slate-800 p-4 rounded-md mt-[1.5rem] transition-all hover:bg-slate-900">
            Acessar
          </Link>
        </div>
      </div>
    </div>
  )
}


