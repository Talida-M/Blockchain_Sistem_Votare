import styles from "../styles/Result.module.css";
import Web3Modal from "web3modal";
import { BigNumber, providers, Contract, ethers, utils } from "ethers";
import { useEffect, useRef, useState } from "react";
import { VOTE_CONTRACT_ADDRESS, abi } from "../constants";
import Layout from "../components/Layout";
function Result() {
  const [winName, setWinName] = useState("");
  const [winNameBytes, setWinNameBytes] = useState("");
  const [numCandidates, setNumCandidates] = useState("");
  let bytesN;
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
    return name;
  }
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
        network: "mainnet",
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
      const name = await votingContract.candidateWinner();
      const nume = parseBytes(name);
      setWinName(nume);
      console.log(name, "winner");
      console.log(winName, "winnName");
      winnerVotes(nume);
    } catch (error) {
      console.error(error);
    }
  };

  
  const winnerVotes = async (nume) => {
    try {
      const provider = await getProviderOrSigner(false);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);
      console.log(nume, "winName1");
      console.log(createBytes(nume), "byteees");
      const count = await votingContract.numarVoturi(createBytes(nume));
      count = utils.formatEther(count) * 1000000000000000000;
      setWinVote(count);
      //let no =
      console.log(count, "number winner");
    } catch (error) {
      console.error(error);
    }
  };
  /////////////////////=========================>

  function winHandler() {
    winnerName();
   // winnerVotes();
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
