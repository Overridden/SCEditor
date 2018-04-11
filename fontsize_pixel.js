/******************************************************************************
* fontsize_pixel.js                                                           *
******************************************************************************/

// Tested on SCEditor 2.1.2

// Change 1to7 font-size system into a pixeled font-size selection system
$(document).ready(function () {
    if ($.sceditor != undefined) {
        $.sceditor.command.set('size', {
            _dropDown: function (editor, caller, callback) {
                var $content = $('<div/>', { style: 'overflow-y:auto;overflow-x:hidden;max-height:243px;min-width:89px;' }),
                    clickFunc = function (e) {
                        callback($(this).data('size'));
                        editor.closeDropDown(true);
                        e.preventDefault();
                    };
                for (var i = 1; i <= 20; i++) {
                    var count;
                    if (i <= 7) { count = 6 + i * 2; }
                    else if (i <= 11) { count = 20 + (i - 7) * 4; }
                    else if (i > 11) { count = 32 + (i - 11) * 6; }
                    $content.append($('<a href="javascript:;" class="sceditor-fontsize-option" data-size="' + count + '" style="font-size:' + count + 'px;">' + count + 'px</a>').click(clickFunc));
                }
                editor.createDropDown(caller, 'fontsize-picker', $content.get(0));
            },
            exec: function (caller) {
                var editor = this;
                $.sceditor.command.get('size')._dropDown(
                    editor,
                    caller,
                    function (size) {
                        editor.execCommand('fontsize', size);
                        var getBody = editor.getBody();
                        $(getBody).find('font[size]').removeAttr("size").css("font-size", size + "px");
                    }
                );
            },
            txtExec: function (caller) {
                var editor = this;
                $.sceditor.command.get('size')._dropDown(
                    editor,
                    caller,
                    function (size) {
                        editor.insertText('[size=' + size + ']', '[/size]');
                    }
                );
            }
        });
    }

    // BBCode
    if ($.sceditor != undefined && $.sceditor.formats != undefined) {
        $.sceditor.formats.bbcode.set("size", {
            format: function (element, content) {
                var size = $(element).css('font-size').replace('px', '');
                return '[size=' + size + ']' + content + '[/size]';
            },
            html: function (token, attrs, content) {
                return '<span style="font-size:{defaultattr}px">{!0}</span>';
            }
        });
    }
});