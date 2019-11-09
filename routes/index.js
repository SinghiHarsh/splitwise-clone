var express = require('express');
var router = express.Router();

// TOKEN VERIFICATION
var verifyToken = require('../middleware/authToken')

//auth imports (register,login)
var authController = require('../controller/register')
var authController1 = require('../controller/login')

// search imports (connecting friends)
var searchUser = require('../controller/searchUser')
var sendRequest = require('../controller/sendUserRequest')
var showAllreq = require('../controller/showAllrequest')
var acceptRequest = require('../controller/acceptRequest')
var showAllFriends = require('../controller/showAllFriends')
const user = require('../controller/user')

// Creating Group 
const createGroup = require('../controller/createGroup')
// Showing group members
const groupMembers = require('../controller/showGroupMembers')
// Add Group Expense 
const groupExpense = require('../controller/addGroupExpense')
// Show balances
const groupBalance = require('../controller/groupBalances');
const showGroupbalance = require('../controller/showGroupBalance')
const showGroupTransaction = require('../controller/showGroupTransaction')
const finalBalance = require('../controller/finalBalance')
const finalCalculatedBal = require('../controller/finalCalculatedBal')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Auth Routes
  // Register route
  router.post("/register", authController.register)
  // Login route
  router.post("/login",authController1.login)

// Find user
router.post("/search-user",verifyToken.verifyToken,searchUser.searchUser)
// Send Friend Request
router.post("/sendrequest",verifyToken.verifyToken,sendRequest.sendUserRequest)
// Accept friend Request
router.post("/accept-request",verifyToken.verifyToken,acceptRequest.acceptRequest)
// Show all friend request
router.post("/showrequests",verifyToken.verifyToken,showAllreq.showAllreq)
// Show all friends after accepting request
router.post("/friends",verifyToken.verifyToken,showAllFriends.allFriends)

router.post("/user",verifyToken.verifyToken, user.user);
// Create Group
router.post("/create-group", verifyToken.verifyToken, createGroup.createGroup)
router.post("/groupMembers", verifyToken.verifyToken, groupMembers.showGroupMembers)
router.post("/add-expense",verifyToken.verifyToken,groupExpense.addGroupExpense)
router.post("/group-bal",groupBalance.groupBalance);
router.post("/balances",verifyToken.verifyToken, showGroupbalance.showGroupBalance);
router.post("/show-transactions", verifyToken.verifyToken, showGroupTransaction.showGroupTransaction)
router.post("/final-balance", verifyToken.verifyToken, finalBalance.finalBalance)
router.post("/final-calc", verifyToken.verifyToken, finalCalculatedBal.finalCalculatedBal)

module.exports = router;

