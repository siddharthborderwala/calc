//LOGIC CONTROLLER
const LGController = (function() {

    return {
        findVal: function(equation) {
            return eval(equation);
        }
    }
})();


//UI CONTROLLER
const UIController = (function() {

    const displayVal = document.querySelector('.display-value');
    displayVal.textContent = '';

    const displayEq = document.querySelector('.display-equation');
    displayEq.textContent = '';

    return {
        btnClickEffect: function(e) {
            let el = e.target.closest('.btn');
            el.classList.add('click-transform');
            setTimeout(el => {
                el.classList.remove('click-transform');
            }, 100, el);
        },
        nextNum: function(num) {
            displayVal.textContent = displayVal.textContent.concat(num);
        },
        nextOper: function(oper) {
            if (displayVal.textContent !== '' && oper !== '=') {
                displayVal.textContent = displayVal.textContent.concat(oper);
            }
        },
        backSpace: function(fn) {
            if (fn === 'ac') {
                displayVal.textContent = '';
                displayEq.textContent = '';
            } else {
                displayVal.textContent = displayVal.textContent.slice(0, displayVal.textContent.length - 1);
            }
        },
        eqEvent: function() {
            const dispText = displayVal.textContent;
            const len = dispText.length;
            const condition = dispText[len - 1] === '/' || dispText[len - 1] === '*' || dispText[len - 1] === '+' || dispText[len - 1] === '-';
            if (displayVal.textContent !== '' && !condition) {
                displayEq.textContent = displayVal.textContent;
                displayVal.textContent = '';
            }
            return displayEq.textContent;
        },
        updateVal: function(val) {
            displayVal.textContent = '';
            if (val === NaN) val = 'undefined';
            displayVal.textContent = `${val}`;
        }
    };

})();


//APP CONTROLLER
const APPController = (function(uictrl, lgctrl) {

    const setUpEventListeners = () => {

        //set up click response event listeners
        document.querySelectorAll('.btn').forEach(el => {
            el.addEventListener('click', uictrl.btnClickEffect);
        });


        //set up listeners for numbers
        document.querySelectorAll('.btn.num').forEach(el => {
            el.addEventListener('click', () => {
                const num = parseInt(el.innerHTML.trim(), 10);
                uictrl.nextNum(num);
            });
        });

        //set up listeners for operators
        document.querySelectorAll('.btn.operator').forEach(el => {
            el.addEventListener('click', () => {
                const oper = el.getAttribute('data-value');
                uictrl.nextOper(oper);
            });
        });

        //set up listeners for back/ac
        document.querySelectorAll('.btn.back').forEach(el => {
            el.addEventListener('click', e => {
                const el = e.target.closest('.btn');
                uictrl.backSpace(el.id);
            });
        });

        //listener for equal to
        document.querySelector('#equal').addEventListener('click', e => {
            const equation = uictrl.eqEvent();
            let res = lgctrl.findVal(equation);
            if (res.toString().length > 10 && !Number.isInteger(res)) {
                res = parseFloat(res.toFixed(8));
            }
            uictrl.updateVal(res);
        });
    }

    return {
        init: () => {
            setUpEventListeners();
        }
    };

})(UIController, LGController);

APPController.init();