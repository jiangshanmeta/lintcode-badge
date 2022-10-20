import { CssBaseline } from "@material-ui/core";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <CssBaseline />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
