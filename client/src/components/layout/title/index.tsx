import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import { Box,Typography } from "@pankod/refine-mui";
import { logo,yariga } from "assets";
export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="YourArticle" width="28px" />
        ) : (
          <Box mt={2}  flex={1} bgcolor="#fcfcfc"  display="flex" flexDirection="column" >
          <img src={logo} alt="YourArticle" width="60px" />
          <Typography>YourArticles</Typography>
          </Box>
        )}
      </Link>
    </Button>
  );
};
