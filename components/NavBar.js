import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css"

export default function NavBar(){

    const router = useRouter(); // react에서의 useLocation 과 비슷한 역할을 한다

    return(
        <nav>
            <img src="/vercel.svg" />
            {/* 해당 파일은 public 파일에 들어있는 파일 */}
            <div>
                <Link href={"/"}>
                    {/* <a className={`${styles.link} ${router.pathname === "/" ? styles.active : null}`} >Home</a> */}
                    {/* 위 방법은 module.css를 만들어서 하는 방법 */}
                    <a className={router.pathname === "/" ? "active" : ""} >Home</a>
                </Link>
                <Link href={"/about"}>
                    <a className={router.pathname === "/about" ? "active" : ""}>About</a>
                </Link>
            </div>

            {/* styled jsx 방법 nextJs만의 고유방법 중괄호와 백틱이 필요함 */}
            <style jsx>{`
                nav {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 20px;
                    padding-bottom: 10px;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                }
                img {
                    max-width: 100px;
                    margin-bottom: 5px;
                }
                nav a {
                    font-weight: 600;
                    font-size: 18px;
                }
                .active {
                    color: tomato;
                }
                nav div {
                    display: flex;
                    gap: 10px;
                }
            `}</style>
        </nav>
    )
}