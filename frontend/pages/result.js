import styles from "../styles/Result.module.css";
import Web3Modal from "web3modal";
import { BigNumber, providers, Contract, ethers, utils } from "ethers";
import { useEffect, useRef, useState } from "react";
import { VOTE_CONTRACT_ADDRESS, abi } from "../constants";
import Layout from "../components/Layout";
function Result() {
  const [winName, setWinName] = useState("");
  const [numCandidates, setNumCandidates] = useState("");
  const [numVoters, setNumVoters] = useState("");
  const [leftToVote, setLeftToVote] = useState("");

  const [winVote, setWinVote] = useState(0);

  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const zero = BigNumber.from(0);

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


  /* Winner Name  and Winner Vote-Count*/
  const winnerName = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);
      const name = await votingContract.winnerName();
      setWinName(parseBytes(name));
      //console.log(name, "winner");
    } catch (error) {
      console.error(error);
    }
  };

  const winnerVotes = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);
      const count = await votingContract.winnerVotes();

      count = utils.formatEther(count) * 1000000000000000000;
      setWinVote(count);
      //let no =
      console.log(count, "winner");
    } catch (error) {
      console.error(error);
    }
  };
  /////////////////////=========================>

  function winHandler() {
    winnerVotes();
    winnerName();
  }

  

  return (
    <>
      <Layout title="result">
        <div className={styles.main}>
          <div className={styles.win}>
            <h3>Winner : {winName}</h3>

            <h3>Total Votes : {winVote}</h3>
            <button className={styles.btn} onClick={winHandler}>
              Show Winner
            </button>
          </div>

        </div>
      </Layout>
    </>
  );
}

export default Result;
