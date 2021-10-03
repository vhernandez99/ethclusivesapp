// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SmartContract is ERC721Enumerable, Ownable{
    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.02 ether;
    uint256 public maxSupply = 10033;
    uint256 public whiteListMaxMintAmount = 5;
    uint256 public publicMaxMintAmount = 3;
    bool public paused = false;
    mapping(address => bool) public whitelisted;
    
    mapping(address => uint256) public whitelistedMintedNft;
    mapping(address => uint256) public publicListMintedNft;
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721 (_name,_symbol){
        setBaseURI(_initBaseURI);
        mint(msg.sender,20);
    }
    //internal
    function _baseURI() internal view virtual override returns(string memory){
        return baseURI;
    }
    //
    function mint(address _to, uint256 _mintAmount) public payable{
        uint256 supply = totalSupply();
        require(_mintAmount>0);
        require(supply + _mintAmount <= maxSupply);
        
        if(whitelisted[_to] && paused){
            require(_mintAmount <= whiteListMaxMintAmount);
            require(whitelistedMintedNft[_to] + _mintAmount <= whiteListMaxMintAmount);
            whitelistedMintedNft[_to] += _mintAmount;
            require(msg.value >= cost*_mintAmount);
            for(uint256 i=1; i<= _mintAmount; i++){
                _safeMint(_to,supply + i);
            }
        }
        else if(owner() == msg.sender){
            
            /* Agregar la cantidad de nft que ya minteo a su cuenta?
            if(_to!=owner()){
                whitelistedMintedNft[_to] += _mintAmount;
            } */
            
            for(uint256 i=1; i<= _mintAmount; i++){
                _safeMint(_to,supply + i);
            }
        }
        else{ 
            require(!paused);
            require(_mintAmount <= publicMaxMintAmount);
            require(publicListMintedNft[_to] + _mintAmount <= publicMaxMintAmount);
            publicListMintedNft[_to] += _mintAmount;
            require(msg.value >= cost*_mintAmount);
            for(uint256 i=1; i<= _mintAmount; i++){
                _safeMint(_to,supply + i);
            }
        }
    }
    function walletOfOwner(address _owner)
        public 
        view
        returns (uint256[] memory)
        {
            uint256 ownerTokenCount = balanceOf(_owner);
            uint256 [] memory tokenIds = new uint256 [](ownerTokenCount);
            for(uint256 i; i < ownerTokenCount; i++){
                tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
            }
            return tokenIds;
        }
        function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns(string memory)
        {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI,tokenId.toString(),baseExtension))
            :"";
        }
        //only owner
        
        function setCost(uint256 _newCost)public onlyOwner(){
            cost = _newCost;
        }
        
        function addListOfUsersToWhiteList(address [] calldata _user) public onlyOwner{
            for(uint256 i; i <_user.length; i++ ){
                whitelisted[_user[i]] = true;
            }
        }
        
        function removeListOfUsersFromWhiteList(address [] calldata _user) public onlyOwner{
            for(uint256 i; i <_user.length; i++ ){
                whitelisted[_user[i]] = false;
            }
        }
        function addUserToWhiteList(address _user) public onlyOwner{
            whitelisted[_user] = true;
        }
        
        function removeUserFromWhiteList(address _user) public onlyOwner{
            whitelisted[_user] = false;
        }
        
        function setWhiteListMaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner(){
            whiteListMaxMintAmount = _newmaxMintAmount;
        }
        
        function setPublicMaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner(){
            publicMaxMintAmount = _newmaxMintAmount;
        }
        
        function setBaseURI(string memory _newBaseURI)public onlyOwner{
            baseURI = _newBaseURI;
        }
        function setBaseExtension(string memory _newBaseExtension)public onlyOwner{
            baseExtension = _newBaseExtension;
        }
        function pause(bool _state)public onlyOwner{
            paused = _state;
        }
        function withdraw()public payable onlyOwner{
            require(payable(msg.sender).send( address(this).balance));
        }
}