import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';
import '../Style/Home.css';
import {Pagination, Table} from 'antd'

export const Home=() => {
    const [data, setData]=useState([])
    const [loading, setLoading]=useState(false)
    const [page, setPage]=useState(1);
   

    // column array for creating column of our table
    const column=[
        {
            key: '1',
            title: 'name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
            width: '20%',
        },
        {
            key: '2',
            title: 'gender',
            dataIndex: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                {text: 'Female', value: 'female'},
                { text: 'N/A', value: 'n/a' },
            ],
            onFilter: (value, record) => {
                return record.gender === value;
            },
              width: '20%',
            
        },
        {
            key: '3',
            title: 'height',
            dataIndex:'height',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.height - b.height,
        },
        {
            key: '4',
            title: 'mass',
            dataIndex: 'mass',
            
        },
        {
            key: '5',
            title: 'hair_color',
            dataIndex: 'hair_color',
            
        },
        {
            key: '6',
            title: 'skin_color',
            dataIndex: 'skin_color',
            
        },
        {
            key: '7',
            title: 'eye_color',
            dataIndex: 'eye_color',
            
        },
       
        
    ]
     // column array for creating column of our table
    
    
    // function to fetch the data
    const GetPeople= () => {
      setLoading(true)
        fetch(`https://swapi.dev/api/people/?page=${page}`).then(res => res.json()).then(result => setData(result.results)).catch((err) => {console.log(err)}).finally(() => {setLoading(false)}) 
    }
    // function to fetch the data

    // useEffect hook with dependency page to handle rerendering when click on page
    useEffect(() => {
   GetPeople()     
    }, [page])
      
  return (
      <div >
          <Table columns={column} dataSource={data} loading={loading} pagination={false} Key={uuidv4()} />
          <Pagination style={{'marginTop':'5vh'}} onChange={() => setPage(page+1)} total={82} defaultCurrent={1} showSizeChanger={false}/>
       
        
      </div>
  )
}
