import React, { useEffect } from "react";


const DinoDisplay = (props) => {

  const spikeStatus = props.inputSpikeCode

  useEffect(() => {
      // alert('Finished loading');
        const addclass=()=>{
          if (spikeStatus === 1) {
            document.querySelector(".spikes").classList.add('hidden');
          } else {
            document.querySelector(".spikes").classList.remove('hidden');
          }
        }
      }, []);
      // console.log(document.querySelector(".spikes"))


  return (
    <div className="dino-display">
              <div className="dino">
                {/* ****** Attribute:spikes ***** */}
                <div className="spikes">
                  <div className="spike-3 spike" style={{borderBottomColor: props.spikeColor}}></div>
                  <div className="spike-2 spike" style={{borderBottomColor: props.spikeColor}}></div>
                  <div className="spike-1 spike" style={{borderBottomColor: props.spikeColor}}></div>
                  <div className="spike-4 spike" style={{borderBottomColor: props.spikeColor}}></div>
                  <div className="spike-5 spike" style={{borderBottomColor: props.spikeColor}}></div>
                  <div className="spike-6 spike" style={{borderBottomColor: props.spikeColor}}></div>
                </div>
                {/* ****** Attribute:decorative pattern ***** */}
                <div className="pattern pattern-scar"></div>
                <div className="pattern-headphone"></div>
                <div className="pattern-spotty"></div>

                <div>
                  <div className="head">
                    <div className="head-wrapper">
                      <div className="head-top" style={{background: props.bodyColor}}></div>
                      <div className="head-mid" style={{background: props.bodyColor}}></div>
                      <div className="head-right" style={{background: props.bodyColor}}></div>
                    </div>

                    {/* ****** Attribute: eyeshape ***** */}
                    {/* <div className="eye eye-round">
                      <div className="eye-hl-sm"></div>
                      <div className="eye-hl-lg"></div>
                    </div> */}
                    <div className="eye-angry"></div>

                    <div className="nose-left"></div>
                    <div className="nose-right"></div>
                    <div className="mouth"></div>
                    {/* <div className="mouth-smile"></div> */}
                  </div>

                  <div className="body">
                    <div className="body-wrapper">
                      <div className="body-tail" style={{background: props.bodyColor}}></div>
                      <div className="body-main" style={{background: props.bodyColor}}></div>
                    </div>
                    <div className="left-hand hand" style={{background: props.pawColor}}></div>
                    <div className="right-hand hand" style={{background: props.pawColor}}></div>
                    <div className="belly" style={{background: props.bellyColor}}></div>
                    <div className="left-foot foot" style={{background: props.pawColor}}></div>
                    <div className="right-foot foot" style={{background: props.pawColor}}></div>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default DinoDisplay;
