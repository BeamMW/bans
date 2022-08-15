import React, { useEffect } from "react"
import { Box, Flex, Text } from 'theme-ui';
import SvgLoader from '@app/assets/icons/bans-loading.svg';
import { BansTimer } from "./BansTimer";


export const Loader: React.FC<{}> = () => {

    useEffect(() => {
        //loader logic
    }, [])

    return (
        <>
            <BansTimer/>
        
            <Flex sx={{ alignItems: "center", justifyContent: "center", flexDirection: "column", height: "160px" }}>
                <Box sx={{textAlign:"center", width:"300px", /* height:"300px" */}}>
                    <SvgLoader style={{marginBottom:"20px"}} />
                    <Text sx={{
                        color: "#ababab",
                        fontSize: "10px",
                        fontStyle: "italic",
                        width: "100%",
                        textAlign: "center"
                    }}>Please wait, BANS is loading...</Text>
                </Box>
            </Flex>
        </>
    );
}

