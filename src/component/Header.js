import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BrowserProvider, formatEther } from "ethers";

function Header() {

      const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    
    const provider = new BrowserProvider(window.ethereum);

     const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
        setAccount(address);
        
        console.log('address', address);

        const rawBalance = await provider.getBalance(address);
        
        console.log("rawBalance", rawBalance);

      setBalance(parseFloat(formatEther(rawBalance)).toFixed(4));
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // Listen to account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          await connectWallet();
        } else {
          setAccount(null);
          setBalance(null);
        }
      });
    }
  }, []);


    return (
        <nav className="navbar navbar-default navbar-trans navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand text-brand" to="/">
                    <img src="images/logo.png" alt="" />
                    <span></span>
                    </Link>
                <div
                className="navbar-collapse collapse justify-content-left"
                id="navbarDefault"
                >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" title="Stake">
                            BSC Stake
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="#"
                            title="Supports"
                            data-toggle="modal"
                            data-target="#myModal-14"
                        >
                            Support
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/faq">
                            FAQ
                        </a>
                    </li>

                    <div className="modal" id="myModal-14">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Support</h4>
                            <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            >
                            &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="liquidity">
                            <h4>Visit www.bitgert.com for Live Chat Support.</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </ul>
                </div>
                <div className="right-side" style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <button type="button" className="btn btn-danger" disabled={account} onClick={(e) => {
                        e.preventDefault();
                        connectWallet();
                    }}>
                        { account ? `${account.slice(0, 5)}...${account.slice(38, 42)}` : 'Connect Wallet' }
                    </button>
                    {
                        account ? <p className="wallet-balance" style={{
                            margin: '0 0 0 20px',
                            color: 'white',
                            fontWeight: '600'
                        }}>Balance: { balance }</p> : null
                    }
                    
                {/* <ul>
                    <li>
                    </li>
                </ul> */}
                </div>
                <button
                className="navbar-toggler collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarDefault"
                aria-controls="navbarDefault"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span></span> <span></span> <span></span>{" "}
                </button>
            </div>
        </nav>
    );
}

export default Header;
