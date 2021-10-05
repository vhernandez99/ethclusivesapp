import React,{useEffect, useState, useRef} from 'react';
import { BrowserRouter as Router, Switch, Route,useHistory } from 'react-router-dom';
import './Game.css';
import SimpleNavbar from '../../components/Navbar/SimpleNavbar'
import { Button, Container } from '../../globalStyles';
import MainPage from "../../App"
import {Link} from 'react-router-dom';
import GameOverSound from '../../images/Game/sound/gameOver.mp3'
import MonedaSound from '../../images/Game/sound/moneda.mp3'
import SaltoSound from '../../images/Game/sound/salto.mp3'
import HaveSomeFun from '../../images/HaveSomeFun.png'
import Continue from '../../images/continue.png'
import Click from '../../images/Click.gif'
import {
    InfoSec,
    InfoRow,
    InfoColumn,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img
  } from '../../components/InfoSection/InfoSection.elements';
function Game(){
var time = new Date();
var deltaTime = 0;
document.body.style = 'background: black;';
const [Playing,SetPlaying] = useState(false);
if(Playing){
   setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init); 
}
function Init() {
    time = new Date();
    Start();
    Loop();
}
function Loop() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();
    Update();
    requestAnimationFrame(Loop);
}
//****** GAME LOGIC ********//
var nivelDelMar = 100;
var nivelDelMarCubriendo = 60;
var velY = 0;
var impulso = 900;
var impulsoEnAgua = 500;
var gravedad = 2500;
var densidad = 0.00035;
var coeficienteRozamiento = 0.01;
var dinoPosX = 42;
var dinoPosY = nivelDelMar; 
var sueloX = 0;
var velEscenario = 1280/3;
var gameVel = 1;
let score = 0;
var parado = false;
var saltando = false;
var tiempoHastaMoneda = 2;
var tiempoMonedaMin = 0.3;
var tiempoMonedaMax = 1.8;
var monedaMinY = 5;
var monedaMaxY = 320;
var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;
var interactuables = [];
var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 320;
var minNubeY = 160;
var nubes = [];
var velNube = 0.5;
var contenedor;
var dino;
let textoScore;
var suelo;
var gameOver;
var audioMoneda;
var audioSalto;
var audioGameOver;
function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    audioMoneda = document.querySelector(".audio-moneda");
    audioSalto = document.querySelector(".audio-salto");
    audioGameOver = document.querySelector(".audio-gameOver");
    document.addEventListener("keydown", HandleKeyDown);
}
function Update() {
    if(parado) return;
    
    MoverDinosaurio();
    MoverSuelo();
    DecidirCrearMonedas();
    DecidirCrearObstaculos();
    DecidirCrearNubes();
    MoverInteractuables();
    MoverNubes();
    DetectarColision();

    if(dinoPosY >= nivelDelMar) { //fuera del agua

        velY -= gravedad * deltaTime;
    }else{
        var empuje = VolumenSumergido() * densidad * gravedad;
        var rozamiento = Math.sign(velY) * velY * velY * coeficienteRozamiento;
        velY += (empuje - rozamiento - gravedad) * deltaTime;
    }
}
function VolumenSumergido() {
    if(dinoPosY >= nivelDelMar) { //fuera del agua
        return 0;
    }else {
        return dino.clientWidth * Math.min(nivelDelMar - dinoPosY, dino.clientHeight);
    }
}
function HandleKeyDown(ev){
    if(ev.keyCode == 13){
        Saltar();
    }
}
function Saltar(){
    if(!saltando){
        saltando = true;
        dino.classList.remove("dino-corriendo");
        audioSalto.currentTime = 0;
        audioSalto.play();
        if(dinoPosY > nivelDelMarCubriendo){
            velY = impulso;
        }else{
            velY = impulsoEnAgua;
        }
    }
}
function MoverDinosaurio() {
    if(dinoPosY < nivelDelMarCubriendo){
        TocarSuelo();
    }
    dinoPosY += velY * deltaTime;
    dino.style.bottom = dinoPosY+"px";
}
function TocarSuelo() {
    if(saltando){
        dino.classList.add("dino-corriendo");
    }
    saltando = false;
}
function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}
function Reset(){
    SetPlaying(true);
    // score=0;
    // parado = false;
    // interactuables = [];
    window.location.reload();
    
    
}
function Estrellarse() {
    SetPlaying(false);
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    parado = true;
}
function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;
    if(tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
    }
}
function DecidirCrearMonedas() {
    tiempoHastaMoneda -= deltaTime;
    if(tiempoHastaMoneda <= 0) {
        CrearMoneda();
    }
}
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;
    if(tiempoHastaNube <= 0) {
        CrearNube();
    }
}
function CrearMoneda() {
    var moneda = document.createElement("div");
    contenedor.appendChild(moneda);
    if(Math.random() > 0.5){
        moneda.classList.add("moneda");
    }else{
        moneda.classList.add("moneda2");
    }
    
    moneda.posX = contenedor.clientWidth;
    moneda.style.left = contenedor.clientWidth+"px";
    moneda.style.bottom = monedaMinY + (monedaMaxY - monedaMinY) * Math.random() + "px";

    interactuables.push(moneda);
    tiempoHastaMoneda = tiempoMonedaMin + Math.random() * (tiempoMonedaMax-tiempoMonedaMin) / gameVel;
}
function CrearObstaculo() {
    var obstaculo = document.createElement("div");
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add("obstaculo");
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth+"px";

    if(Math.random() > 0.5){
        obstaculo.classList.add("obstaculo-flotante");
    }else{
        obstaculo.classList.add("obstaculo-hundido");
    }

    interactuables.push(obstaculo);
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax-tiempoObstaculoMin) / gameVel;
}
function CrearNube() {
    var nube = document.createElement("div");
    contenedor.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = contenedor.clientWidth;
    nube.style.left = contenedor.clientWidth+"px";
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";
    
    nubes.push(nube);
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gameVel;
}
function MoverInteractuables() {
    for (var i = interactuables.length - 1; i >= 0; i--) {
        if(interactuables[i].posX < -interactuables[i].clientWidth) {
            interactuables[i].parentNode.removeChild(interactuables[i]);
            interactuables.splice(i, 1);
        }else{
            interactuables[i].posX -= CalcularDesplazamiento();
            interactuables[i].style.left = interactuables[i].posX+"px";
        }
    }
}
function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if(nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]);
            nubes.splice(i, 1);
        }else{
            nubes[i].posX -= CalcularDesplazamiento() * velNube;
            nubes[i].style.left = nubes[i].posX+"px";
        }
    }
}
function GanarPuntos() {
    score++;
    textoScore.innerText = score;
    audioMoneda.currentTime = 0;
    audioMoneda.play();
    if(score == 10){
        gameVel = 1.2;
        contenedor.classList.add("mediodia");
    }else if(score == 25) {
        gameVel = 1.4;
        contenedor.classList.add("tarde");
    } else if(score == 50) {
        gameVel = 1.7;
        contenedor.classList.add("noche");
    }
    suelo.style.animationDuration = (3/gameVel)+"s";
}

