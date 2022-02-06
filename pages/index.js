import NavBar from "../components/NavBar";
import Head from "next/head";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";



export default function Home(){

    const [ movies, setMovies ] = useState([]);
    
    useEffect(() => {
        (async () => {
            const { results } = await (
                await fetch(
                    `/api/movies`
                )
            ).json();
            setMovies([...results]);
        })();
        // 익명 함수 바로 실행 기키는 방법
        //( ()=>{} )();
    }, [])


    return (
        <div className="container">
            {/* <Seo title={"Home"} /> */}
            {!movies && <h4>Loading...</h4>}
            {
                movies?.map(mv => 
                    (
                        <div className="movie" key={mv.id}>
                            <img src={`https://image.tmdb.org/t/p/w500/${mv.poster_path}`} />
                            <h4>{mv.original_title}</h4>
                        </div>
                    ))
            }
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
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