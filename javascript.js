window.addEventListener("load", sidenVises);
let point = 0;
let life = 3;
let ranNum;
//Her henviser jeg til at det er konstant, hvorefter jeg skriver det navn jeg gerne vil henvise til, og til sidst hvad det navn skal erstatte//
const staryellowcon = document.querySelector("#staryellow_container");
const starblue = document.querySelector("#starblue_container");
const stargreen = document.querySelector("#stargreen_container");
const starorange = document.querySelector("#starorange_container");
const starpink = document.querySelector("#starpink_container");
const starpurple = document.querySelector("#starpurple_container");
const meteorcon = document.querySelector("#meteor_container");
const meteorcon2 = document.querySelector("#meteor_container2");
const meteorcon3 = document.querySelector("#meteor_container3");

//dette sker i det at siden loades //
function sidenVises() {
  console.log("sidenVises");
  //Gør at min lille rummand svæver i luften
  document.querySelector("#game_foreground").classList.add("rumhop");
  document.querySelector("#rummand").classList.add("rumhop");
  document.querySelector("#starttxt").classList.add("speechan_start");
  document.querySelector("#starttxt_2").classList.add("speechan_start2");
  document.querySelector("#starttxt_3").classList.add("speechan_start3");
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");

  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startSpillet);
}

