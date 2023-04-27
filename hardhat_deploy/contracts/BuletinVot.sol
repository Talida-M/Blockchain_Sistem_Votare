pragma solidity >=0.8.0 <0.9.0;

contract BuletinVot {

    struct Votant {
        uint vot;
        bool votare;
        uint urmarireVot; //tine evidenta numarului de voturi
    }

    mapping(address => Votant) public votanti;
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => bool) public validCandidate;
    mapping(bytes32 => uint256) public votes;
    bytes32[] public candidates;
    address public admin;

    constructor(bytes32[] memory candidatii) {
        votanti[admin].urmarireVot = 1;
        admin = msg.sender;
        for (uint i = 0; i < candidatii.length; i++) {
            candidates.push(candidatii[i]);
            validCandidate[candidates[i]] = true;
        }
    }

    function getPropuneri() public view returns (bytes32[] memory propunerile) {
        propunerile = new bytes32[](candidates.length);

        for (uint i = 0; i < candidates.length; i++) {
            propunerile[i] = candidates[i];
        }
    }

    modifier accesAdmin() {
        require(msg.sender == admin, "Doar adminul poate face aceasta operatie");
        _;
    }

    function addCandidate(bytes32 numeCandidat) public accesAdmin {
        candidates.push(numeCandidat);
        validCandidate[numeCandidat] = true;

    }

    function dreptVot(address votant) public {
        require(msg.sender == admin, "Doar adminul poate da acces la vot");
        require(!votanti[votant].votare, "Votantul deja a  inregistrat un vot");
        require(votanti[votant].urmarireVot == 0);
        votanti[votant].urmarireVot = 1;
    }

    function vot(uint candidate) public {
        require(votanti[msg.sender].urmarireVot != 0, "Nu are drept de vot!");
        require(!votanti[msg.sender].votare, "Deja a votat");
        votanti[msg.sender].votare = true;
        votanti[msg.sender].vot = candidate; // pe cine a votat 

        bytes32 nume  = candidates[candidate];
        votes[nume] += 1;
        hasVoted[msg.sender] = true;
    }

    function numarVoturi(
        bytes32 candidateName
    ) public view returns (uint nrCandidateVotes) {
        nrCandidateVotes = votes[candidateName];
    }

    function candidateWinner() public view returns (bytes32 winnerName) {
        uint numarVoturiCastigator = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (votes[candidates[i]] > numarVoturiCastigator) {
                numarVoturiCastigator = votes[candidates[i]];
                winnerName = candidates[i];
            }
        }
    }

}