import Head from "next/head";
import { useRouter } from "next/router";

export default function Seo({ title }){

    const router = useRouter();
    
    const pathObj = {
        "/" : "Home",
        '/about': "About" 
    }

    return (
        <Head>
            <title>{pathObj[router.pathname]} | Next Movies</title>
        </Head>
        
            // nextJs가 기본으로 제공하는 패키지 
            // 리액트의 Helmet 라이브러리와 같은 역할을 한다.
        
    )
}