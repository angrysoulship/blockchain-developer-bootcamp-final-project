import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



import React, {useState, useEffect} from 'react';
let Web3 = require('web3');
const contractAddress = "0x4af4177E3A18cc575804A04648b82D8A8f74A44e";

const Nav = () => {



  return (
    <div>
      <nav className="navbar">
        <Link href="/">
          <a className="logo">
            Crypto T-rex
          </a>
        </Link>
        <div className="nav-links">
          <div className="navlink home-page">
            <Link href="/">Home</Link>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default Nav
