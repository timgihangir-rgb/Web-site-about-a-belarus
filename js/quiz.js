/* Quiz about Belarus — simple version */

// correct answers: each question id holds the right value
var correct = {
  q1: "mir",
  q2: "bison",
  q3: "library",
  q4: "draniki",
  q5: "nesvizh",
  q6: "redchurch"
};

// messages shown after checking
var names = {
  q1: "It is Mir Castle!",
  q2: "It is the European bison (zubr)!",
  q3: "It is the National Library!",
  q4: "It is draniki!",
  q5: "It is Nesvizh Castle!",
  q6: "It is the Red Church!"
};

function checkQuiz() {
  var ids = ["q1", "q2", "q3", "q4", "q5", "q6"];
  var score = 0;
  var allAnswered = true;

  ids.forEach(function (id) {
    var question = document.getElementById(id);
    var chosen = question.querySelector('input:checked');
    var result = question.querySelector(".result");

    // check if the student answered this question
    if (!chosen) {
      allAnswered = false;
      return;
    }

    // clean old marks
    question.querySelectorAll("label").forEach(function (label) {
      label.classList.remove("right", "wrong", "selected");
    });

    var isRight = chosen.value === correct[id];
    if (isRight) {
      score++;
    }

    // show which one was right (green) and which was wrong (red)
    question.querySelectorAll("input").forEach(function (input) {
      var label = input.parentElement;
      if (input.value === correct[id]) {
        label.classList.add("right");
      } else if (input.checked) {
        label.classList.add("wrong");
      }
    });

    result.textContent = isRight ? "Correct! " + names[id] : "Wrong. " + names[id];
    result.className = "result show " + (isRight ? "ok" : "bad");
  });

  if (!allAnswered) {
    document.getElementById("score").textContent =
      "Please answer all " + ids.length + " questions first.";
    return;
  }

  document.getElementById("score").textContent =
    "You got " + score + " out of " + ids.length + "!" + getMessage(score, ids.length);
}

function getMessage(score, total) {
  if (score === total) return " Perfect! You know Belarus very well!";
  if (score >= total - 2) return " Great job!";
  if (score >= total / 2) return " Not bad, but you can do better.";
  if (score >= 1) return " Read the main page again and try once more.";
  return " Read the main page first, then come back!";
}

function resetQuiz() {
  ["q1", "q2", "q3", "q4", "q5", "q6"].forEach(function (id) {
    var question = document.getElementById(id);

    question.querySelectorAll("input").forEach(function (input) {
      input.checked = false;
    });

    question.querySelectorAll("label").forEach(function (label) {
      label.classList.remove("right", "wrong", "selected");
    });

    var result = question.querySelector(".result");
    result.textContent = "";
    result.className = "result";
  });

  document.getElementById("score").textContent = "";
}

// highlight the chosen option when the student clicks on it
document.querySelectorAll(".options").forEach(function (group) {
  group.addEventListener("change", function () {
    group.querySelectorAll("label").forEach(function (label) {
      label.classList.remove("selected");
    });
    var chosen = group.querySelector("input:checked");
    if (chosen) {
      chosen.parentElement.classList.add("selected");
    }
  });
});