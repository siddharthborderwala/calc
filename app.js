//LOGIC CONTROLLER
const LGController = (function() {

})();


//UI CONTROLLER
const UIController = (function() {

    //set up click response event listeners
    const setGeneralListeners = () => {
        document.querySelectorAll('.btn').forEach(el => {
            el.addEventListener('click', () => {
                el.classList.add('click-transform');
                setTimeout((el) => {
                    el.classList.remove('click-transform');
                }, 150, el);
            });
        });
    };

    //set up listeners for numbers
    const setNumListeners = () => {
        document.querySelectorAll('.btn.num').forEach(el => {
            el.addEventListener('click', () => {
                console.log(parseInt(el.innerHTML.trim(), 10));
            });
        });
    };

    //set up listeners for operators
    const setOperatorListeners = () => {
        document.querySelectorAll('.btn.operator').forEach(el => {
            el.addEventListener('click', () => {
                console.log(`oper${el.id}`);
            });
        });
    };

    //set up listeners for back/ac
    const setBackListeners = () => {
        document.querySelectorAll('.btn.back').forEach(el => {
            el.addEventListener('click', () => {
                console.log(`back${el.id}`);
            });
        });
    }

    return {
        setListeners: () => {
            setGeneralListeners();
            setNumListeners();
            setOperatorListeners();
            setBackListeners();
        }
    };

})();


//APP CONTROLLER
const APPController = (function(uictrl, lgctrl) {

    const setUpEventListeners = () => {
        uictrl.setListeners();
    }

    return {
        init: () => {
            setUpEventListeners();
        }
    };

})(UIController, LGController);

APPController.init();