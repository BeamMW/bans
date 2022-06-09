import React from "react"
import { Flex, Spinner, Heading } from 'theme-ui';
import Window from "./Window";


export const Loader: React.FC<{}> = () => {
    return (
        <Flex sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Spinner sx={{ m: 2, color: "#fff" }} size="32px" />
            <Heading sx={{ color: "#fff" }}>BEAM BANS dApp Loading...</Heading>
        </Flex>
    );
}

