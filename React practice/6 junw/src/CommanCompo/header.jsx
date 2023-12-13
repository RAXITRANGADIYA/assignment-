
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";

export default function CommonHeaderCompo() {
  const [showBasic, setShowBasic] = useState(false);    
  let menuData = {"/":"Home","/aboutus":"About Us","/contact":"Contact","/api":"API Example","/weatherdata":"Weather"};
  let menuDataArray =["Home","About","Contact"] ;
//   console.log(menuData);
//   console.log(menuDataArray);
//   console.log(Object.entries(menuData));
  let ListData = Object.entries(menuData).map(([key,val], index) => {
    // console.log(val,key);
    return <MDBNavbarItem key={index}>
                          {/* <MDBDropdownItem link href='singin'>Login</MDBDropdownItem> */}
      <Link className="nav-link" to={key}>{val}</Link>
    </MDBNavbarItem>
  })
  return (
    <>
    {/* <Link to="click">Click</Link> */}
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
            </MDBNavbarItem>
            {ListData}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Account
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                {/* <Link className="nav-link" to={'singin'}>Login</Link> */}
                  <MDBDropdownItem link href='/#/singin'>Login</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>


          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
  );
}
// export default CommonHeaderCompo;