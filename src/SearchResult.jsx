import { Heading, Pane, Text } from "evergreen-ui";
import React, { useState } from "react";

function SearchResult({ items, setItem }) {
  return (
    <Pane display="grid" padding={20} gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="10px">
      {items.map(item => (
        <SearchItem item={item} key={item.id} onSelected={() => setItem(item)} />
      ))}
    </Pane>
  );
}

function SearchItem({ item, onSelected }) {
  const [el, setEl] = useState(1);

  return (
    <Pane
      onClick={onSelected}
      onMouseEnter={() => setEl(3)}
      onMouseLeave={() => setEl(1)}
      cursor="pointer"
      elevation={el}
      display="flex"
      flexDirection="column"
      width="200px"
    >
      <img src={item.album?.images?.[1]?.url} alt={item.name} />
      <Pane padding={10}>
        <Heading>{item.name}</Heading>
        <Text>{item.artists?.[0].name}</Text>
      </Pane>
    </Pane>
  );
}

export default SearchResult;
