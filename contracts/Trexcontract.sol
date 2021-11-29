// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";

contract Trexcontract is IERC721 {

  uint256 public constant Creation_Limit_Gen0 = 100;
  string public constant Name = "Trex";
  string public constant Symbol = "TRX";
  address public __owner = msg.sender;
  bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
  
bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;



  event Birth(address owner, uint256 trexId, uint256 mumId, uint256 dadId, uint256 genes);


  modifier onlyOwner(){
        require(__owner == msg.sender);
        _;
    }


  struct Trex {
    uint256 genes;
    uint256 birthTime;
    uint256 mumId;
    uint256 dadId;
    uint256 generation;
    address owner;
  }

  Trex[] public trexes;

  mapping(uint256 => address) public trexIndexToOwner;
  mapping(address => uint256) ownershipTokenCount;

  mapping(uint256 => address) public trexIndexToApproved;
  mapping(address => mapping(address => bool)) private _operatorApprovals;

  uint256 public gen0Counter;


  function breed(uint256 _dadId, uint256 _mumId) public returns (uint256) {
    require(_owns(msg.sender, _dadId), "the user does not own the token");
    require(_owns(msg.sender, _mumId), "the user does not own the token");

    (uint256 dadDna,,,,uint256 DadGeneration) = getTrex(_dadId);
    (uint256 mumDna,,,,uint256 MumGeneration) = getTrex(_mumId);
    
    uint256 newDna = _mixDna(dadDna, mumDna);

    uint256 kidGen = 0;
    if (DadGeneration < MumGeneration){
      kidGen = MumGeneration + 1;
      kidGen /= 2;
    } else if (DadGeneration > MumGeneration) {
      kidGen = DadGeneration + 1;
      kidGen /= 2;
    } else {
      kidGen = MumGeneration + 1;
    }

    _createTrex(_mumId, _dadId, kidGen, newDna, msg.sender);
  }

  function supportInterface(bytes4 _interfaceId) external pure returns (bool){
    return ( _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
  }
 
  function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
    _transfer(_from, _to, _tokenId);
    require(_checkERC721Support(_from, _to, _tokenId, _data));
  }

 function createtrexGen0(uint256 _genes) public {
    require(gen0Counter < Creation_Limit_Gen0);
    gen0Counter++;

    _createTrex(0, 0, 0, _genes, msg.sender);
}

  function _createTrex(
    uint256 _mumId,
    uint256 _dadId,
    uint256 _generation,
    uint256 _genes,
    address _owner
  ) private returns (uint256) {
    Trex memory _trex = Trex({
      genes: _genes,
      birthTime: uint256(block.timestamp),
      mumId: uint256(_mumId),
      dadId: uint256(_dadId),
      generation: uint256(_generation),
      owner: _owner
    });

   trexes.push(_trex);
   uint256 newTrexId =  trexes.length - 1;

   emit Birth(_owner, newTrexId, _mumId, _dadId, _genes);

   _transfer(address(0), _owner, newTrexId);

   return newTrexId;

  }


  function getTrex(uint256 tokenId) public view returns(
    uint256 genes,
    uint256 birthTime, 
    uint256 mumId, 
    uint256 dadId, 
    uint256 generation
  ) 
  {
    Trex storage _trex = trexes[tokenId];

    birthTime = uint256(_trex.birthTime);
    mumId = uint256(_trex.mumId);
    dadId = uint256(_trex.dadId);
    generation = uint256(_trex.generation);
    genes = uint256(_trex.genes);

  }


  function balanceOf(address owner) external view returns (uint256 balance) {
    return ownershipTokenCount[owner];
  }

  function totalSupply() external view onlyOwner returns  (uint256 total) {
    return trexes.length;
  }

  function name() external view returns (string memory tokenName) {
    return Name;
  }

  function symbol() external view returns (string memory tokenSymbol) {
    return Symbol;
  }

  function ownerOf(uint256 tokenId) external view returns (address owner) {
    return trexIndexToOwner[tokenId];
  }

  function transfer(address _to, uint256 _tokenId) external{
    require(_to != address(0), "To address must be defined.");
    require(_to != address(this), "Cannot transfer to the contract itself.");
    require(_owns(msg.sender, _tokenId));

    _transfer(msg.sender, _to, _tokenId);
  
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
    ownershipTokenCount[_to]++;

    trexIndexToOwner[_tokenId] = _to;

    if (_from != address(0)) {
      ownershipTokenCount[_from] --;
      delete trexIndexToApproved[_tokenId];
    }

    emit Transfer(_from, _to, _tokenId);
  }

  function _owns(address _claiment, uint256 _tokenId) internal view returns (bool) {
    return trexIndexToOwner[_tokenId] == _claiment;
  }

  function _approve(uint256 _tokenId, address _approved) internal {
    trexIndexToApproved[_tokenId] = _approved;
  }

  function _approvedFor(address _claiment, uint256 _tokenId) internal view returns (bool) {
    return trexIndexToApproved[_tokenId] == _claiment;
  }

  function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool) {
    if( !_isContract(_to) ){
      return true;
    } 
    
    //onERC721Recieved on _to contract and check return value
    bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
    return returnData == MAGIC_ERC721_RECEIVED;

  }

  function approve(address _to, uint256 _tokenId) public {
    require(_owns(msg.sender, _tokenId));

    _approve(_tokenId, _to);
    emit Approval(msg.sender, _to, _tokenId);
  }


  function setApprovalForAll(address operator, bool approved) public {
    require(operator != msg.sender);

    _operatorApprovals[msg.sender][operator] = approved;
    emit ApprovalForAll(msg.sender, operator, approved);
  }

  function getApproved(uint256 tokenId) public view returns (address) {
    require(tokenId < trexes.length); //Token must exist in the
    
    return trexIndexToApproved[tokenId];
  }
  

  function isApprovedForAll(address owner, address _operator) public view returns (bool) {
    return _operatorApprovals[owner][_operator];
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public {
    require( _isApprovedOrOwner(msg.sender, _from, _to, _tokenId));
    _safeTransfer(_from, _to, _tokenId, _data);
  }


  function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
    safeTransferFrom(_from, _to, _tokenId, "");
  }


  function transferFrom(address _from, address _to, uint256 _tokenId) public {
    require (_isApprovedOrOwner(msg.sender, _from, _to, _tokenId));

    _transfer(_from, _to, _tokenId);
  }

  function _isContract(address _to) internal view returns (bool) {
    uint32 size;
    assembly{
      size := extcodesize(_to)
    }
    return size > 0;
  }

  function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal view returns (bool) {
    require(_to != address(0)); 
    require(_owns(_from, _tokenId));
    require(_tokenId < trexes.length);

    return (msg.sender == _from || _approvedFor(_spender, _tokenId) || isApprovedForAll(_from, _spender));
  }

  function _mixDna(uint256 _dadDna, uint256 _mumDna) internal pure returns (uint256) {
    // 11 22 33 44 55 66 77 88 
    // 88 77 66 55 44 33 22 11
    uint256 firstHalf= _dadDna / 100000000; // 11223344
    uint256 secondHalf= _mumDna % 100000000; //44332211

    uint256 newDna = firstHalf * 100000000; //1122334400000000
    newDna = newDna + secondHalf; //1122334444332211
    return newDna;
  }
}
