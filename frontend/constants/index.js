export const VOTE_CONTRACT_ADDRESS =
  "0xd9145CCE52D386f254917e481eB44e9943F39138";
export const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_admin",
        "type": "address"
      }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
 
  {
    "inputs": [],
    "name": "getPropuneri",
    "outputs": [ {
      "internalType": "struct BuletinVot.PropunereVot[]",
      "name": "ceva",
      "type": "struct BuletinVot.PropunereVot[]"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "candidateID",
        type: "uint256",
      },
    ],
    name: "toVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "numeAlegator",
        type: "bytes32",
      },
    ],
    name: "adaugaCandidat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "nume",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "numarVoturi",
            type: "uint256",
          },
        ],
        internalType: "struct BuletinVot.PropunereVot[]",
        name: "numePropuneri",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  
  {
    inputs: [
      {
        internalType: "address",
        name: "votant",
        type: "address",
      },
    ],
    name: "dreptVot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propunereVot",
        type: "uint256",
      },
    ],
    name: "vot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "castigatorAlegeri",
    outputs: [
      {
        internalType: "uint256",
        name: "candidatCastigator_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numeleCastigatorului",
    outputs: [
      {
        internalType: "bytes32",
        name: "numeleCastigatorului_",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// export const abi = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "totalVoted",
//         type: "uint256",
//       },
//     ],
//     name: "toVoteEvent",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "castigatorAlegeri",
//     outputs: [{
//       candidatCastigator_: "uint256"
//     }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "numeleCastigatorului",
//     outputs: [{
//       numeleCastigatorului_: "bytes32"
//     }],
//     stateMutability: "view",
//     type: "function",
//   },

//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "_name",
//         type: "bytes32",
//       },
//       {
//         internalType: "bytes32",
//         name: "_party",
//         type: "bytes32",
//       },
//     ],
//     name: "addCandidate",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },

//   {
//     inputs: [],
//     name: "winnerVotes",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "vot",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
