import { CogIcon, IconButton, Pane, SearchInput } from "evergreen-ui";
import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import Playback from "./Playback";
import SearchResult from "./SearchResult";
import Setting from "./Setting";
import useSearch from "./useSearch";

function App() {
  const { token } = useContext(authContext);
  const [q, setQ] = useState("");
  const items = useSearch(q);
  const [item, setItem] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (token) {
      setShow(false);
    }
  }, [token]);

  return (
    <Pane>
      <Pane background="#234361" padding={10} display="flex">
        {token && <SearchInput placeholder="Search" name="q" value={q} onChange={e => setQ(e.target.value)} />}
        <IconButton marginLeft={10} icon={CogIcon} onClick={() => setShow(s => !s)} />
        <Setting show={show} setShow={setShow} />
      </Pane>
      <Playback item={item} />
      <SearchResult items={items} setItem={setItem} />
    </Pane>
  );
}

export default App;
