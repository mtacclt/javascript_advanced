import fetch from "node-fetch";
import request from "request";

function objectify(json){
    let jsonArray = json;
    return jsonArray;
}

function findPostsByUserId(userId,postsJsonArray){
  let foundArray = []
  for(var i in postsJsonArray) {
    if (postsJsonArray[i].userId === userId){
      foundArray.push(postsJsonArray[i].id);
    }
  }
  return foundArray;
}

async function findMostComments(posts){
  const postMap = new Map();
  for (var post in posts){
    postMap.set(posts[post],0);
  }

  const comments = await (await fetch("https://jsonplaceholder.typicode.com/comments")).json();
  
  for (var comment in comments){
    if (posts.includes(comments[comment].postId)){
      const index = posts.indexOf(comments[comment].postId);
      postMap.set(posts[index],postMap.get(posts[index]) + 1);
    }
  }
  
  let postId = 0;
  let commentsNum = 0;

  for (var post in posts){
    if (postMap.get(posts[post]) > commentsNum){
      commentsNum = postMap.get(posts[post]);
      postId = posts[post];
    }
  }

  console.log("most commented post is postId",postId);
}

// E1A fetch most followed posts for user
// callback
function callbackFindMostCommentedPost(id){
  request (`https://jsonplaceholder.typicode.com/posts`, {json:true}, function(err,res,body){
    let posts = findPostsByUserId(id,body);
    findMostComments(posts);
  });
}
// callbackFindMostCommentedPost(1);

// promise
function promiseFindMostCommentedPost(id){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => objectify(json))
    .then((jsonArray)=> findPostsByUserId(id,jsonArray))
    .then((foundArray) => findMostComments(foundArray));
}  
// promiseFindMostCommentedPost(1);

// async await
async function asyncFindMostCommentedPost(id){
  const allPosts = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();

  const userPosts =findPostsByUserId(id,allPosts);

  const postMap = new Map();
  for (var post in userPosts){
    postMap.set(userPosts[post],0);
  }

  const allComments = await (await fetch("https://jsonplaceholder.typicode.com/comments")).json();

  for (var comment in allComments){
    if (userPosts.includes(allComments[comment].postId)){
      const index = userPosts.indexOf(allComments[comment].postId);
      postMap.set(userPosts[index],postMap.get(userPosts[index]) + 1);
    }
  }

  let postId = 0;
  let commentsNum = 0;

  for (var post in userPosts){
    
    if (postMap.get(userPosts[post]) > commentsNum){
      commentsNum = postMap.get(userPosts[post]);
      postId = userPosts[post];
    }
  }

  console.log("most commented post is postId",postId);

}
// asyncFindMostCommentedPost(1);

// E1B find and print user with the most posts
// callback
function callbackFindUserWithMostPosts(){
  request (`https://jsonplaceholder.typicode.com/posts`, {json:true}, function(err,res,body){
    const allPosts = body;
    let userIdArray = [];
    let userPostMap = new Map();

    for(var post in allPosts){
      if (!userIdArray.includes(allPosts[post].userId)){
        userIdArray.push(allPosts[post].userId);
        userPostMap.set(allPosts[post].userId,0);
      }
      userPostMap.set(allPosts[post].userId,userPostMap.get(allPosts[post].userId)+1);
    }

    let maxPosts = 0;
    let userId = 0;

    for (var user in userIdArray){
      
      if (userPostMap.get(userIdArray[user]) > maxPosts){
        maxPosts = userPostMap.get(userIdArray[user]);
        userId = userIdArray[user];
      }
    }

    console.log("user with most posts is", userId );
  });
}
// callbackFindUserWithMostPosts();

// promise
function promiseFindUserWithMostPosts(){
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response)=>response.json())
  .then((json)=>{
    const allPosts = json;
    let userIdArray = [];
    let userPostMap = new Map();

    for(var post in allPosts){
    if (!userIdArray.includes(allPosts[post].userId)){
      userIdArray.push(allPosts[post].userId);
      userPostMap.set(allPosts[post].userId,0);
    }
    userPostMap.set(allPosts[post].userId,userPostMap.get(allPosts[post].userId)+1);
    }

    let maxPosts = 0;
    let userId = 0;

    for (var user in userIdArray){
    
      if (userPostMap.get(userIdArray[user]) > maxPosts){
        maxPosts = userPostMap.get(userIdArray[user]);
        userId = userIdArray[user];
      }
    }
    console.log("user with most posts is", userId );
  });
}
// promiseFindUserWithMostPosts();

