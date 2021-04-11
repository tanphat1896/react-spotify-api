import React, { useContext, useState } from "react";
import { Button, Link, Pane, SideSheet, Text, TextInputField } from "evergreen-ui";
import { authContext } from "./AuthProvider";
import useToken from "./useToken";

function Setting({ show, setShow }) {
  const [clientId, setClientId] = useState("");
  const [secret, setSecret] = useState("");
  const { token } = useContext(authContext);
  const [code, login] = useToken(clientId, secret);

  return (
    <SideSheet isShown={show} onCloseComplete={() => setShow(false)}>
      <Pane padding={20}>
        <Text>
          Retrieve at:{" "}
          <Link href="https://developer.spotify.com/dashboard/applications" target="_blank">
            Spotify dashboard
          </Link>{" "}
        </Text>
        <TextInputField label="ClientId" value={clientId} onChange={e => setClientId(e.target.value)} />
        <TextInputField label="Secret" value={secret} onChange={e => setSecret(e.target.value)} />
        <TextInputField label="Code" value={code} disabled />
        <TextInputField label="Token" value={token} disabled />
        <Button appearance="primary" intent="success" onClick={login}>
          Get token
        </Button>
      </Pane>
    </SideSheet>
  );
}

export default Setting;
