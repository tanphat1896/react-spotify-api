import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";

const scopes = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
const uri = "http://localhost:3000";

function useToken(clientId, secret) {
  const [code, setCode] = useState("");
  const { token, setToken } = useContext(authContext);

  useEffect(() => {
    window.opener?.onRedirect?.();
  }, []);

  function login() {
    const w = window.open(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        clientId +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(uri),
      "OAuth",
      "scrollbars=yes,status=yes"
    );
    window.onRedirect = function () {
      const code = new URL(w.location.href).searchParams.get("code");
      if (code) {
        setCode(code);
        w.close();
      }
    };
  }

  useEffect(() => {
    if (!code || token) return;
    fetch("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${window.btoa(clientId + ":" + secret)}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${uri}`,
      method: "POST",
    })
      .then(rs => rs.json())
      .then(json => {
        console.log(json);
        setToken(json.access_token);
      });
  }, [code, clientId, secret, setToken, token]);

  return [code, login];
}

export default useToken;
