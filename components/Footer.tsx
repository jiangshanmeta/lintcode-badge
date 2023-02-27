import { Box,  Link, Typography } from "@material-ui/core";
import { FC } from "react";

const Footer: FC = () => (
    <footer>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="caption" align="center">
        Built on top of <Link href="https://lintcode.com/">LintCode.com</Link>{" "}
        and <Link href="https://shields.io/">Shields.io</Link>
                <br />
        by <Link href="https://github.com/jiangshanmeta">jiangshanmeta</Link>
            </Typography>
        </Box>
    </footer>
);

export default Footer;
