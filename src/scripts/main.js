(function() {
    var dominoPic = document.querySelector("#domino"),                   // pictures DOMINO for change Size
        dominoWrapper = document.querySelector(".domino-picWrapper"),    // wrapper DOMINO pic for rotate
        sizeButt = document.querySelector("#scrollSize"),                // button for SCROLL SIZE
        sizeLine = document.querySelector("#lineSize"),                  // line min-max SCROLL SIZE
        speedButt = document.querySelector("#scrollSpeed"),              // button for SCROLL SPEED
        speedLine = document.querySelector("#lineSpeed"),                // line min-max SCROLL SPEED
        rotateRightButt = document.querySelector(".rotateRight"),
        rotateLeftButt = document.querySelector(".rotateLeft"),
        resetButt = document.querySelector(".reset"),
        dominoSelected = document.querySelector(".options-type-selectedType-name"),
        openListDomino = document.querySelector(".options-type-selectedType-arrow"),
        dominoList = document.querySelector(".options-type-list"),

        degree = 0,                                                         // initial rotate degree
        speedRotate = 3,                                                    // initial speed rotate
        isMouseDown = false;                                                /// VALUE FOR CORRECT WORK MOUSEMOVE BY FIREFOX

    initialFunc();                                                          // initial options (set transitions)


    /*script for change SIZE DOMINO*/
    sizeLine.onmousemove = sizeMouseMove;
    sizeLine.onclick = sizeMouseClick;

    /*script for change ROTATE DOMINO*/
    speedLine.onmousemove = speedMouseMove;
    speedLine.onclick = speedMouseClick;


    rotateRightButt.onclick = rotateRight;
    rotateLeftButt.onclick = rotateLeft;

    resetButt.onclick = resetClick;


    openListDomino.onclick = openListFunc;

    dominoList.onclick = selectDomino;

    /* functions */

    /*change Size DOMINO*/
    function sizeTransform(widthLine) {
        if ((parseInt(sizeButt.style.left) !== 0) & (parseInt(sizeButt.style.left) !== NaN)) {
            var sizeScale = ((3*parseInt(sizeButt.style.left))/widthLine)+1;
            dominoPic.style.transform = "scale("+sizeScale+")";
        } else if ((parseInt(sizeButt.style.left) === 0)) {
            dominoPic.style.transform = "scale(1)";
        }
    }


    /*initial options*/
    function initialFunc() {
        dominoWrapper.style.transition = speedRotate+"s";
        randomDomino();
        /*FUNCTIONS FOR CORRECT WORK MOUSEMOVE BY FIREFOX*/
        document.addEventListener('mouseup',
            function(){
                isMouseDown = false;
            },
            false);

        sizeLine.addEventListener('mousedown',
            function(e){
                e.preventDefault(); // cancel element drag..
                isMouseDown = true;
            },
            false);
        speedLine.addEventListener('mousedown',
            function(e){
                e.preventDefault(); // cancel element drag..
                isMouseDown = true;
            },
            false);
    }

    /*Size func - move*/
    function sizeMouseMove(e) {

        if (isMouseDown === true) {

            /*length maxScroll*/
            var widthLine = parseInt(getComputedStyle(sizeLine).width)-(parseInt(getComputedStyle(sizeButt).width))/2;

            if (e.target.id === "lineSize" || e.target.className === "options-block-line") {
                sizeButt.style.left = e.offsetX+"px";
            } else if (e.target.id === "scrollSize") {
                var leftWidth = parseInt(sizeButt.style.left);
                sizeButt.style.left = (leftWidth+e.offsetX)+"px";
            }
            if ((parseInt(sizeButt.style.left) >= widthLine)) {
                sizeButt.style.left=widthLine+"px";
            }
            if (parseInt(sizeButt.style.left) <= 0) {
                sizeButt.style.left=0+"px";
            }
            sizeTransform(widthLine);
        }
    };
    /*Size func - click*/
    function sizeMouseClick(e) {
        if (e.target.id === "lineSize" || e.target.className === "options-block-line") {
            var widthLine = parseInt(getComputedStyle(sizeLine).width)-(parseInt(getComputedStyle(sizeButt).width))/2;
            if (parseInt(sizeButt.style.left) <= widthLine & parseInt(sizeButt.style.left) >= 0) {
                sizeButt.style.left = e.offsetX+"px";
            }
            sizeTransform(widthLine);
        }
    }

    //* Speed func - move*/
    function speedMouseMove(e) {

        /*length maxScroll*/
        var widthLine = parseInt(getComputedStyle(speedLine).width)-(parseInt(getComputedStyle(speedButt).width))/2;

        if (isMouseDown === true) {
            if (e.target.id === "lineSpeed" || e.target.className === "options-block-line") {
                speedButt.style.left = e.offsetX+"px";
            } else if (e.target.id === "scrollSpeed") {
                var leftWidth = parseInt(speedButt.style.left);
                speedButt.style.left = (leftWidth+e.offsetX)+"px";
            }
            if ((parseInt(speedButt.style.left) >= widthLine)) {
                speedButt.style.left=widthLine+"px";
            }
            if (parseInt(speedButt.style.left) <= 0) {
                speedButt.style.left=0+"px";
            }
            if (parseInt(speedButt.style.left) !== widthLine) {
                speedRotate = +((3*(widthLine-parseInt(speedButt.style.left)))/widthLine).toFixed(3);
                dominoWrapper.style.transition = speedRotate+"s";
            }
        }
    }
    /* Speed func - click*/
    function speedMouseClick(e) {
        if (e.target.id === "lineSpeed" || e.target.className === "options-block-line") {
            /*length maxScroll*/
            var widthLine = parseInt(getComputedStyle(speedLine).width)-(parseInt(getComputedStyle(speedButt).width))/2;
            if (parseInt(speedButt.style.left) <= widthLine & parseInt(speedButt.style.left) >= 0) {
                speedButt.style.left = e.offsetX+"px";
            }
            if (parseInt(speedButt.style.left) !== widthLine) {
                speedRotate = +((3*(widthLine-parseInt(speedButt.style.left)))/widthLine).toFixed(3);
                dominoWrapper.style.transition = speedRotate+"s";
            }
        }
    }

    /*Rotate func - right*/
    function rotateRight(e) {
        degree = degree+180;
        dominoWrapper.style.transform = "rotate("+degree+"deg)";
    };
    /*Rotate func - left*/
    function rotateLeft(e) {
        degree = degree-180;
        dominoWrapper.style.transform = "rotate("+degree+"deg)";
    };

    /*Reset func*/
    function resetClick(e) {
        randomDomino();
        /*set initial options*/
        initialOptions();
    };
    function randomDomino() {
        var randomTop = Math.floor(Math.random() * (6 + 1)),
            randomBottom = Math.floor(Math.random() * (6 - randomTop + 1)) + randomTop;

        dominoPic.setAttribute("src", "img/d-"+randomTop+"-"+randomBottom+".png");
        dominoSelected.innerText = "";
    };
    function initialOptions() {
        dominoWrapper.removeAttribute("style");
        degree = 0;
        dominoWrapper.style.transform = "rotate("+degree+"deg)";
        speedRotate = 3;
        dominoWrapper.style.transition = speedRotate+"s";
        speedButt.style.left = 0+"px";

        dominoPic.style.transform = "scale(1)";
        sizeButt.style.left = 0+"px";
    };

    /*select domino - func*/
    function selectDomino(e) {
        if (e.target = "LI") {
            var textArr = e.target.innerText.split("-");
            dominoSelected.innerText = e.target.innerText;
            dominoPic.setAttribute("src", "img/d-"+textArr[1]+"-"+textArr[2]+".png");
            dominoList.style.display = "none";
            openListDomino.innerText = "🔽";
            initialOptions();
        }
    };
    function openListFunc(e) {
        if (dominoList.style.display === "block") {
            dominoList.style.display = "none";
            openListDomino.innerText = "🔽";
        } else {
            dominoList.style.display = "block";
            openListDomino.innerText = "🔼";
        }
    };
})();