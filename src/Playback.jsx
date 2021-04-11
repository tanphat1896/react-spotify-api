import { Checkbox, Heading, Pane } from "evergreen-ui";
import React, { useEffect, useRef, useState } from "react";

function Playback({ item }) {
  const audioRef = useRef();
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    if (!item || !item.preview_url) return;
    audioRef.current?.load();
    autoplay && audioRef.current?.play().catch(e => console.log(e));
  }, [item, autoplay]);

  if (!item) {
    return null;
  }

  return (
    <Pane marginTop={20} padding={20}>
      <Heading>Track: {item?.name}</Heading>
      <Checkbox label="Autoplay" checked={autoplay} onChange={e => setAutoplay(e.target.checked)} />
      <audio controls ref={audioRef}>
        {item?.preview_url && <source src={item?.preview_url} type="audio/mpeg"></source>}
      </audio>
    </Pane>
  );
}

export default Playback;
