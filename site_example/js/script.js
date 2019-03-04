document.addEventListener('DOMContentLoaded', () => {

    //-------------- MASK TELEPHONE---------------------------
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    function mask(event) {
        var matrix = this.defaultValue,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
        matrix = matrix.replace(/[_\d]/g, function (a) {
            return val.charAt(i++) || "_"
        });
        this.value = matrix;
        i = matrix.lastIndexOf(val.substr(-1));
        i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
        setCursorPosition(i, this)
    };
    (function () {
        var phone = document.getElementById("phone");
        if (phone) {
            phone.addEventListener("input", mask, false);
            phone.addEventListener("focus", function () {
                this.setAttribute('value', '+3(___)___-__-__');
            })
            phone.addEventListener("blur", function () {
                this.removeAttribute('value')
            })
        }
    }())


    const myUploadForm = document.forms.upload;
    myUploadForm.onsubmit = function (e) {
        e.preventDefault();
        let input = myUploadForm.elements.myfile;
        let file = input.files[0];
        if (file) {
            upload(file);
        }
        return false;
    }


    function upload(file) {
        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (e) {
            let bar = document.getElementById('bar');
            let total = e.total;
            let current = e.loaded;
            let percent = (current * 100) / total;
            bar.value = percent;
        }
        xhr.onload = xhr.onerror = function () {
            if (this.status == 200) {
                console.log("success");
            } else {
                console.log("error " + this.status);
            }
        };
        xhr.open("POST", "../upload.php", true);
        xhr.send(file);
    }

})
;


