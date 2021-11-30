// import Head from 'next/head'
import React, { useState, useEffect } from 'react'
// import styles from '../styles/Home.module.css'
import { ethers } from 'ethers'
import DinoDisplay from '../components/DinoDisplay';





import Trexcontract from '../Trexcontract.json'
import { get } from 'jquery';
import { render } from 'react-dom';
// Mumbai contractAddress
const contractAddress = "0xC37C192692CEf8B53878E25a767dEEFa084A6725"
// Localhost contract address
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"



export default function Home(props) {
  const allColors = {
  10: "ffcc80",
  11: "3f1174",
  12: "b22a90",
  13: "fff3e0",
  14: "4c858b",
  15: "18bebe",
  16: "b5044b",
  17: "d6b1d4",
  18: "fecb40",
  19: "748882",
  20: "4a3c95",
  21: "482916",
  22: "267bf0",
  23: "5af7e2",
  24: "adeacc",
  25: "cf2b03",
  26: "b3c459",
  27: "353f9",
  28: "5d4993",
  29: "ba8d15",
  30: "da2457",
  31: "ff17fe",
  32: "d6e81d",
  33: "daf2db",
  34: "19b510",
  35: "18e26f",
  36: "b7c36a",
  37: "8cb175",
  38: "bdce32",
  39: "f2e0ba",
  40: "a2f8a5",
  41: "64bf50",
  42: "f1a771",
  43: "4982a9",
  44: "f66c41",
  45: "2fe802",
  46: "bda142",
  47: "8342ff",
  48: "2b4ab4",
  49: "ad4595",
  50: "bae4f",
  51: "b76d01",
  52: "8e8207",
  53: "285b9f",
  54: "c4422a",
  55: "f1eaa7",
  56: "e3a0cc",
  57: "65c116",
  58: "656ccf",
  59: "7c25f4",
  60: "1e18d1",
  61: "688a7d",
  62: "1fe786",
  63: "425716",
  64: "4ac043",
  65: "547836",
  66: "24a216",
  67: "fd9bba",
  68: "24894d",
  69: "c54b03",
  70: "6fbdce",
  71: "cff1dd",
  72: "8805fb",
  73: "fe99d2",
  74: "c52f14",
  75: "e31c54",
  76: "d010eb",
  77: "b83436",
  78: "c294b6",
  79: "564a6c",
  80: "531bcf",
  81: "c04b8c",
  82: "3cd2ef",
  83: "82286c",
  84: "aa2639",
  85: "86be6c",
  86: "e62102",
  87: "5471fc",
  88: "5c089",
  89: "703c75",
  90: "9a8e8f",
  91: "8b9307",
  92: "fcbc82",
  93: "ea5978",
  94: "b8e370",
  95: "43474b",
  96: "262d2b",
  97: "ddd67e",
  98: "344867"
  }



  const [defaultAccount, setDefaultAccount] = useState('');
  const [connButtonText, setconnButtonText] = useState('Connect Wallet');


  const [provider, setProvider] = useState('');
  const [signer, setSigner] = useState('');
  const [contract, setContract] = useState('');

  const [alltrexes, setAlltrexes] = useState([])
  const [myTrexes, setMytrexes] = useState([])



  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0]);
        setconnButtonText("Wallet Connected");
      })
    } else {
      alert('Need to install metamask!')
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
    getMyTrexes();
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, Trexcontract.abi, tempSigner);
    setContract(tempContract);
    console.log(tempContract);
  }

  const create = async() => {
    if (contract) {
    let dna = getDNA();
    console.log(dna);
    let txResponse = await contract.createtrexGen0(dna)
    console.log(txResponse)
    } else {
      alert("Please connect to the wallet")
    }
  }

  async function trexesCounts() {
    if (contract) {
      const txResponse = await contract.gen0Counter()
      console.log(txResponse.toNumber())
      return txResponse.toNumber()
    } else {
      alert("please connect")
    }

  }



  async function getMyTrexes() {
    // get all trexes
    if (contract) {
      let alltrexes = await trexesList();
      const promiseA = await resolveAllTre(alltrexes)
      console.log(promiseA)
      setMytrexes(promiseA)
      return promiseA;
    } else {
      alert("Please connect to the wallet")
    }


  }
  
  function resolveAllTre(array) {
    return new Promise((resolve) => {
      const newArr = [];
      array.forEach((item) => {
        if (item.owner.toLowerCase() == defaultAccount) {
          newArr.push(item);
        }
      });
      resolve(newArr);
     
    });

  }


  

  async function trexesList() {
    let trexCounts = await trexesCounts()
    let temptrexesList = []
    for (var i = 0; i < trexCounts; i++) {
      let txResponse = await contract.trexes(i)
      // console.log(txResponse)
      let genes_to_string = txResponse.genes.toString()
      let tempbodycolor = parseInt(genes_to_string.slice(0,2))
      let temppawscolor = parseInt(genes_to_string.slice(2,4))
      let tempbellycolor = parseInt(genes_to_string.slice(4,6))
      let tempspikes = parseInt(genes_to_string.slice(6,8))
      let tempspikescolor = parseInt(genes_to_string.slice(8,10))
      // console.log(typeof(temppawscolor))
      
      let item = {
        genes: txResponse.genes.toNumber(),
        dadId: txResponse.dadId.toNumber(),
        mumId: txResponse.mumId.toNumber(),
        generation: txResponse.generation.toNumber(),
        owner: txResponse.owner,
        bodycolor: tempbodycolor,
        pawscolor: temppawscolor,
        bellycolor: tempbellycolor,
        spikes: tempspikes,
        spikescolor: tempspikescolor,
      }
      console.log(item)
      temptrexesList.push(item)
    }
    // console.log(temptrexesList)
    return temptrexesList
  }

  // Set default dna and get dna functions ***********

  const [inputBodyCode, setInputBodyCode] = useState();
  const [inputPawCode, setInputPawCode] = useState();
  const [inputBellyCode, setInputBellyCode] = useState();

  const [inputEyeShapeCode, setInputEyeShapeCode] = useState('1');
  const [inputSpikeCode, setInputSpikeCode] = useState('1');
  const [inputSpikeColorCode, setInputSpikeColorCode] = useState('');

  const [bodyColor, setBodyColor] = useState('')
  const [pawColor, setPawColor] = useState('')
  const [bellyColor, setBellyColor] = useState('')
  const [spikeColor, setSpikeColor] = useState('')



  const defualtDNA = () => {
    setInputBodyCode('15');
    setInputPawCode('52');
    setInputBellyCode('23');
    setInputSpikeColorCode('87');
    setBodyColor('#' + allColors[inputBodyCode])
    setPawColor('#' + allColors[inputPawCode])
    setBellyColor('#' + allColors[inputBellyCode])
    setSpikeColor('#' + allColors[inputSpikeColorCode])
  };


   useEffect(() => {
    defualtDNA();
  }, []);


  function getDNA() {
    let dna = 0
    dna += inputBodyCode * 100000000
    // console.log(dna);
    dna += inputPawCode * 1000000
    // console.log(dna);
    dna += inputBellyCode * 10000
    // console.log(dna);
    dna += 100
    // console.log(dna);
    dna += inputSpikeColorCode * 1
    // console.log(dna)

    return dna
  }



  function inputBodyCodeHandler(e) {
    setInputBodyCode(e.target.value);
    setBodyColor('#' + allColors[inputBodyCode])
  }

  function inputPawCodeHandler(e) {
    setInputPawCode(e.target.value);
    setPawColor('#' + allColors[inputPawCode])
  }

  function inputBellyCodeHandler(e) {
    setInputBellyCode(e.target.value);
    setBellyColor('#' + allColors[inputBellyCode])
  }

  function inputSpikeCodeHandler(e) {
    setInputSpikeCode(e.target.value);

    if (e.target.value == 1) {
    document.querySelector(".spikes").classList.add('hidden');
    } else {
    document.querySelector(".spikes").classList.remove('hidden');
    }
  }

  function inputSpikeColorCodeHandler(e) {
    setInputSpikeColorCode(e.target.value);
    setSpikeColor('#' + allColors[inputSpikeColorCode])
  }

  // console.log('test' + spikeColor)

  return (
    <div>
      <head>
        <title>Crypto T-rex | Create</title>
      </head>
      <div className=" center">
        <div className="center title">
          <h1>T-rex Factory</h1>
          <p>Create Your Custom Crypto T-rex</p>
        </div>

        <div>
            <button onClick={connectWalletHandler}> {connButtonText} </button>
            <button onClick={create}>Create</button>
            {/* <button onClick={trexesCounts}>trexesCounts</button>
            <button onClick={trexesList}>trexeslist</button> */}
            <button onClick={getMyTrexes}>getMyTrexes</button>
            {/* <button onClick={getMyTrexesList}>Mytrexes</button>
            <button onClick={getcurrentMyTrexes}>getcurrentMyTrexes</button> */}
        </div>

        <div className="container">

          <div className="wrapper">
            <DinoDisplay bodyColor={bodyColor} pawColor={pawColor} bellyColor={bellyColor} spikeColor={spikeColor} inputSpikeCode={inputSpikeCode} />

            <div className="dino-setting">
              <form>
                <div className="form-group">
                  <div className="form-info">
                    <label htmlFor="formControlRange">Head and body:</label>
                    <span id="headcode" className="code-tag">code {inputBodyCode}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="98"
                    className="formControlRange"
                    id="bodycolor"
                    value={inputBodyCode}
                    onChange={inputBodyCodeHandler}
                  />
                </div>

                <div className="form-group">
                  <div className="form-info">
                    <label htmlFor="formControlRange">Paws:</label>
                    <span id="pawcode" className="code-tag">code {inputPawCode}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="98"
                    className="formControlRange"
                    id="pawcolor"
                    value={inputPawCode}
                    onChange={inputPawCodeHandler}
                  />
                </div>

                <div className="form-group">
                  <div className="form-info">
                    <label htmlFor="formControlRange">Belly:</label>
                    <span id="bellycode" className="code-tag">code {inputBellyCode}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="98"
                    className="formControlRange"
                    id="bellycolor"
                    value={inputBellyCode}
                    onChange={inputBellyCodeHandler}
                  />
                </div>

                <div className="form-group">
                  <div className="form-info">
                    <label htmlFor="formControlRange">Spikes:</label>
                    <span id="spikecode" className="code-tag">code {inputSpikeCode}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2"
                    className="formControlRange"
                    id="spikeshape"
                    // value={inputSpikeColorCode}
                    onChange={inputSpikeCodeHandler}
                  />
                </div>

                <div className="form-group">
                  <div className="form-info">
                    <label htmlFor="formControlRange">Spike color:</label>
                    <span id="spikecolorcode" className="code-tag">code {inputSpikeColorCode}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="98"
                    className="formControlRange"
                    id="spikecolor"
                    value={inputSpikeColorCode}
                    onChange={inputSpikeColorCodeHandler}
                  />
                </div>

                {/* <input type="submit" value="Submit" /> */}
              </form>
            </div>
          </div>

          <div className="dna-info">

            DNA:
            {/* Colors */}
            <span id="dnabody"> {inputBodyCode} </span>
            <span id="dnapaws">{inputPawCode} </span>
            <span id="dnabelly">{inputBellyCode} </span>

            {/* Attributes */}
            <span id="dnaspike">{inputSpikeCode} </span>
            <span id="dnaspikecolor">{inputSpikeColorCode} </span>
            <span id="dnadanimation"></span>

          </div>
        </div>


        <div>
         <h3>My T-rex List Genes</h3>
            <div>
              {myTrexes.map((item, i) => (
                  <p key={i}>{myTrexes && myTrexes.length && myTrexes[i] && myTrexes[i].genes}</p>
                ))}
            </div>
        </div>

        <div className="created-dinos">

          {myTrexes
            .map((myTrex, id) =>(
            
            <DinoDisplay key={id} bodyColor={'#' + allColors[myTrex.bodycolor -1 ]} pawColor={'#' + allColors[myTrex.pawscolor - 1]} bellyColor={'#' + allColors[myTrex.bellyColor - 1]} spikeColor={'#' + allColors[myTrex.spikescolor - 1]} inputSpikeCode={'#' + allColors[myTrex.spikes - 1]}/>
          ))}

        </div>

      </div>
    </div>
  );
  }
