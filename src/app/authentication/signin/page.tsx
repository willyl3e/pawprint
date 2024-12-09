"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect
 } from "react";
import "@/styles/globals.css";

const CustomLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div style={{ width: "400px" }} className="mt-20 block place-self-center">
      <h2 className="text-[1.6em] mb-6">Login as a Pawprint member</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username" className="WorkSans text-[.9em]">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
            className="border-solid border-[#b6b6b6] border-[1px] rounded-[5px]"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password" className=" text-[.9em] WorkSans">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
            className="border-solid border-[#b6b6b6] border-[1px] rounded-[5px]"
          />
        </div>
        <button
          type="submit"
          style={{
            maxWidth: "200px",
          }}
          className="mt-6 bg-blue-700 text-white p-2 rounded-md"
        >
          Sign In
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default CustomLogin;