// async await
async function asyncFindUserWithMostPosts(){
  const allPosts = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
  let userIdArray = [];
  let userPostMap = new Map();

  for(var post in allPosts){
    if (!userIdArray.includes(allPosts[post].userId)){
      userIdArray.push(allPosts[post].userId);
      userPostMap.set(allPosts[post].userId,0);
    }
    userPostMap.set(allPosts[post].userId,userPostMap.get(allPosts[post].userId)+1);
  }

  let maxPosts = 0;
  let userId = 0;

  for (var user in userIdArray){
    
    if (userPostMap.get(userIdArray[user]) > maxPosts){
      maxPosts = userPostMap.get(userIdArray[user]);
      userId = userIdArray[user];
    }
  }

  console.log("user with most posts is", userId );
}
// asyncFindUserWithMostPosts();

// E1C List all users with at least 1 open task
// callback
function callbackFindOpenTaskUsers(){
  request (`https://jsonplaceholder.typicode.com/todos`, {json:true}, function(err,res,body){
    const allTodos = body;
    let userIdArray = [];

    for (var todo in allTodos){
      if (!allTodos[todo].completed && !userIdArray.includes(allTodos[todo].userId)){
        userIdArray.push(allTodos[todo].userId);
      }
    }

    console.log(userIdArray);
  });
}
// callbackFindOpenTaskUsers();

// promise
function promiseFindOpenTaskUsers(){
  fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response)=>response.json())
  .then((json)=>{
    const allTodos = json;

    let userIdArray = [];

    for (var todo in allTodos){
      if (!allTodos[todo].completed && !userIdArray.includes(allTodos[todo].userId)){
        userIdArray.push(allTodos[todo].userId);
      }
    }

    console.log(userIdArray);
  });
}
// promiseFindOpenTaskUsers();

// async await
async function asyncFindOpenTaskUsers(){
  const allTodos = await (await fetch("https://jsonplaceholder.typicode.com/todos")).json();
  let userIdArray = [];

  for (var todo in allTodos){
    if (!allTodos[todo].completed && !userIdArray.includes(allTodos[todo].userId)){
      userIdArray.push(allTodos[todo].userId);
    }
  }

  console.log(userIdArray);
}
// asyncFindOpenTaskUsers();

// E2
const userTodosPromise = new Promise((resolve, reject) => {
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response)=>response.json())
  .then((json)=>resolve(json));
});

const userPostsPromise = new Promise((resolve, reject) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response)=>response.json())
  .then((json)=>resolve(json));
});

function fetchTodosAndPosts(userId){
  Promise.all([userPostsPromise, userTodosPromise]).then((results) => {
    let filteredPostsArray = results[0].filter(result => result.userId === userId);
    let filteredTodosArray = results[1].filter(result => result.userId === userId);
    console.log(filteredPostsArray,filteredTodosArray);
  });
}
// fetchTodosAndPosts(1);
  
// E3
async function getBestMovieByKubrick(){
  const allDirectors = await (await fetch("https://dhekumar.github.io/asynchronous-javascript/directors.json")).json();
  
  let kubrickId = -1;
  
  for (var director in allDirectors){
    if (allDirectors[director].name === "Stanley Kubrick"){
      kubrickId = allDirectors[director].id;
    }
  }
  
  const allMovies = await (await fetch(`https://dhekumar.github.io/asynchronous-javascript/directors/${kubrickId}/movies.json`)).json();

  let title = "";
  let maxAverage = 0;


  for (var movie in allMovies){
    const allReviews = await (await fetch(`https://dhekumar.github.io/asynchronous-javascript/movies/${allMovies[movie].id}/reviews.json`)).json();
    let sum = 0;  
      for (var review in allReviews){
        sum = sum + allReviews[review].rating;
      }
    sum = sum / allReviews.length;
    if (sum > maxAverage){
      title = allMovies[movie].title;
      maxAverage = sum;
    }
  }
  console.log("Best kubrick movie is:",title);
}
// getBestMovieByKubrick();

