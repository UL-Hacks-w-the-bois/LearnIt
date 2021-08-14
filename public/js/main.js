const postBox = document.getElementById('post-box-form');

//Getting username and qualification from the URL 
const {username, qualification} = Qs.parse(location.search,{
    ignoreQueryPrefix: true,
});


const socket = io();

//emit joinApp to user user and their qualification into the application
socket.emit('joinApp', {username, qualification});

//On postmade outputting the text and username
socket.on('postMade', (post) => {
    console.log(post.text + ": " + post.username );
})

//Post button submit
postBox.addEventListener('submit', e => {
    e.preventDefault();

    //getting the question from the post Box 
    let question = e.target.elements.questionInput.value;

    question = question.trim();

    if(!question){
        return false;
    }

    // console.log(question);

    //Emitting message to the server
    socket.emit('post', (question));

    //clearning the postbox values
    e.target.elements.questionInput.value =  '';
    e.target.elements.questionInput.focus();

})