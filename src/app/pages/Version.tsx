import React from "react";
import { Box, Card, Container, Link, Paragraph } from "theme-ui";

export const Version: React.FC = () => {
  //const dappVersion = useSharedSelector(({ dappVersion }) => ({ params: dappVersion }));

  return (
    <Card sx={{ background: "#5880fb" }}>
      <Box sx={{ px: [20], py:[40] }}>
        {/* {JSON.stringify(dappVersion.params, null, 2)} */}
      </Box>
    </Card>
  );
};
