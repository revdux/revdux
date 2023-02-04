import { FormEvent, lazy, useState } from "react";
import { API } from "revolt-api";
// const Modal = lazy(() => import("../../components/Modal/Modal"));

const client = new API();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    client.post(`/auth/session/login`, {
      email: email,
      friendly_name: "chrome on Windows 10",
      password: password,
    });
  }

  return (
    <div className="h-screen w-screen bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format')] bg-cover bg-center bg-no-repeat">
      {/* <Modal /> */}
      <div className="flex h-screen shadow-lg">
        <form
          className="m-auto flex w-96 flex-col justify-center rounded-md border-4 border-solid border-zinc-700 bg-zinc-800 bg-opacity-95 p-4 backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <p className="mx-2 mt-2 text-xl font-bold text-white">
            👋 Welcome to Revdux!
          </p>
          <p className="mx-2 mb-4 text-white">Sign into Revdux</p>
          <p className="mx-2 text-white">Email</p>
          <input
            type="email"
            placeholder="Enter your email."
            className="m-2 rounded-md bg-zinc-700 p-2 text-white"
            onChange={(event) => setEmail(event.target.value)}
          />
          <p className="mx-2 text-white">Password</p>
          <input
            type="password"
            placeholder="Enter your password."
            className="m-2 rounded-md bg-zinc-700 p-2 text-white"
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* <a className="mx-2 text-xs text-blue-500">I forgot my password</a> */}
          <button
            type="submit"
            className="m-2 rounded-md bg-zinc-700 p-2 text-white transition hover:bg-teal-600"
          >
            Log in
          </button>
        </form>
      </div>
      <footer className="absolute left-6 bottom-6 text-white">
        Image by{" "}
        <a href="https://unsplash.com/@danielleone" className="text-teal-400">
          Daniel Leone on Unsplash
        </a>
      </footer>
    </div>
  );
}

export default Login;
