import { useCallback, useState } from 'react';

// reqObj: save request parameter
// url: request address
// method: request method
// headers: {
//     "content-type"
// }
// body: request body

export default function useFetch(reqObj) {

    const [data, setData] = useState([]);

    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);

    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/' + reqObj.url, {
                method: reqObj.method || 'get',
                headers: {
                    "Content-type": reqObj.type || "application/json"
                },

                // get请求没有请求体，所以这里要做一个判断
                body: (!reqObj.method || reqObj.method.toLowerCase() === 'get') ? null : JSON.stringify({ data: reqObj.body })
            });
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
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