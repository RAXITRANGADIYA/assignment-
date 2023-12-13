import React, { useEffect, useState } from 'react';

const Weatherapp = () => {
    const [apiData, setApiData] = useState();
    const [input, setInput] = useState();
    const [postalCode,setPostalCode] = useState();
    // const [input, setInput] = useState({formData:{}});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // fetch('https://jayramin.000webhostapp.com/allusers').then(res=>res.json()).then((result)=>{ console.log(result); })

        // console.log("called");
    }, [])
    const CheckWeather = async (event) => {
        setInput(event.target.value)
        await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${event.target.value}&key=faed4d9eb29d483a866000c901ccb680`).then(res => res.json()).then((result) => {
            // console.log(result.results);
            // console.log(result.status.code);
            // console.log(result?.results.length);
            
            if (result.status.code == 200 && result.results.length > 0) {
                console.log(result.results[0].components);
                setLoading(true)
                setPostalCode(result.results[0].components.state_code)

            }
            // let APIList = Object.entries(result.Data).map(([key, val], index) => {
            //     return <li key={key}>{val.username}</li>
            // });
            // setApiData(APIList)

        })
    }
    return (
        <>
            <div className="container">
                <h2>APIExmapleCompo</h2>
                {loading ? <ol> {postalCode} </ol> : <>Loading.....</>}

                {JSON.stringify(apiData)}
                <input type="text" onChange={CheckWeather} name="username" id="" />
                Typed : {JSON.stringify(input)}
                {/* <input type="text" onChange={(event)=>{ setInput((data)=>({formData:{...data.formData,[event.target.name]:event.target.value}})) }} name="username" id="" /> */}
            </div>
        </>
    );
};

export default Weatherapp;





// const addPosts = async (title, body) => {
//     await fetch('https://jsonplaceholder.typicode.com/posts', {
//        method: 'POST',
//        body: JSON.stringify({
//           title: title,
//           body: body,
//           userId: Math.random().toString(36).slice(2),
//        }),
//        headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//        },
//     })
//        .then((response) => response.json())
//        .then((data) => {
//           setPosts((posts) => [data, ...posts]);
//           setTitle('');
//           setBody('');
//        })
//        .catch((err) => {
//           console.log(err.message);
//        });
//  };