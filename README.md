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
                    destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}` //대체하고픈 url
                }
            ];
        }
    }
```

<br />

각 함수는 객체를 원소로 갖는 배열을 return 한다.

<br />

7. getServerSideProps()

<br />

일반적으로 Loading으로 API 통신을 통해 받은 데이터가 패칭이 완료될때까지 대치한다. 
NextJS가 가지고 있는 SSR이라는 장점을 살리기 위해서는 이 부분도 pre render가 된 후 UI가 표시되게 하기 위해서 getServerSideProps 함수를 사용한다. 
함수 이름은 절대 바꿔서는 안되고, return 값으로 object를 반환하는데 key값은 props로 설정한다.

<br />

```index.js

    export async function getServerSideProps(){

        const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();

        return {
            props: {
                results,
            },
        };
    }
```

<br />

그 후 모든 컴포넌트에서는 results라는 props를 전달 받을 수 있고, 서버에서 데이터 패칭후 html 파일에 입혀진채로 UI에 표시된다. 
API_KEY를 숨기고 싶을때, 6번과 같은 방법으로도 가능하지만, 이 함수를 사용하면 6번과 같은 설정없이도 불필요한 정보를 비노출 할 수 있다.

<br />

8. Route

<br />

1번의 설명을 참고해보면, react-router-dom을 이용하지 않고 파일의 이름으로 라우팅 되는 편안 기능을 확인했지만, 아직 중첩 라우팅의 방법을 소개하지 않았다. 
중첩 라우팅의 경우 직관적으로 알 수있게 디렉터리로 구분한다. 
예를 들어. /movies/detail, /movies/photo 와 같이 쓰고싶다면 movies라는 폴더안에 
index.js, detail.js 그리고 photo.js를 작성하면 된다. index.js는 /movies라는 라우터의 index 페이지 이다.
그러면 /movies/:id와 같은 라우팅 설정은 어떻게 하느냐, 
[]를 이용하여 파일 이름을 설정한다. 아래의 표가 직관적으로 이해하기 편하다.

<br />

```
    pages
        ㄴ index.js
        ㄴ about.js
        ㄴ _app.js
        ㄴ movies
                ㄴ index.js
                ㄴ [id].js
```

<br />

9. push

<br />

리액트에서 사용한 useLocation의 기능을 사용하기 위해서 NextJS는 useRouter()를 사용한다. 내장 함수로 역시 push를 가지고 있는데, 여기서 쿼리문을 설정 할 수있고, 특별한 기능이라면 이 URL를 커스텀 할 수 있다.

<br />

```
    const onClick = (id, title) => {
        router.push({
            pathname: `/movies/${id}`,
            query: {
                id,
                title
            }
        }, `/movies/${id}`)
    }
```

<br />

3번째 인자를 넣지 않았다면 해당 url은 /movies/123154?id=123154&title=spiderman 이 된다. 허나 세번째 인자인 as를 이용하면 해당 url이 브라우저에는 /movies/123154로 보이게 된다. 

<br />

Link태그를 이용할때도 사용 가능하다. 

<br />

```
    <Link href={{
        pathname: `/movies/${mv.id}`,
        query: {
            id: mv.id,
            title: mv.original_title
        },
        }}
        as={`/movies/${mv.id}`}
    >
        <a> <h4>클릭!!</h4> </a>
    </Link>
```

<br />

10. [...params].js

<br />

중첩 라우트를 위해 디렉토릴르 이용한다는 내용이 있었는데, 디렉토리안에 파일 이름에 ...을 붙이면 URL의 모든 정보를 가져올 수 있다. 
useRouter를 콘솔에 찍어보면, query라는 키값 안에 params의 정보가 배열로 들어가 있는걸 확인 할 수 있다.
이를 통해 ES6문법으로 좀 더 편하게 변수 할당을 한다.

<br />

```[...parmas].js

    const [ title, id ] = router?.query?.params || [];

```

<br />

|| [] 은 사용자가 url로 바로 타고 들어올 경우 에러 페이지가 나는걸 방지하기 위함

<br />

11. 404 Not Found

<br />

404 Not Found 페이지를 커스텀 할 수있다. 404.js 라는 파일을 만들어 원하는대로 커스텀만 하면 된다. 

<br />


```404.js
    export default function NotFound(){

        return (
            <div>
                <p>here is 404 Not Found page</p>
            </div>
        )
    }
```

