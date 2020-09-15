    let add;
    let sub;
    let multi;
    let divide;
    let fibS;

    var add1 = 0;
    var add2 = 0;

    var sub1 = 0;
    var sub2 = 0;

    var mlti1 = 0;
    var multi2 = 0;

    var divide1 = 0;
    var divide2 = 0;

    var fib = 0;

    fib_js = (x) => {
        if (x <= 1) {
            return x;
        } else {
            return (fib_js(x - 1) + fib_js(x - 2));
        }
    }

    function loadWasm(filename) {
        return fetch(filename).then(response => response.arrayBuffer()).then(bits => WebAssembly.compile(bits))
            .then(module => { return new WebAssembly.Instance(module) });
    };

    addResult = () => {
        add1 = document.getElementById('add1').value;
        add2 = document.getElementById('add2').value;
        var rSum = document.getElementById('addResult');

        loadWasm('test.wasm')
            .then(Instance => {
                add = Instance.exports._Z3addii;
                console.time('add');
                rSum.innerHTML = add(add1, add2);
                console.timeEnd('add');
            });
    }
    subMinus = () => {
        sub1 = document.getElementById('sub1').value;
        sub2 = document.getElementById('sub2').value;
        var rSub = document.getElementById('minusResult');

        loadWasm('test.wasm')
            .then(Instance => {
                sub = Instance.exports._Z3subii;

                console.time('subMinus');
                rSub.innerHTML = sub(sub1, sub2);
                console.timeEnd('subMinus');
            });
    }
    mulTiply = () => {
        multi1 = document.getElementById('multi1').value;
        multi2 = document.getElementById('multi2').value;
        var rSum = document.getElementById('addMulti');

        loadWasm('test.wasm')
            .then(Instance => {
                multi = Instance.exports._Z5multiii;
                console.time('multi');
                rSum.innerHTML = multi(multi1, multi2);
                console.timeEnd('multi');
            });
    }
    divDivide = () => {
        divide1 = document.getElementById('divide1').value;
        divide2 = document.getElementById('divide2').value;
        var rDiv = document.getElementById('divideResult');

        if (divide2 == 0) {
            rDiv.innerHTML = "YOU CANNOT DIVIDE BY ZERO";
        } else {
            loadWasm('test.wasm')
                .then(Instance => {
                    divide = Instance.exports._Z6divideii;

                    console.time('divide');
                    rDiv.innerHTML = divide(divide1, divide2);
                    console.timeEnd('divide');
                });
        }

    }



    fibSequence_JS = () => {
        let fValue = document.getElementById('fib').value;
        console.time('fib_js');
        console.log("-----------------------------------");
        console.log(fib_js(fValue));
        console.log("Time taken for JS is ");
        console.timeEnd('fib_js');
        console.log("-----------------------------------");
    }
    fibSequence = () => {
        let fValue = document.getElementById('fib').value;
        loadWasm('test.wasm')
            .then(Instance => {
                fibS = Instance.exports._Z5fibbii;
                console.time('fibS');
                console.log("-----------------------------------");
                console.log(fibS(fValue));
                console.log("Time taken for WebAssembly is ");
                console.timeEnd('fibS');
                console.log("-----------------------------------");
            });

    }