var nbexec = 'nb.app/Contents/MacOS/nb';
var basedir = '.'; //working dir
var startpage = 'http://127.0.0.1:8888/';
var pagecheck = 'http://127.0.0.1:8888/tree'; //no side-effect page to check if webserver is running
//************************************************************        
var ipynb_process = null;
var spawn = require("child_process").spawn;
var sleep = require("sleep");

function Startipynb()
{
    console.log('start_nb');

    var child;
    child = spawn(nbexec, ['',],{cwd:basedir});
    child.stdout.on("data", function(data) {
        return console.log("stdout:" + data);
        });
    child.stderr.on("data", function(data) {
        return console.log("ERROR: " + data);
        });

    child.on("exit", function(code) {
        return console.log("Encoding process exited with code: " + code);
        });	

    console.log("start_nb_End");

    ipynb_process = child;

    function transferComplete(evt) {
        console.log("transferComplete");
    }

    function transferFailed(evt) {
        console.log("transferFailed");
      console.log("Waiting...");
      sleep.sleep(5);
      checkServer();
    }

    function reqListener () {
      console.log("Launching...");
    }

    function checkServer()
    {
        console.log("checking server");
        var oReq = new XMLHttpRequest();    
        oReq.addEventListener("load", transferComplete, false);
        oReq.addEventListener("error", transferFailed, false);

        oReq.onload = reqListener;
        oReq.open("GET", pagecheck, true);
        oReq.send();
    }

    console.log("starting...");
    checkServer();

}

Startipynb();
