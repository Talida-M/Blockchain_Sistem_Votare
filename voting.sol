pragma solidity >=0.8.0 <0.9.0;

contract BuletinVot {
    uint256 candidateCount;

    struct Votant {
        uint vot;
        bool votare;
        uint urmarireVot; //tine evidenta numarului de voturi
    }

    struct PropunereVot {
        bytes32 nume;
        uint numarVoturi;
    }

    PropunereVot[] public propuneri;

    mapping(address => Votant) public votanti;

    address public admin;

    constructor() {
        //bytes32[] memory numePropuneri;
        // admin = msg.sender;
        // admin =0x5af2d223f65E5181F9BE1e9Efb8e5127fc5FeB9f;// 0xd9145CCE52D386f254917e481eB44e9943F39138;
    }

function getPropuneri() public   returns (PropunereVot[] memory ceva) {

        for (uint i = 0; i < propuneri.length; i++) {
            ceva[i] = propuneri[i];
        }
        bytes memory payload = abi.encodeWithSignature("vot(uint256)", ceva );
        (bool success, ) = msg.sender.call{value: 0, gas: gasleft()}(payload);
        require(success, "Transaction failed");
        return ceva;
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

    function addCandidate(bytes32 numeAlegator) public accesAdmin {
        require(msg.sender == admin, "Doar adminul poate adauga candidati");
        
        PropunereVot memory newCandidate =
            PropunereVot({
                nume: numeAlegator,
                numarVoturi: 0
            });
        propuneri[candidateCount] = newCandidate;
        candidateCount += 1;
       // propuneri.push(PropunereVot({nume: numeAlegator, numarVoturi: 0}));
    }

    function dreptVot(address votant) public {
        require(msg.sender == admin, "Doar adminul poate da acces la vot");
        require(!votanti[votant].votare, "Votantul deja a  inregistrat un vot");
        require(votanti[votant].urmarireVot == 0);
        votanti[votant].urmarireVot = 1;
    }

    function vot(uint propunereVot) public {
        Votant storage sender = votanti[msg.sender]; //////////////////////////////////////////aici cei csndidatii sunt in storage
        require(sender.urmarireVot != 0, "Nu are drept de vot!");
        require(!sender.votare, "Deja a votat");
        sender.votare = true;
        sender.vot = propunereVot;

        propuneri[propunereVot].numarVoturi =
            propuneri[propunereVot].numarVoturi +
            sender.urmarireVot;
        bytes memory payload = abi.encodeWithSignature(
            "vot(uint256)",
            propunereVot
        );
        (bool success, ) = msg.sender.call{value: 0, gas: gasleft()}(payload);
        require(success, "Transaction failed");
    }

    function castigatorAlegeri()
        public
        view
        returns (uint candidatCastigator_)
    {
        uint numarVoturiCastigator = 0;
        for (uint i = 0; i < propuneri.length; i++) {
            if (propuneri[i].numarVoturi > numarVoturiCastigator) {
                numarVoturiCastigator = propuneri[i].numarVoturi;
                candidatCastigator_ = i;
            }
        }
    }

    function numeleCastigatorului()
        public
        view
        returns (bytes32 numeleCastigatorului_)
    {
        numeleCastigatorului_ = propuneri[castigatorAlegeri()].nume;
    }
}
