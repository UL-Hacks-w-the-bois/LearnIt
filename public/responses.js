// const postId =window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
const Post = require('./models/posts');
const postId = Qs.parse(location.search,{
    ignoreQueryPrefix: true,
});
const mongoose = require('mongoose');
const questionBox = document.getElementById('question-box');
const comments = document.getElementById('comments');
const questionContainer = document.getElementsByClassName('question-container');
const usernameBox = document.getElementById('username-box');
const post;
console.log(window.location.href);
Post.find({ "_id": postId}).limit(1).then(result => {
    post = result
    console.log(post)

});
usernameBox.innerText = post.username+', '+post.qualification;
questionBox.innerText = post.question;
// function showQuestion(postId){
//     Post.find({ "_id": postId}).limit(1).then(result => {
//         post = result
//     });
//     usernameBox.innerText = post.username+', '+post.qualification;
//     questionBox.innerText = post.question;
// }

//Post button submit
comments.addEventListener('submit', e => {
    e.preventDefault();
    let comment = e.target.elements.questionInput.value;
    if(!comment){
        return false;
    }

    postComment(comment);
})

//Posting comment to DOM
function postComment(comment){
    const div = document.createElement('div');
    div.classList.add('comment');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = post.username +', ' + post.qualification;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = post.comment;
    div.appendChild(para);
    document.querySelector('.posted-comments').appendChild(div);


}