import React from "react"
import { Flex, Text } from 'theme-ui';
import SvgLoader from '@app/assets/icons/loader.svg';


export const Loader: React.FC<{}> = () => {
    return (
        <Flex sx={{ alignItems: "center", justifyContent: "center", flexDirection: "column", height: "-webkit-fill-available" }}>
            <SvgLoader />
            <Text sx={{
                color: "#ababab",
                mt: "20px",
                fontSize: "10px",
                fontStyle: "italic",
                width: "100%",
                textAlign: "center"
            }}>Please wait, BANS is loading...</Text>
        </Flex>
    );
}

