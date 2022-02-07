import NavBar from "../components/NavBar";
import Head from "next/head";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";



export default function Home({results}){

    // const [ movies, setMovies ] = useState([]);
    
    // useEffect(() => {
    //     (async () => {
    //         const { results } = await (
    //             await fetch(
    //                 `/api/movies`
    //             )
    //         ).json();
    //         setMovies([...results]);
    //     })();
    //     // 익명 함수 바로 실행 기키는 방법
    //     //( ()=>{} )();
    // }, [])


    //router Hook
    const router = useRouter();
    const onClick = (id, title) => {
        router.push({
            pathname: `/movies/${id}`,
            query: {
                id,
                title
            }
        }, `/movies/${id}`)
        //query를 쓰면 일반적인 쿼리문으로 가지만, 3번째 인자로 문자열을 주면 url를 커스텀 할 수있다.
    }

    return (
        <div className="container">
            {/* <Seo title={"Home"} /> */}
            {/* {!movies && <h4>Loading...</h4>} */}
            {
                results?.map(mv => 
                    (    
                        <div className="movie" key={mv.id} onClick={ () => onClick(mv.id, mv.original_title)}>
                            <img src={`https://image.tmdb.org/t/p/w500/${mv.poster_path}`} />
                            <Link href={{
                                pathname: `/movies/${mv.id}`,
                                query: {
                                    id: mv.id,
                                    title: mv.original_title
                                },
                                }}
                                as={`/movies/${mv.id}`}
                            >
                                <a> <h4>{mv.original_title}</h4> </a>
                            </Link>
                        </div>
                    ))
            }
            <style jsx>{`
                .container {
                    width: 100%;
                    max-width: 680px;
                    margin: auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie{
                    cursor: pointer;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    )
}

export async function getServerSideProps(){
    //이 함수의 이름은 무조건 위와 같이 지어야한다. 
    //이 함수의 역할은 loading을 보여주지않고 모든 데이터를 받아서 pre rendering이 이뤄진 후에 UI를 보여주고 싶을때 쓴다

    const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
    //위의 링크는 프론트에서 작동되야해서 로컬 주로를 넣는다

    return {
        props: {
            results,
        },
    };
}