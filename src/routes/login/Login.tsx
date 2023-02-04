import { FormEvent, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { API } from "revolt-api";

const client = new API();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [ticket, setTicket] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (!showModal) {
        const loginPayload = {
          email: email,
          password: password,
          friendly_name: "chrome on Windows 10",
        };
        const response = await client.post(`/auth/session/login`, loginPayload);
        // @ts-ignore
        if (response.ticket) {
          // @ts-ignore
          setTicket(response.ticket);
          setShowModal(true);
        } else {
          // @ts-ignore
          localStorage.setItem("token", response.token);
          navigate("/");
        }
      } else {
        const mfaLoginPayload = {
          mfa_ticket: ticket,
          mfa_response: {
            totp_code: mfaCode,
          },
          friendly_name: "chrome on Windows 10",
        };
        const response = await client.post(
          `/auth/session/login`,
          mfaLoginPayload
        );
        // @ts-ignore
        localStorage.setItem("token", response.token);
        setShowModal(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {showModal ? (
        <>
          <form
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none transition focus:outline-none"
            onSubmit={handleSubmit}
          >
            <div className="relative my-6 mx-auto w-auto max-w-[128rem]">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-zinc-800 shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-zinc-700 p-4 pr-36">
                  <h3 className="text-lg font-semibold text-white">
                    Two-factor authentication
                  </h3>
                </div>
                {/*body*/}
                <div className="relative w-full flex-auto p-4">
                  <input
                    type="text"
                    placeholder="Enter your 2FA code"
                    className="w-full rounded-md bg-zinc-700 p-2"
                    onChange={(event) => setMfaCode(event.target.value)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-zinc-700 p-2">
                  <button
                    className="mr-1 mb-1 rounded bg-zinc-700 px-6 py-2 text-sm text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-teal-600 hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      <div className="h-screen w-screen bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format')] bg-cover bg-center bg-no-repeat">
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
          <a
            href="https://unsplash.com/@danielleone"
            className="text-teal-400"
            target="_blank"
          >
            Daniel Leone on Unsplash
          </a>
        </footer>
      </div>
    </>
  );
}

export default Login;
