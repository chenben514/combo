const start_btn = document.querySelector(".word_chain");
const sec_word_chain = document.querySelector(".section_word_chain");
const my_word_input = document.querySelector(".word_chain_input");
const my_word_chain_score = document.querySelector(".word_chain_score");

let current_word;
let quesCnt;
class Question {
  numb;
  word;
  pron;
}
let questions;
let showups = [];
let current_score = 0;
let game_over = false;

loadWordChain();

function loadWordChain() {
  //ben_test
  var selFile = "../data/chinese/word_chain.csv";

  // var errArr = localStorage.getItem(selCategory + "_" + selLevel + "_err");
  // alert(errArr);
  let tmpCnt = 0;
  let tmpArr = [];
  var quesList = [];
  let ansList = [];

  var read = new XMLHttpRequest();
  read.open("GET", selFile, false);
  read.setRequestHeader("Cache-Control", "no-cache");
  read.send();
  var displayName = read.responseText;

  var quesArr = displayName.replace(/\r\n/g, "\n").split("\n");
  quesCnt = quesArr.length;

  //2.generate questions
  questions = [];
  var i;
  var j;
  for (i = 0; i < quesCnt; i++) {
    var singQuesArr = quesArr[i].split(";");

    let question = new Question();
    question.numb = i + 1;
    question.word = singQuesArr[0];
    question.pron = singQuesArr[1];
    questions[i] = question;
  }

  var start = Math.floor(Math.random() * questions.length);
  sec_word_chain.innerHTML =
    sec_word_chain.innerHTML +
    "<span class='word'>" +
    questions[start].word +
    "</span><span class='pron'>(" +
    questions[start].pron +
    ")</span>➜";

  var length = questions[start].word.length;
  current_word = questions[start].word.substring(length - 1, length);
}

function startWordChain() {
  var start = Math.floor(Math.random() * questions.length);
  sec_word_chain.innerHTML =
    "<span class='word'>" +
    questions[start].word +
    "</span><span class='pron'>(" +
    questions[start].pron +
    ")</span>➜";

  var length = questions[start].word.length;
  current_word = questions[start].word.substring(length - 1, length);
  showups = [];
  current_score = 0;
  game_over = false;
}

function nextWordChain() {
  //ben_test
  var i, current_num;
  var found = false;
  if (game_over === true) {
    alert("遊戲結束了，找不到字接了");
    return;
  }
  for (i = 0; i < quesCnt; i++) {
    if (current_word === questions[i].word.substring(0, 1)) {
      var tmp_length = questions[i].word.length;
      if (showups.includes(current_word)) {
        continue;
      }
      if (
        current_word === questions[i].word.substring(tmp_length - 1, tmp_length)
      ) {
        continue;
      }
      current_num = i;
      found = true;
      var randomCheck = Math.floor(Math.random() * 3);
      if (randomCheck === 1) break;
    }
  }
  if (found === false) {
    sec_word_chain.innerHTML =
      sec_word_chain.innerHTML + "<span class='word'>遊戲結束（找不到字了";
    game_over = true;
  } else {
    sec_word_chain.innerHTML =
      sec_word_chain.innerHTML +
      "<span class='word'>" +
      questions[current_num].word +
      "</span><span class='pron'>(" +
      questions[current_num].pron +
      ")</span>➜";
    showups.push(questions[current_num].word);
    var length = questions[current_num].word.length;
    current_word = questions[current_num].word.substring(length - 1, length);
  }
}

function myWordChain() {
  //ben_test
  var i;
  if (showups.includes(my_word_input.value)) {
    alert("這個字詞己經用過了");
    return;
  }

  if (my_word_input.value.substring(0, 1) !== current_word) {
    alert("你輸入字詞的第一個字，不是前個字詞的最後一個字");
    return;
  }

  for (i = 0; i < quesCnt; i++) {
    if (my_word_input.value === questions[i].word) {
      sec_word_chain.innerHTML =
        sec_word_chain.innerHTML +
        "<span class='word'>" +
        questions[i].word +
        "</span><span class='pron'>(" +
        questions[i].pron +
        ")</span>➜";
      var length = questions[i].word.length;
      current_word = questions[i].word.substring(length - 1, length);
      current_score += 1;
      my_word_chain_score.innerHTML = current_score;
      break;
    }
  }
  if (i === quesCnt) {
    alert("找不到你輸入的字");
  }
}
