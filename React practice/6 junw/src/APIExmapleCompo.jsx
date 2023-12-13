import React, { useEffect, useState } from 'react';

const APIExmapleCompo = () => {
    const [apiData, setApiData] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // fetch('https://jayramin.000webhostapp.com/allusers').then(res=>res.json()).then((result)=>{ console.log(result); })
        fetch('https://jayramin.000webhostapp.com/allusers').then(res => { console.log(res); return res.json() }).then((result) => {
            console.log(result);
            // array.forEach(element => {

            // });
            // result.forEach(element => {
            //     console.log(element);
            // });
            // result.map(element => {
            //     console.log(element);
            // });
            // Object.entries(result).forEach(([key,val]) => {
            //     console.log(val);
            // });
            setLoading(true)
            let APIList = Object.entries(result.Data).map(([key, val], index) => {
                // console.log(index);
                // console.log(key,val);
                // console.log(val.username);
                return <li key={key}>{val.username}</li>
            });
            console.log("result", APIList);
            setApiData(APIList)

        })
        // console.log("called");
    }, [])
    return (
        <>
            <div className="container">
                <h2>APIExmapleCompo</h2>
                {loading ? <ol> {apiData} </ol> : <>Loading.....</>}

                {JSON.stringify(apiData)}

            </div>
        </>
    );
};

export default APIExmapleCompo;