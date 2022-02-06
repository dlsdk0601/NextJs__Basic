import NavBar from "./NavBar"
import Seo from "./Seo"

export default function Layout({children}){


    return (
        <>
            <Seo />
            <NavBar />
            <div>{children}</div>
            {/* 
                children은 리액트가 제공해주는 기본 props
                이는 해당 컴포넌트가 가지는 자식 컴포넌트를 얘기한다. 
                _app.js에서 보면 Componenet라는 컴포넌트가 children에 
                해당함
            */}
        </>
    )
}