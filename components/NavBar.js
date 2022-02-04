import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css"

export default function NavBar(){

    const router = useRouter(); // react에서의 useLocation 과 비슷한 역할을 한다

    return(
        <nav>
            <Link href={"/"}>
                {/* <a className={`${styles.link} ${router.pathname === "/" ? styles.active : null}`} >Home</a> */}
                {/* 위 방법은 module.css를 만들어서 하는 방법 */}
                <a className={router.pathname === "/" ? "active" : ""} >Home</a>
            </Link>
            <Link href={"/about"}>
                <a className={router.pathname === "/about" ? "active" : ""}>About</a>
            </Link>

            {/* styled jsx 방법 nextJs만의 고유방법 중괄호와 백틱이 필요함 */}
            <style jsx>{`
                nav{
                    background-color: tomato;
                }
                a{
                    text-decoration: none;
                }
                .active{
                    color: yellow;
                }
            `}</style>
        </nav>
    )
}