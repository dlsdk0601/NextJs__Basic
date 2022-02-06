import Layout from "../components/Layout";
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }){

    return (
        <>
            {/* <NavBar /> */}
            <Layout>
                <Component {...pageProps} />
            </Layout>


            <style jsx global>{`
              
            `}</style>
        </>
    )
}

//_app.js