function GameOver() {
    Estrellarse();
    gameOver.style.display = "block";
    audioGameOver.play();
}
function DetectarColision() {
    for (var i = 0; i < interactuables.length; i++) {
        
        if(interactuables[i].posX > dinoPosX + dino.clientWidth) {
            //EVADE
            break; //al estar en orden, no puede chocar con más
        }else{
            if(IsCollision(dino, interactuables[i], 10, 25, 10, 20)) {
                if(interactuables[i].classList.contains("moneda")|| interactuables[i].classList.contains("moneda2")){
                    GanarPuntos();
                    interactuables[i].parentNode.removeChild(interactuables[i]);
                    interactuables.splice(i, 1);
                }else{
                    GameOver();
                }
            }
        }
    }
}
function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}
    const history = useHistory();
  return(
    <div className="Main">
    <SimpleNavbar>
        
    </SimpleNavbar>
    <Container BackgroundColor="Black">
    <ImgWrapper BackgroundColor="Black">
    <img src={HaveSomeFun}></img>
    </ImgWrapper>
    <div class="contenedor">
        <div class="suelo"></div>
        <div class="dino dino-corriendo"></div>
        <div class="score">0</div>
    </div>

    <div class="game-over"></div>

    <audio src={MonedaSound} class="audio-moneda"></audio>
    <audio src={SaltoSound} class="audio-salto"></audio>
    <audio src={GameOverSound} class="audio-gameOver"></audio>
   
    </Container>
    
    <Container Width="70" BackgroundColor="red">
    <button className="ButtonRestart" onClick={Reset}>Restart</button>
    <img src={Continue} onClick={() => history.push('/home')}></img>
    <img src={Click} width="50" Zindex="3"></img>
 
    
   
    </Container>
        
        

    </div>
    
  );


}

  
    
    

export default Game;

