// const mongoose = require('mongoose');
const questionBox = document.getElementById('question-box');
const comments = document.getElementById('comments');
const questionContainer = document.getElementsByClassName('question-container');
const usernameBox = document.getElementById('username-box');


const postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
console.log(postId);

