import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

export const Navbar = () => {
  const [Sdata, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const catalogItems = () => {
    fetch('http://localhost:3000/api/categories')
      .then(res => res.json())
      .then(data => { setData(data); setIsLoaded(true); })
      .catch(err => { setError(err); setIsLoaded(true); });

  };
  useEffect(() => {
    catalogItems();
  }, [isLoaded]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 border-b-2 border-gray fixed w-full top-0 z-50">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <ul className='w-full flex '>
          <li className="group  relative dropdown  px-4 hover:text-black-700 cursor-pointer font-bold text-base uppercase tracking-wide pr-0 right-3">
            <h1 className="font-semibold text-xl tracking-tight">SHOP</h1>
            <div className="group-hover:block dropdown-menu fixed hidden h-auto">
              <ul className="top-0 w-100 bg-white shadow px-10 py-12 ">
                {Sdata.map((item, index) => (
                  <li className="py-1" key={index}>
                    <Link to={`/categories/${item.categoryId}`} className="block text-black-500 font-bold text-base uppercase cursor-pointer hover:bg-blue-300">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center flex-shrink-0 text-black mr-16">
        <a href="/" className="font-semibold text-xl tracking-tight hover">HOME</a>
      </div>

      <div>
        <i className="fa-solid fa-cart-shopping cursor-pointer" onClick={() => {
          setShow(!show);
        }} />
        {show &&
        <Cart/>

        }
      </div>
    </nav>
  );
};
