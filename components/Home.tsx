import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
} from "@material-ui/core";
import Head from "next/head";
import {NextPage} from 'next'
import { useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
import BadgeContent from "./BadgeContent";
import BadgeStyle from "./BadgeStyle";
import CopyToClipboard from "./CopyToClipboard";
import Footer from "./Footer";
import { Badge, DEFAULT_BADGE, getMarkdown, getUrl } from "../utils/badge";
import toValidUsernameObservable from "../utils/observable";
import useKeepVisible from "../utils/use-keep-visible";

const Home: NextPage = () => {
    const [username$] = useState(() => new Subject<string>());
    const [usernameInput, setUsernameInput] = useState("");
    const [error, setError] = useState("");
    const [badge, setBadge] = useState<Badge>(DEFAULT_BADGE);
    const badgeRef = useRef<HTMLImageElement | null>(null);
    const screenBigEnough = useMediaQuery("(min-width:650px)");

    useEffect(() => {
        const subscription = toValidUsernameObservable(
            username$,
            setError
        ).subscribe((username) => setBadge((b) => ({ ...b, username})));

        return () => subscription.unsubscribe();
    }, [username$]);

    useKeepVisible(badgeRef, 20, 16);

    return (
        <>
            <Head>
                <meta
                    name="Description"
                    content="Create a badge showing your ranking on lintcode.com"
                />
                <title>Lintcode Badge Generator</title>
                <link rel="icon" href="/favicon.ico" />

            </Head>

            <Box
                style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    minHeight:'100vh'
                }}
            >
                <Paper
                    elevation={3}
                    style={{
                        margin: "24px",
                        padding: "24px 24px 8px 24px",
                    }}
                >
                    <Box
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            marginTop:8,
                        }}
                    >
                        <Typography variant="h4" align="center">
              LintCode Badge Generator
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center"
                        }}
                    >
                        <Box
                            style={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"center",
                                justifyContent:"flex-start",
                                marginTop:32,
                                width:256,
                                minHeight:96,
                            }}
                        >
                            <TextField
                                autoFocus
                                id="username"
                                label="Your LintCode username"
                                variant="outlined"
                                error={!!error}
                                helperText={error}
                                size="medium"
                                value={usernameInput}
                                onChange={({ target: { value } }) => {
                                    setUsernameInput(value);
                                    setError("");
                                    username$.next(value);
                                }}
                                fullWidth
                            />
                        </Box>
                        <Box
                            style={{
                                display:'flex',
                                flexDirection:'row',
                                alignItems:"flex-start",
                                justifyContent:"space-around",
                                flexWrap:"wrap"
                            }}
                        >
                            <Box
                                style={{
                                    minWidth:264,
                                    marginTop:screenBigEnough? 8:16,
                                    marginLeft:screenBigEnough?16:0,
                                }}
                            >
                                <BadgeContent badge={badge} setBadge={setBadge} />
                            </Box>
                            <Box
                                style={{
                                    minWidth:264,
                                    marginTop:screenBigEnough?8:40,
                                    marginRight:screenBigEnough?-16:0
                                }}
                            >
                                <BadgeStyle badge={badge} setBadge={setBadge} />
                            </Box>
                        </Box>
                        <Box
                            style={{
                                marginTop:32,
                                minHeight:50,
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                        >
                            <img
                                ref={badgeRef}
                                src={getUrl(badge)}
                                alt={badge.username}
                                style={{ position: "relative" }}
                            />
                        </Box>
                        <Grid
                            container
                            spacing={10}
                            justifyContent="center"
                            alignItems="flex-end" 
                            style={{ marginTop: "8px" }}
                        >
                            <Grid item>
                                <CopyToClipboard
                                    icon={faImage}
                                    label="Copy Image URL"
                                    textToCopy={getUrl(badge)}
                                />
                            </Grid>
                            <Grid item>
                                <CopyToClipboard
                                    icon={faMarkdown}
                                    label="Copy Markdown Code"
                                    textToCopy={getMarkdown(badge)}
                                />
                            </Grid>
                        </Grid>
                        <Box style={{marginTop:32}}>
                            <Footer />
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default Home;
