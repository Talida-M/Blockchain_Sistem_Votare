import Web3Modal from "web3modal";
import { providers, Contract, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { VOTE_CONTRACT_ADDRESS, abi } from "../constants";
import Layout from "../components/Layout";
import styles from "../styles/Admin.module.css";

function Admin() {
  const [numVoters, setNumVoters] = useState();
  const [numCandidates, setNumCandidates] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);


  const web3ModalRef = useRef();

  
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
  }, [walletConnected]);

  const VotOwner = async () => {
    
    const signer = await getProviderOrSigner(true);
    const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
    const overrides = {
      gasPrice: 0
    };
    
    const address = await signer.getAddress();
    const result = await votingContract.setAdmin(address, overrides);
    console.log(result);
    setIsAdmin(true);

    // const aa = await votingContract.getAdmin();

    const oww = await votingContract.owner;
  };

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

  ///////////////////////////////////////////////////
  /* Add Candidate  */

  const validateInput = (e) => {
    e.preventDefault();
    console.log(name);
    const bytesname = createBytes(name);
    parseBytes(bytesname);
    console.log("dff", bytesname);
   
    adaugaCandidat(bytesname);

    setName("");
  };

  const adaugaCandidat = async (name) => {
    try {

  
      const signer = await getProviderOrSigner(true);

      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
      const overrides = {
        gasPrice: 0
      };
      
      // Covert this to bytes32
      if(isAdmin === true){
        const tx = await votingContract.adaugaCandidat(name, overrides);
        const candidates = await votingContract.propuneri(0).call();
        console.log("candidates: ", candidates);
        console.log("succes", tx);
        await tx.wait();
      
     
      }
      else{
        window.alert("Doar adminul poate  adauga un candidat");
        throw new Error("Doar adminul poate adauga un candidat");
      }
  
      
      // await getNumOfCandidates();
    } catch (error) {
      console.error(error);
    }


  };

  ////////////////////==================>

  /* verify the voter */
  const inputRef = useRef(null);

  function verifyHandler() {
    const id = inputRef.current.value;
    getRightToVote(id);
    console.log(id);
  }

  const getRightToVote = async (ID) => {
    
    try {

      const signer = await getProviderOrSigner(true);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
      const overrides = {
        gasPrice: 0
      };
      if(isAdmin === true)
      {

          const tx = await votingContract.dreptVot(ID, overrides);
          console.log(tx);
      }
      else{
        window.alert("Doar adminul poate  oferi drept de vot");
        throw new Error("Doar adminul poate  oferi drept de vot");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout title="election-chief">
        <div className={styles.admindiv}>
          <div className={styles.main}>
            <div className={styles.own}>
              <span>
                <button className={styles.btn} onClick={VotOwner}>
                Devino admin
                </button>
              </span>
            </div>
          <div>
          <button className={styles.btn2} onClick={connectWallet}>
                          Connect the wallet
                        </button>
          </div>
          </div>

          <div>
            <div className={styles.form_div}>
              <p>Adauga candidat alegeri :</p>
              <form className={styles.form} onSubmit={validateInput}>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nume Candidat"
                />
                <button className={styles.btn3} type="submit">
                  Adauga
                </button>
              </form>
            </div>
          </div>

          <div className={styles.verify_div}>
            <div className={styles.verify}>
              <p>Drept vot alegator:</p>
              <input
                className={styles.voterid}
                placeholder="Id"
                type="text"
                ref={inputRef}
              />
              <button className={styles.btn4} onClick={verifyHandler}>
                Finalizare
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Admin;