function startSpillet() {
  console.log("startSpillet");
  document.querySelector("#sound_knap").play();
  //ranNum gør at er elementerne falder fra tilfældige positioner. '*14*' fortæller os at der er 14 forskellige positioner skrevet ind i css'en //
  document.querySelector("#sound_background").volume = 0.5;
  document.querySelector("#sound_background").play();
  document.querySelector("#sound_winner").pause();
  document.querySelector("#sound_gameover").pause();
  document.querySelector("#sound_speech").pause();
  document.querySelector("#sound_speech_gameover").pause();
  //Skjul andre skærme
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");

  // her fortæller vi js at stjernerne skal falde fra tilfældige positioner (kan findes is css) //
  staryellowcon.classList.add("faldstjerne", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  staryellowcon.addEventListener("animationiteration", starReset);
  staryellowcon.addEventListener("mousedown", clickStar);

  starblue.classList.add("faldstjerne", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  starblue.addEventListener("animationiteration", starReset);
  starblue.addEventListener("mousedown", clickStar);

  stargreen.classList.add("faldstjerne", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  stargreen.addEventListener("animationiteration", starReset);
  stargreen.addEventListener("mousedown", clickStar);

  starorange.classList.add("faldstjerne", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  starorange.addEventListener("animationiteration", starReset);
  starorange.addEventListener("mousedown", clickStar);

  starpink.classList.add("faldstjerne", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  starpink.addEventListener("animationiteration", starReset);
  starpink.addEventListener("mousedown", clickStar);

  starpurple.classList.add("faldstjerne", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  starpurple.addEventListener("animationiteration", starReset);
  starpurple.addEventListener("mousedown", clickStar);

  //ranNum gør at er elementerne falder fra tilfældige positioner. '*14*' fortæller os at der er 14 forskellige positioner skrevet ind i css'en //

  //Her fortæller vi js at meteor skal falde fra tilfældige positioner (kan findes i css) //
  meteorcon.classList.add("faldmeteor", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  meteorcon.addEventListener("animationiteration", meteorReset);
  meteorcon.addEventListener("mousedown", clickMeteor);

  meteorcon2.classList.add("faldmeteor", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  meteorcon2.addEventListener("animationiteration", meteorReset);
  meteorcon2.addEventListener("mousedown", clickMeteor);

  meteorcon3.classList.add("faldmeteor", "pos" + nytRandomTal(14), "delay" + nytRandomTal(5));
  meteorcon3.addEventListener("animationiteration", meteorReset);
  meteorcon3.addEventListener("mousedown", clickMeteor);

  document.querySelector("#time_counter").classList.add("timer");
  document.querySelector("#time_container").addEventListener("animationend", stopSpillet);

  //Nulstil point og udskriv
  point = 0;
  document.querySelector("#point").innerHTML = point;

  //reset liv til 3
  life = 3;
  document.querySelector("#life").innerHTML = life;
}

function clickStar() {
  console.log(this);
  document.querySelector("#sound_click").play();
  //Når man klikker på en stjerne får man 1 point //
  point++;
  console.log(point);
  document.querySelector("#point").textContent = point;
  //Dette er de animationer der sættes igang når der klikkes på en stjerne //
  this.firstElementChild.classList.add("zoomoutstjerne");
  this.classList.add("frys");
  this.removeEventListener("mousedown", clickStar);
  this.addEventListener("animationend", starReset);
}

function clickMeteor() {
  console.log(this);
  document.querySelector("#sound_bang").play();
  //Når man klikker på en meteor mister man 1 point //
  life--;
  console.log(life);
  document.querySelector("#life").textContent = life;
  //Dette er de animationer der sættes igang når der klikkes på en meteor //
  this.firstElementChild.classList.add("pulsemeteor");
  this.classList.add("frys");
  this.removeEventListener("mousedown", clickMeteor);
  this.addEventListener("animationend", meteorReset);
  document.querySelector("#life").innerHTML = life;
  if (life <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

function starReset() {
  console.log(this);
  console.log("starReset");
  //Her fjernes de animationer der førhen er blevet tilføjet (container)//
  this.classList = "";
  //Her fjernes de animationer der førhen er blevet tilføjet (sprite)//
  this.firstElementChild.classList = "";
  //tvinger js til at læse koden igen//
  this.offsetLeft;
  // tilføjer de øsnkede animationer igen, så at stjernen endnu engang vil falde, samt en random position //
  this.addEventListener("mousedown", clickStar);
  this.classList.add("faldstjerne", "pos" + nytRandomTal(14));
}

function meteorReset() {
  console.log(this);
  console.log("meteorReset");
  //Her fjernes de animationer der førhen er blevet tilføjet (container)//
  this.classList = "";
  //Her fjernes de animationer der førhen er blevet tilføjet (sprite)//
  this.firstElementChild.classList = "";
  //Tvinger js til at læse koden igen//
  this.offsetLeft;
  // tilføjer de ønskede animationer igen, så at meteoren endnu engang vil falde, samt en random position //
  this.addEventListener("mousedown", clickMeteor);

  this.classList.add("faldmeteor", "pos" + nytRandomTal(14));
}

function stopSpillet() {
  console.log("stopSpillet");
  document.querySelector("#time_counter").classList.remove("timer");
  document.querySelector("#time_container").removeEventListener("animationend", stopSpillet);

  //star - sørger for at alt fjernes
  staryellowcon.classList = "";
  staryellowcon.firstElementChild.classList = "";
  staryellowcon.removeEventListener("animationend", starReset);
  staryellowcon.removeEventListener("animationiteration", starReset);
  staryellowcon.removeEventListener("mousedown", clickStar);

  starblue.classList = "";
  starblue.firstElementChild.classList = "";
  starblue.removeEventListener("animationend", starReset);
  starblue.removeEventListener("animationiteration", starReset);
  starblue.removeEventListener("mousedown", clickStar);

  stargreen.classList = "";
  stargreen.firstElementChild.classList = "";
  stargreen.removeEventListener("animationend", starReset);
  stargreen.removeEventListener("animationiteration", starReset);
  stargreen.removeEventListener("mousedown", clickStar);

  starorange.classList = "";
  starorange.firstElementChild.classList = "";
  starorange.removeEventListener("animationend", starReset);
  starorange.removeEventListener("animationiteration", starReset);
  starorange.removeEventListener("mousedown", clickStar);

  starpink.classList = "";
  starpink.firstElementChild.classList = "";
  starpink.removeEventListener("animationend", starReset);
  starpink.removeEventListener("animationiteration", starReset);
  starpink.removeEventListener("mousedown", clickStar);

  starpurple.classList = "";
  starpurple.firstElementChild.classList = "";
  starpurple.removeEventListener("animationend", starReset);
  starpurple.removeEventListener("animationiteration", starReset);
  starpurple.removeEventListener("mousedown", clickStar);

  //Meteor - sørger for at alt fjernes
  meteorcon.classList = "";
  meteorcon.firstElementChild.classList = "";
  meteorcon.removeEventListener("animationend", meteorReset);
  meteorcon.removeEventListener("animationiteration", meteorReset);
  meteorcon.removeEventListener("mousedown", clickMeteor);

  meteorcon2.classList = "";
  meteorcon2.firstElementChild.classList = "";
  meteorcon2.removeEventListener("animationend", meteorReset);
  meteorcon2.removeEventListener("animationiteration", meteorReset);
  meteorcon2.removeEventListener("mousedown", clickMeteor);

  meteorcon3.classList = "";
  meteorcon3.firstElementChild.classList = "";
  meteorcon3.removeEventListener("animationend", meteorReset);
  meteorcon3.removeEventListener("animationiteration", meteorReset);
  meteorcon3.removeEventListener("mousedown", clickMeteor);

  if (life <= 0) {
    gameOver();
  } else if (point >= 6) {
    levelComplete();
  } else {
    gameOver();
  }
}
function gameOver() {
  console.log("gameOver");
  document.querySelector("#sound_speech_gameover").play();
  document.querySelector("#rummand_game_over").classList.add("rumhop");
  document.querySelector("#game_over_txt").classList.add("speechan_gameover");

  document.querySelector("#sound_background").pause();
  document.querySelector("#sound_gameover").volume = 0.3;
  document.querySelector("#sound_gameover").play();
  //Vis gameover skærm

  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#time_container").removeEventListener("animationend", stopSpillet);
  document.querySelector("#genstart_red").addEventListener("click", startSpillet);
}
function levelComplete() {
  console.log("levelComplete");
  document.querySelector("#sound_speech").play();
  document.querySelector("#mission_complete_txt").classList.add("speechan_start");
  document.querySelector("#mission_complete_txt2").classList.add("speechan_start2");

  document.querySelector("#sound_background").pause();
  document.querySelector("#sound_winner").volume = 0.3;
  document.querySelector("#sound_winner").play();
  document.querySelector("#rummand_mission_complete").classList.add("rumhop");
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#time_container").removeEventListener("animationend", stopSpillet);
  document.querySelector("#genstart_green").addEventListener("click", startSpillet);
}
//Dette gør at jeg kan skrive mine delays og positioner i samme linje //
function nytRandomTal(max) {
  return Math.floor(Math.random() * max) + 1;
}
