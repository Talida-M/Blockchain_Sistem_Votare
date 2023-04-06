import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { VOTE_CONTRACT_ADDRESS, abi } from "../constants";
import Layout from "../components/Layout";
import Candidates from "../components/Candidates";
import { ethers } from "ethers";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const [selectedHouse, setSelectedHouse] = useState([]);
  const [candidati, setCandidates] = useState(["hhhjjh"]);

  const getCandidates = async () => {
    try {
      const provider = await getProviderOrSigner(true);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);
      const overrides = {
        gasPrice: 0,
      };
      const candidates = await votingContract.getPropuneri(overrides);
      console.log("candidates: ", candidates);
      setCandidates(candidates);
    } catch (error) {
      console.error(error);
    }
  };


  ////////////////////////////



  ////////////////
  // converter
  function createBytes(args) {
    const name = args;
    const bytes = ethers.utils.formatBytes32String(name);
    console.log("Bytes:", bytes);
    return bytes;
  }

  function parseBytes(args) {
    const bytes = args;
    const name = ethers.utils.parseBytes32String(bytes);
    console.log("name: ", name);
  }

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    if (needSigner) {
      const signer = web3Provider.getSigner();
      console.log(signer);
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
    getCandidates();
  }, [walletConnected]);

  function handleInputChange(event) {
    console.log(event.target.value);
    setSelectedHouse(event.target.value);
  }

  function submitHandler() {
    console.log(selectedHouse);
    toVote(selectedHouse - 1);
    console.log(selectedHouse);
    setSelectedHouse([]);
  }

  /* Vote to the Candidate */

  const toVote = async (ID) => {
    try {
      const signer = await getProviderOrSigner(true);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
      const overrides = {
        gasPrice: 0,
      };
      const tx = await votingContract.vot(ID, overrides);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout title="">
        <div className={styles.main}>
          k
          <div className={styles.table}>
            <table>
              <thead>
                <tr className={styles.tr}>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const rows = [];
                  for (let i = 0; i < candidati.length; i++) {
                    rows.push(
                      <tr key={i}>
                        <td>{i}</td>
                        <td>{candidati[i]}</td>
                      </tr>
                    );
                  }
                  return rows;
                })()}
              </tbody>
            </table>
          </div>
          <div className={styles.option}>
            <input
              type="number"
              name="Houses"
              value={selectedHouse}
              onChange={handleInputChange}
            />
            <button onClick={submitHandler}>Vote</button>
          </div>
        </div>
      </Layout>
    </>
  );
}
