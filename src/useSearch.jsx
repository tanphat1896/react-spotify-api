import { debounce } from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";

function useSearch(query) {
  const { token } = useContext(authContext);
  const [items, setItems] = useState([]);

  function search(query, token) {
    console.log("Fetching", query);
    fetch("https://api.spotify.com/v1/search?type=track&q=" + query, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(rs => rs.json())
      .then(json => {
        console.dir(json?.tracks?.items);

        setItems(json?.tracks?.items || []);
      });
  }

  const searchDeb = useCallback(() => debounce((query, token) => search(query, token), 500), [])();

  useEffect(() => {
    searchDeb(query, token);
  }, [query, token, searchDeb]);

  return items;
}

export default useSearch;
