// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract YourContract {
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender; // The deployer of the contract is set as the initial admin
    }

    function transferAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin; // Allows the current admin to transfer admin rights to another address
    }

    // Structure to represent a question with options and correct answer
    struct Question {
        uint256 id;
        string[] options; // Array of option strings (a, b, c, d)
        uint256 rightOptionIndex; // Index of the correct option in the options array
    }

    // Structure to represent a user's response for a question
    struct UserResponse {
        uint256 questionId;
        uint256 chosenOptionIndex;
    }

    // Mapping of question ID to Question struct
    mapping(uint256 => Question) public questions;

    // Mapping of user address to their responses
    mapping(address => UserResponse[]) public userResponses;

    // Event emitted when a user submits their test response
    event ResponseSubmitted(address user, UserResponse[] responses);

    // Function to add a question to the contract
    function addQuestion(
        uint256 id,
        string[] calldata options,
        uint256 rightOptionIndex
    ) public onlyAdmin {
        require(options.length == 4, "Question must have 4 options");
        require(rightOptionIndex < options.length, "Right option index out of bounds");
        questions[id] = Question(id, options, rightOptionIndex);
    }

    // Function for a user to submit their test responses
    function submitResponse(UserResponse[] calldata responses) public {
        for (uint256 i = 0; i < responses.length; i++) {
            require(questions[responses[i].questionId].id > 0, "Invalid question ID"); // Check if question exists
            userResponses[msg.sender].push(responses[i]);
        }

        emit ResponseSubmitted(msg.sender, responses);
    }

    // Function to retrieve a user's responses
    function getUserResponses(address user) public view returns (UserResponse[] memory) {
        return userResponses[user];
    }
}