//  /movies/:id

import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detail({ params }){

    const router = useRouter();
    // const [ title, id ] = router?.query?.params || [];  //withourt getServerSideProps
    const [ title, id ] = params || [];  // with getServerSideProps
    //이 페이지에서는 서버 통신이 아닌, 데이터의 id와 title만 가져오는건데 이럴 경우 굳이 서버사이드로 돌릴 필요 없음
    // 정 원한다면 이렇게 쓸 수 있다 정도.

    return (
        <div>
            <Seo title={title} />
            <h4>{title || "Loading..."}</h4>
        </div>
    );
}

export function getServerSideProps({ params: { params } }){
    // console.log(ctx);
    //Next가 server-side context를 제공해준다

    return {
        props : {
            params,
        }
    }
}