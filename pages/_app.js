import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }){

    return (
        <>
            <NavBar />
            <Component {...pageProps} />
            <style jsx global>{`
                a{
                    color: white;
                }
            `}</style>
        </>
    )
}

//_app.js