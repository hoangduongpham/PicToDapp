// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PicToDapp {
    Post[] public posts;
    uint256 public nextPost = 0;

    struct Post {
        uint256 id;
        string ipfsHash;
        string caption;
        address user;
    }
    event Posted(uint256 id, string ipfsHash, string caption, address user);

    function createPost(string memory ipfsHash, string memory caption) public {
        address user = msg.sender;
        Post memory newPost = Post(nextPost, ipfsHash, caption, user);
        posts.push(newPost);
        nextPost++;
        emit Posted(nextPost - 1, ipfsHash, caption, user);
    }

    function getPosts() public view returns (Post[] memory) {
        return posts;
    }
}
