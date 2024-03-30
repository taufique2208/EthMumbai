// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TestEvaluation {

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

    // Structure to represent a test set with questions and user responses
    struct TestSet {
        uint256 setNumber;
        mapping(address => UserResponse[]) responses; // Mapping of user address to their responses
    }

    // Mapping of question ID to Question struct
    mapping(uint256 => Question) public questions;

    // Mapping of user address to TestSet number they're taking
    mapping(address => uint256) public currentTestSet;

    // Array of TestSet structs to store test data
    TestSet[] public testSets;

    // Event emitted when a user submits their test response
    event ResponseSubmitted(address user, uint256 testSetNumber, UserResponse[] responses);

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

    // Function to start taking a test for a specific set number
    function startTest(uint256 testSetNumber) public {
        require(testSetNumber < testSets.length, "Invalid test set number");
        currentTestSet[msg.sender] = testSetNumber;
    }

    // Function for a user to submit their test responses
    function submitResponse(UserResponse[] calldata responses) public {
        require(currentTestSet[msg.sender] > 0, "Start a test before submitting responses");

        uint256 testSetNumber = currentTestSet[msg.sender];
        TestSet storage currentTestSetStorage = testSets[testSetNumber];

        for (uint256 i = 0; i < responses.length; i++) {
            require(questions[responses[i].questionId].id > 0, "Invalid question ID"); // Check if question exists
            currentTestSetStorage.responses[msg.sender].push(responses[i]);
        }

        emit ResponseSubmitted(msg.sender, testSetNumber, responses);
        delete testSets[testSetNumber].responses[msg.sender]; // Clear user's current test set after submission
    }

    // Function to retrieve a user's responses for a specific test set (for internal use or authorized access)
    function getUserResponses(address user, uint256 testSetNumber) public view returns (UserResponse[] memory) {
        require(testSetNumber < testSets.length, "Invalid test set number");
        return testSets[testSetNumber].responses[user];
    }
}