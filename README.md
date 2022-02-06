# NextJs 기초 

<br />

> React를 이용하여 SSR(Server Side Render)를 할 수 있게 해주는 프레임워크

<br />

1. Router의 필요성

<br />

React의 경우 react-router-dom를 다운 받아서 Router, Routes, Route를 설정 해줘야한다. 
하지만 NextJs인 경우, 파일 이름으로 자동 라운터 기능이 있다. 컴포넌트의 이름은 중요하지 않지만, js파일의 이름으로 라운팅하기 때문에 파일이름을 신중하게 지어야한다. 그리고 이 기능을 지원 받기 위해 모든 컴포넌트는 꼭 export default 시켜야한다.

<br />

```
//index.js
    export default Home(){
        retrun "Hello World!";
    }
```
>해당 컴포넌트는 index파일이기에 / 에서 마운트된다.

<br />

2. SSR

<br />

React App의 경우, 빈 div 태그 하나만 가지고있고, js 파일이 로드되어야 화면에 UI가 표시된다. 하지만 NextJs는 서버에서 이미 렌더링 되기때문에, div태그가 아닌 태그가 pre-rendering 되어서 UI에 표시된다. 

<br />

3. Link의 사용

<br />

React의 경우 Link 태그를 이용하여 링크를 이동한다. NextJs도 마찬가지로 Link를 이용하지만, Link 태그 자체에 props를 넘겨 줄수는 없다. props가 필요없다면 React와 동일하게 사용가능하지만, 만약 props를 전달해야한다면, a태그를 같이 써준다

<br />

```
    //ReactJs
    <Link className="link" style={{color: "red"}} to="/about">About</Link>

    //NextJs
    <Link href="/about">
        <a className="link" style={{color: "red"}}>About</a>
    </Link>
```

<br />

4. _app.js

<br />

React에서의 App.js가 하는 역할과 비슷하다. 모든 컴포넌트의 집합체를 작업 할 수있는 곳이고, 모든 페이지에 들어가는 동일한 컴포넌트는 해당 파일에서 작업한다면, 다른 컴포넌트에
직접적으로 import 시키지 않아도되고, 모든 페이지에 다 적용되기에 Global Style 작업도 가능하다. 
일반 컴포넌트는 module.css 말고 일반 css 파일을 import 할수없다. _app.js에서만 가능함.

```
    //_app.js

    export default function App({ Component, pageProps }){

        return (
            <>
                <NavBar /> //Nav를 모든 컴포넌트마다 적용시킬 필요가 없어진다.
                <Component {...pageProps} />
                <style jsx global>{`
                    a{
                        color: white;
                    }
                `}</style>
            </>
        )
    }
```

<br />

5. 스타일링 

<br />

JSX 문법안에서 스타일링이 가능하다. 그 틀을 style이라는 태그안에 {}와 ``(백틱)을 이용하며 된다. style 태그에 jsx를 props로 넘겨준다

<br />

```
    ...

    return(
        <>
        ...


        <style jsx>{`
            <!-- 스타일링 -->
            ...
        `}</style>

        </>
    )


```

<br />

6. redirects vs rewrites

<br />

redirects: url를 이동을 시켜준다
rewrites: 해당 url를 대체 시켜준다. 
next.config.js에서 module안에 redirects와 rewrites 함수를 설정 할 수 있다. 해당 함수들은 이름그대로의 기능을 가지고 있는데, API KEY를 숨기기에 좋다. 

<br />

next.config.js
```
    const API_key = process.env.API_KEY;

    module.exports = {
        reactStrictMode: true,
        async redirects(){
            //리디렉션 함수
            return [
                {
                    source: "/contact", //리디렉션 실행될 위치
                    destination: "/form", //리디렉션 시키고 싶은 위치
                    permanent: false, //이동 정보를 기억할 것인가.
                }
            ]
        },
        async rewrites(){
            //리라이트 함수
            return [
                {
                    source: "/api/movies", //대체될 url
                    destination: `https://api.themoviedb.org/3/movie/popular? api_key=${API_key}` //대체하고픈 url
                }
            ];
        }
    }
```

<br />

각 함수는 객체를 원소로 갖는 배열을 return 한다.