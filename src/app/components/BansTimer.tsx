import { styled } from "@linaria/react";
import React, { useEffect } from "react"
import { Box, Flex, Text } from 'theme-ui';


const ListItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  list-style-type: none;
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #00F6D2;

  & .date_container {
    display:block;
    font-style: italic;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    text-align: center;
    color: #00F6D2;
    width: 100%;
    padding: 0 16px;
}

& .list-first-item {
    display: block;
    text-align: start;
    padding: 0 16px;
}
& .list-second-item {
    display: block;
    text-align: start;
    padding: 0 16px;
  }
& .list-third-item {
    display: block;
    text-align: center;
}
& .list-fourth-item {
    display: block;
    text-align: start;
    padding: 0 10px;
}
`

const DotsSeperator = styled.span`
    display: inline-block;
    font-style: italic;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    text-align: center;
    color: #00F6D2;
`
export const BansTimer: React.FC<{}> = () => {

    useEffect(() => {
        //loader logic
    }, [])

    return (
        <Flex sx={{ 
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "210px",
          width: '630px',
          background: 'linear-gradient(180deg, rgba(11, 204, 247, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
          margin: '40px auto',
          borderRadius:'10px',
          }}>
            <Box sx={{textAlign:"center", px: '50px'}} >
                <Text sx={{
                    color: "#fff",
                    fontSize: "24px",
                    lineHeight: '29px',
                    fontStyle: "italic",
                    width: "100%",
                    textAlign: "center"
                }}>BANS sale starts soon</Text>

<Box sx={{ mt: 5 }}>
    <ul>
      <ListItem>
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
          <p id="days" className="date_container">5</p>
          <span className="list-first-item">days</span>
        </Box>
        </ListItem>
        <DotsSeperator>:</DotsSeperator>
      <ListItem>
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
          <p id="days" className="date_container">23</p>
          <span className="list-second-item">hours</span>
        </Box>
        </ListItem>
        <DotsSeperator>:</DotsSeperator>
      <ListItem>
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
          <p id="days" className="date_container">17</p>
          <span className="list-third-item">minutes</span>
        </Box>
        </ListItem>
        <DotsSeperator>:</DotsSeperator>
      <ListItem>
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
          <p id="days" className="date_container">56</p>
          <span className="list-fourth-item">seconds</span>
        </Box>
      </ListItem>
    </ul>
  </Box>
            </Box>
        </Flex>
    );
}

