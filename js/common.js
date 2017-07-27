$(document).ready(function() {
    var
        $form = $('form'),
        $toggle = $('.toggle'),
        popup = $('.modal-overlay'),
        popupContent = popup.find('.modal-content'),
        textType = $form.find("[name]");

    $toggle.on('click', function(e) {
        e.preventDefault();
        $('.sidebar').toggleClass('sidebar-show');
    });

    $(window).on("keydown", function(e) {
        if (e.keyCode === 27) {
            if (!popup.hasClass('modal-overlay-hide')) {
                popup.addClass('modal-overlay-hide');
                popupContent.children().remove();
            }
        }
    });

    popup.on("click", function(e) {
        if (!popup.hasClass('modal-overlay-hide')) {
            popup.addClass('modal-overlay-hide');
            popupContent.children().remove();
        }
    });

    textType.focus(function() {
        var
            $this = $(this);
        $this.tooltipHide();
    });

    $form.on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);

        if (validateThis($this)) {
            postFormData($this, function(data) {
                popupContent.append('<pre>' + data + '</pre>');
                popup.removeClass('modal-overlay-hide');
                $form[0].reset();
            });
        };
    });

    function validateThis(form) {
        var
            regExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
            isValid = false;

        textType.each(function() {
            var
                $this = $(this),
                notEmptyField = !!$this.val();

            if (notEmptyField) {
                isValid = true;
            } else {
                $this.tooltipShow();
                isValid = false;
            }
        });
        return isValid;
    };

    function postFormData(form, successCallback) {
        var
            host = form.attr('action'),
            dataObject = {};

        if (!host) {
            console.log('set action attribute to your form!!');
        }

        textType.each(function() {
            var
                $this = $(this),
                value = $this.val(),
                name = $this.attr('name');

            dataObject[name] = value;
        });
        $.post(host, dataObject, successCallback);
    };
});

$.fn.tooltipShow = function() {
    var
        $this = this,
        parent = $this.parent();
    tooltip = parent.find('.field-error');

    parent.addClass('form-group--error');
    tooltip.addClass('field-error--show');;
};

$.fn.tooltipHide = function() {
    var
        $this = this,
        parent = $this.parent();
    tooltip = parent.find('.field-error');

    parent.removeClass('form-group--error');
    tooltip.removeClass('field-error--show');;
};