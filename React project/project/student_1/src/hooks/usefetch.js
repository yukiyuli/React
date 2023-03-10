import { useCallback, useState } from 'react';

// reqObj: save request parameter
// url: request address
// method: request method
// headers: {
//     "content-type"
// }
// body: request body, body不能一开始的时候传，因为在执行useFetch时，还没有数据传过去，所以要在fetchData的时候调用body才能确保拿到的是最新的数据

// cb: Callback function, executed after the request is sent successfully

export default function useFetch(reqObj, cb) {

    const [data, setData] = useState([]);

    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);

    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (body) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/' + reqObj.url, {
                method: reqObj.method || 'get',
                headers: {
                    "Content-type": reqObj.type || "application/json"
                },

                // get请求没有请求体，所以这里要做一个判断
                body: body ? JSON.stringify({ data: body }) : null,
            });
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
                cb && cb();
            } else {
                throw new Error('Loading failed!');
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        };

    }, []);

    // set return value
    return {
        loading, error, data, fetchData
    };

}