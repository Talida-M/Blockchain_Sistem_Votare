pragma solidity >=0.8.0 <0.9.0;

contract BuletinVot {

    struct Votant {
        uint vot;
        bool votare;
        uint urmarireVot; //tine evidenta numarului de voturi
    }

    // struct PropunereVot {
    //     bytes32 nume;
    //     uint numarVoturi;
    // }

   // PropunereVot[] public propuneri;

    mapping(address => Votant) public votanti;
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => bool) public validCandidate;
    mapping(bytes32 => uint256) public votes;
    bytes32[] public candidates;
    address public admin;

    constructor(bytes32[] memory candidatii) {
        votanti[admin].urmarireVot = 1;

        for (uint i = 0; i < candidatii.length; i++) {
            candidates.push(candidatii[i]);
            validCandidate[candidates[i]] = true;
            // propuneri.push(PropunereVot({nume: candidatii[i], numarVoturi: 0}));
        }

        //bytes32[] memory numePropuneri;
        // admin = msg.sender;
        // admin =0x5af2d223f65E5181F9BE1e9Efb8e5127fc5FeB9f;// 0xd9145CCE52D386f254917e481eB44e9943F39138;
    }

    function getPropuneri() public returns (bytes32[] memory propunerile) {
        propunerile = new bytes32[](candidates.length);

        for (uint i = 0; i < candidates.length; i++) {
            propunerile[i] = candidates[i];
        }
        bytes memory payload = abi.encodeWithSignature(
            "vot(uint256)",
            propunerile
        );
        (bool success, ) = msg.sender.call{value: 0, gas: gasleft()}(payload);
        require(success, "Transaction failed");
    }

    // function getPropuneri() public view returns (bytes32[] memory, uint[] memory) {
    //     bytes32[] memory numePropuneri = new bytes32[](propuneri.length);
    //     uint[] memory indices = new uint[](propuneri.length);

    //     for (uint i = 0; i < propuneri.length; i++) {
    //         numePropuneri[i] = propuneri[i].nume;
    //         indices[i] = i;
    //     }

    //     return (numePropuneri, indices);
    // }

    function setAdmin(address _admin) public {
        require(admin == address(0), "Adminul a fost deja setat");
        admin = _admin;
        bytes memory payload = abi.encodeWithSignature("vot(uint256)", admin);
        (bool success, ) = msg.sender.call{value: 0, gas: gasleft()}(payload);
        require(success, "Transaction failed");
    }

    modifier accesAdmin() {
        require(
            msg.sender == admin,
            "Doar adminul poate face aceasta operatie"
        );
        _;
    }

    //  function getAdmin() public {
    //      admin = msg.sender;
    //     }

    //     modifier accesAdmin() {
    //         require(msg.sender == admin);
    //         _;
    //     }
    function addCandidate(bytes32 numeCandidat) public accesAdmin {
        require(msg.sender == admin, "Doar adminul poate adauga candidati");
        candidates.push(numeCandidat);
        validCandidate[numeCandidat] = true;
        // propuneri.push(PropunereVot({nume: numeCandidat, numarVoturi: 0}));
        //candidateCount += 1;
    }
    // function addCandidate(bytes32 numeCandidat) public accesAdmin {
    //     require(msg.sender == admin, "Doar adminul poate adauga candidati");
    //     candidates.push(numeCandidat);
    //     PropunereVot memory newCandidate = PropunereVot({
    //         nume: numeCandidat,
    //         numarVoturi: 0
    //     });
    //     propuneri[candidateCount] = newCandidate;
    //     candidateCount += 1;
    //     // propuneri.push(PropunereVot({nume: numeAlegator, numarVoturi: 0}));
    // }

    function dreptVot(address votant) public {
        require(msg.sender == admin, "Doar adminul poate da acces la vot");
        require(!votanti[votant].votare, "Votantul deja a  inregistrat un vot");
        require(votanti[votant].urmarireVot == 0);
        votanti[votant].urmarireVot = 1;
    }

    function vot(uint candidate) public {
        Votant storage sender = votanti[msg.sender];
        require(sender.urmarireVot != 0, "Nu are drept de vot!");
        require(!sender.votare, "Deja a votat");
        sender.votare = true;
        sender.vot = candidate; // pe cine a votat 

        bytes32 nume  = candidates[candidate];
        votes[nume] += 1;
        hasVoted[msg.sender] = true;
        // propuneri[candidate].numarVoturi =  propuneri[candidate].numarVoturi + sender.urmarireVot;
        bytes memory payload = abi.encodeWithSignature(
            "vot(uint256)",
            candidate
        );
        (bool success, ) = msg.sender.call{value: 0, gas: gasleft()}(payload);
        require(success, "Transaction failed");
    }

    // function vot(uint propunereVot) public {
    //     Votant storage sender = votanti[msg.sender]; //////////////////////////////////////////aici cei csndidatii sunt in storage
    //     require(sender.urmarireVot != 0, "Nu are drept de vot!");
    //     require(!sender.votare, "Deja a votat");
    //     sender.votare = true;
    //     sender.vot = propunereVot;

    //     propuneri[propunereVot].numarVoturi =
    //         propuneri[propunereVot].numarVoturi +
    //         sender.urmarireVot;
    //     bytes memory payload = abi.encodeWithSignature(
    //         "vot(uint256)",
    //         propunereVot
    //     );
    //     (bool success, ) = msg.sender.call{value: 0, gas: gasleft()}(payload);
    //     require(success, "Transaction failed");
    // }

    //     function vot(bytes32 candidate) public {
    //       require(!hasVoted[msg.sender]);
    //       require(validCandidate[candidate]);
    //       votes[candidate] +=1;
    //       hasVoted[msg.sender] = true;
    // }

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

    // function castigatorAlegeri()
    //     public
    //     view
    //     returns (uint candidatCastigator_)
    // {
    //     uint numarVoturiCastigator = 0;
    //     for (uint i = 0; i < propuneri.length; i++) {
    //         if (propuneri[i].numarVoturi > numarVoturiCastigator) {
    //             numarVoturiCastigator = propuneri[i].numarVoturi;
    //             candidatCastigator_ = i;
    //         }
    //     }
    // }

    // function numeleCastigatorului()
    //     public
    //     view
    //     returns (bytes32 numeleCastigatorului_)
    // {
    //     numeleCastigatorului_ = propuneri[castigatorAlegeri()].nume;
    // }
}
