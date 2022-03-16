import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';
import '../Style/Home.css';
import {Button, Pagination, Table} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {SearchOutlined}from '@ant-design/icons'
export const Home=() => {
    const [data, setData]=useState([])
    const [loading, setLoading]=useState(false)
    const[error,setError]= useState(false)
    const [page, setPage]=useState(1);
   

    // column array for creating column of our table
    const column=[
        {
            key: '1',
            title: 'name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
            // table searching functionality from antdt
            filterDropdown: ({setSelectedKeys,selectedKeys,confirm,clearFilters}) => {
                return<>
               <input autoFocus 
                    placeholder="search name here"
                    onProgress={() => {}}
                    onBlur={() => {confirm()}}
                    value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value? [e.target.value]:[]);
                            confirm({closedDropDown: false})
                        }}
                    ></input>
                    <Button onClick={() => {confirm()}} type="primary">Search</Button>
                    <Button onClick={() => {
                        clearFilters();
                        
                    }} type="danger">Clear</Button>
                      </>
            },
            filterIcon: () => {
               return <SearchOutlined/> 
            },
            onFilter: (value,record) => {
            return record.name.toLowerCase().includes(value.toLowerCase())
            },
            // table searching functionality from antdt
          width:'25%',
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
        fetch(`https://swapi.dev/api/people/?page=${page}`).then(res => res.json()).then(result => setData(result.results)).catch((err) => {
            console.log(err);
            setError(true)
        }).finally(() => {setLoading(false);}) 
    }
    // function to fetch the data

    // useEffect hook with dependency page to handle rerendering when click on page
    useEffect(() => {
   GetPeople()     
    }, [page])
      
  return error ? (<div><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AGJ48lEJUgIThMessuE5YwHaHa%26pid%3DApi%26h%3D160&f=1" alt="warning404" style={{marginTop:'20vh'}}/></div>): (
      <>
          {/* table and Pagination both come from antDT  */} 
          <Table columns={column} dataSource={data} loading={loading} pagination={false} rowKey={record => record.name}/>
          <Pagination style={{'marginTop':'5vh'}} onChange={() => setPage(page+1)} total={82} defaultCurrent={1} showSizeChanger={false}/>
          {/* table and Pagination both come from antDT  */} 
        
      </>
  )
}
