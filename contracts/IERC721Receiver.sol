// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;


interface IERC721Receiver {
  function onERC721Received(address from, address to, uint256 tokenId, bytes calldata data) external returns (bytes4);
}