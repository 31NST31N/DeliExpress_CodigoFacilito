
var Calculator = function () {

   
    var self = this,
        decimalMark = ".",
        sum = 0,
        prevOperator;

   
    self.display = ko.observable("0");
    self.isShowingResult = ko.observable(false);

    self.number = function (item, event) {   
        var button = event.target.innerText || event.target.textContent;

       
        if (self.isShowingResult()) {
            self.clearDisplay();
            self.isShowingResult(false);
        }

       
        if (button == decimalMark && self.display().indexOf(decimalMark) > -1)
            return;

        var newValue = (self.display() === "0" && button != decimalMark) ? button : self.display() + button; 
        
        self.display(newValue);
    };

    self.operator = function (item, event) {
        var button = event.target.innerText || event.target.textContent;
        
        if (!self.isShowingResult()) {
           
            switch (prevOperator) {
                case "+":
                    sum = sum + parseFloat(self.display(), 10);
                    break;
                case "-":
                    sum = sum - parseFloat(self.display(), 10);
                    break;
                case "x":
                    sum = sum * parseFloat(self.display(), 10);
                    break;
                case "÷":
                    sum = sum / parseFloat(self.display(), 10);
                    break;
                default:
                    sum = parseFloat(self.display(), 10);
            };
        }

        
        if (prevOperator)
            self.display(sum);

        
        prevOperator = (button === "=") ? null : button;
        
        self.isShowingResult(true);
    };

    self.negate = function () {
        
        if (self.isShowingResult() || self.display() === "0")
            return;

        var newValue = (self.display().substr(0, 1) === "-") ? self.display().substr(1) : "-" + self.display();
        self.display(newValue);
    };

    
    self.backspace = function (item, event) {
        
        if (self.isShowingResult())
            return;

        if (self.display().length > 1) {
            self.display(self.display().substr(0, self.display().length - 1));
        } else {
            self.clearDisplay();
        }
    };

    
    self.clear = function () {
        prevOperator = null;
        self.clearDisplay();
        sum = 0;
    };

    
    self.clearDisplay = function () {
        self.display("0");
    };
};

ko.applyBindings(new Calculator());


(function () {
 
    var calculatorKeys = {
        48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6",
        55: "7", 56: "8", 57: "9", 96: "0", 97: "1", 98: "2", 99: "3",
        100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9",
        106: "x", 107: "+", 109: "-", 110: ".", 111: "÷", 8: "backspace",
        13: "=", 46: "c", 67: "c"
    };

    function fireEvent(element, event) {
        if (document.createEvent) {
            
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true);
            return !element.dispatchEvent(evt);
        } else {
            // Dispatch for IE
            var evt = document.createEventObject();
            return element.fireEvent('on' + event, evt)
        }
    }

   
    function hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(ele, cls) {
        if (!hasClass(ele, cls)) ele.className += " " + cls;
    }

    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }

    
    var keycallback = function (e) {
        
        if (e.keyCode in calculatorKeys) {
            
            var element = document.getElementById("calculator-button-" + calculatorKeys[e.keyCode]);
           
            addClass(element, "active");
            setTimeout(function () { removeClass(element, "active"); }, 100);
           
            fireEvent(element, "click");
        }
    }

    if (document.addEventListener) {
        document.addEventListener('keyup', keycallback, false);
    } else if (document.attachEvent) {
        document.attachEvent('keyup', keycallback);
    }
})();
