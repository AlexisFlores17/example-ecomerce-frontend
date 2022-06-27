import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Container, Grid, GridColumn, Image, Input } from "semantic-ui-react";
export const TopBar = () => {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <GridColumn width={8} className="top-bar__left">
            <Logo />
          </GridColumn>
          <GridColumn width={8} className="top-bar__right">
            <Search />
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
};

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="gaming" />
      </a>
    </Link>
  );
}

function Search() {
  const [searchStr, setSearchStr] = useState("");
  const router = useRouter();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`);
    }

    setLoad(true);
    return () => {};
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      icon="search"
      value={router.query.query}
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
}
