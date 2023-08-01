import React, { useEffect, useState } from 'react'

const Products = ({results}) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(data);
  const [loading, setLoading] = useState(false);
  const [searchItem,setSearchItem]=useState('')
  let componentMounted = true;





  const getProducts = async () => {
    setLoading(true);
    const response = await fetch('https://fakestoreapi.com/products')
    if (componentMounted) {
      setData( await response.clone().json());
      setValue(await response.json());
      setLoading(false);
      
    }
    return () => {
      componentMounted = false;
    }
  }
  useEffect(() => {
    getProducts();
  }, [])

  const Loading = () => {
    return (
      <>
        Loading........

      </>
    )
  }


  const ShowProducts = () => {
    return (
      <>
      <div style={{display:"flex"}}>
        </div>
        {value.
        filter((val)=>{
            if(searchItem==''){
                return val;
            }else if(val.title.toLowerCase().includes(searchItem.toLowerCase())){
                return val;
            }
        })
        
        .map((product) => {
          return (
            <div className="col-md-3 mb-4 py-4" key={product.id}>
              <div className="card h-100 text-center p-4 " >
                <img id='zoomin' src={product.image} className="card-img-top" height='250px' />
                <div className="card-body">
                  <h5 className="card-title">${product.price}</h5>
                  <p className="card-text">{product.title}</p>

                 <a href='#'  className="btn btn-primary">Buy</a>
                </div>
              </div>
            </div>
          )

        })}
      </>
    );

  }
  return (

    <div>
        <div style={{marginTop:'40px'}}>
            <input style={{height:'40px',borderRadius:'15px',width:"400px"}} type="text" placeholder='Enter any think....' onChange={(event)=>{
                setSearchItem(event.target.value)
            }} />
        </div>

      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <hr />
            <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Products
