(function() {
    var
        dominoWrapper = document.querySelector(".dominoRotate"),         // wrapper DOMINO pic for rotate
        dominoPic = document.querySelector(".dominoSize"),               // pictures DOMINO for change Size
        sizeButt = document.querySelector("#scrollSize"),                // button for SCROLL SIZE
        sizeLine = document.querySelector("#lineSize"),                  // line min-max SCROLL SIZE
        speedButt = document.querySelector("#scrollSpeed"),              // button for SCROLL SPEED
        speedLine = document.querySelector("#lineSpeed"),                // line min-max SCROLL SPEED
        rotateRightButt = document.querySelector(".rotateRight"),          // ROTATE RIGHT
        rotateLeftButt = document.querySelector(".rotateLeft"),             // ROTATE LEFT
        resetButt = document.querySelector(".reset"),                       // RESET BUTTON

        dominoSelected = document.querySelector(".options-type-selectedType-name"),
        openListDomino = document.querySelector(".options-type-selectedType-arrow"),
        dominoList = document.querySelector(".options-type-list"),

        halfTopDomino = document.querySelectorAll(".halfTop"),              // HALF DOMINO TOP LIST
        activeHalfTop = null,                                               // ACTIVE TOP NUMBER

        halfBottomDomino = document.querySelectorAll(".halfBottom"),           // HALF DOMINO BOTTOM LIST
        activeHalfBottom = null,                                               // ACTIVE BOTTOM NUMBER

        degree = 0,                                                         // initial rotate degree
        speedRotate = 3,                                                    // initial speed rotate
        isMouseDown = false                                              /// VALUE FOR CORRECT WORK MOUSEMOVE BY FIREFOX
    ;

    initialFunc();

    /*script for change SIZE DOMINO*/
    sizeLine.onmousemove = sizeMouseMove;
    sizeLine.onclick = sizeMouseClick;

    /*script for change ROTATE DOMINO*/
    speedLine.onmousemove = speedMouseMove;
    speedLine.onclick = speedMouseClick;

    /*ROTATE*/
    rotateRightButt.onclick = rotateRight;
    rotateLeftButt.onclick = rotateLeft;

    /*RESET BUTTON CLICK*/
    resetButt.onclick = resetClick;

    /*SELECT DOMINO*/
    openListDomino.onclick = openListFunc;
    dominoList.onclick = selectDomino;

    function initialFunc() {
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

    /*change Size DOMINO*/
    function sizeTransform(widthLine) {
        if ((parseInt(sizeButt.style.left) !== 0) & (parseInt(sizeButt.style.left) !== NaN)) {
            var sizeScale = ((3*parseInt(sizeButt.style.left))/widthLine)+1;
            dominoPic.style.transform = "scale("+sizeScale+")";
        } else if ((parseInt(sizeButt.style.left) === 0)) {
            dominoPic.style.transform = "scale(1)";
        }
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
            };
            if ((parseInt(sizeButt.style.left) >= widthLine)) {
                sizeButt.style.left=widthLine+"px";
            };
            if (parseInt(sizeButt.style.left) <= 0) {
                sizeButt.style.left=0+"px";
            };
            sizeTransform(widthLine);
        };
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
    };

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
    };
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
    };
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
    /*RANDOM NUMBERS*/
    function randomDomino() {
        var randomTop = Math.floor(Math.random() * (6 + 1)),
            randomBottom = Math.floor(Math.random() * (6 + 1));

        changeDomino(randomTop,randomBottom);

        dominoSelected.innerText = "";
    };
    /*CHANGE NUMBERS DOMINO*/
    function changeDomino(top,bottom) {
        /*part TOP*/
        if (activeHalfTop) {
            activeHalfTop.classList.remove("activeTop");
            activeHalfTop = null;
        };
        if (document.querySelector(".activeTop")) {
            document.querySelector(".activeTop").classList.remove("activeTop");
        };
        activeHalfTop = halfTopDomino[top];
        activeHalfTop.classList.add("activeTop");

        /*part BOTTOM*/
        if (activeHalfBottom) {
            activeHalfBottom.classList.remove("activeBottom");
            activeHalfBottom = null;
        };
        if (document.querySelector(".activeBottom")) {
            document.querySelector(".activeBottom").classList.remove("activeBottom");
        };
        activeHalfBottom = halfBottomDomino[bottom];
        activeHalfBottom.classList.add("activeBottom");
    };
    /*SET INITIAL OPTIONS*/
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

            changeDomino(textArr[1],textArr[2]);

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