/**
 *  Amaze UI Plugin - autocomplete 
 *  @author Maple Joe
 *  @version 0.1
 */

$.fn.autocomplete = function(options) {
    if (typeof options != 'object' || !options.dictionary) return false;
    var themes, $ul;
    var $this = $(this);
    var $doc = $(document);
    var def = {
        style: 'gray',
        multiple: 10,
        keySwitch: true,
        mouseoverupSwitch: true
    };
    var settings = {
        wrapCls: 'text-search-box',
        inputCls: 'text-input',
        ulCls: 'text-list',
        liCls: 'text-list-li-active',
        htmlEscape: {
            '&quot;': '"',
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&nbsp;': ' '
        },
        optStyle: [ 'gray', 'green', 'blue', 'black'],
        pattern: /(\( |\)|\*|\+|\[|\]|\?|\\|\^|\{|\|)/gm
    };

    // 合并对象
    options = $.extend({}, def, options, settings);

    // 得到文本提示组样式
    themes = skin(options, def);

    // 加入外层元素及列表
    $this.addClass(options.inputCls);
    $this.wrap(['<div class="', options.wrapCls, '"></div>'].join(''));
    $this.parent().append(['<ul class="', options.ulCls, '"></ul>'].join(''));
    options.active = options.liCls + '-' + themes;
    $ul = $this.parent().find('ul').eq(0);
    $this.addClass(options.inputCls + '-' + themes);
    $ul.addClass(options.ulCls+ '-' + themes); 

    // 监控input
    $this.on('input propertychange', function(){
        inputchange($(this), $ul, options);
    });

    // 键盘事件 上 下 回车
    if(options.keySwitch) {
        $doc.on('keydown', function(e){
            docKeydown($ul, e.keyCode, options);
        });
    }
    
    // 鼠标移入移出input
    if(options.mouseoverupSwitch){
        $this.parent().on('mouseleave', function(){
            $ul.hide(); 
       });
       $this.parent().on('mouseenter', function(){
        inputchange($this, $ul, options);
       });
    }
   
    /* method */
    // 得到样式
    function skin(options, def) {
        var pattern, flag = false,
            opt = options.optStyle,
            skin = options.style;
        pattern = new RegExp('^' + skin + '$', 'ig');
        $.each(opt, function() {
            if (pattern.test(this)) {
                flag = true;
                return false;
            }
        });
        if (!flag) return def.style;
        return skin;
    }

    // 监控文本框变化
    function inputchange($this, $ul, options){
        var str = '', value = $this.val(), pattern = options.pattern, $li;
        $ul.html('').hide();
        if(pattern.test(value)){
            value = value.replace(pattern, '\\'+RegExp.$1); 
        }
        if(value != '') {
            str = liStr(value, options);
            if(str != '')   $ul.html(str).show();
            $li = $ul.find('li');

            // 是否显示滚动条
            // if($li) {
            //     scrollBar($li, options);
            // }

             // 鼠标划过列表
             $li.on('mouseenter', function() {
                liHover($(this), $li, options);
            });

            // 鼠标单击事件
            $li.on('click', function(){
                liClicked($this, $(this), options);
            });
        }
    } 

    // 根据数据词典得到li的字符串
    function liStr(value, options) {
        var pattern = new RegExp(value, 'ig'), $dic = options.dictionary, str = '';
        $.each($dic, function() {
            if (new RegExp(value, 'ig').test(this)) {
                str += ['<li>', this, '</li>'].join('');
            }
        });
        return str;
    }

    function scrollBar($li, options){
        var multiple = options.multiple, length = $li.length, $li = $li.eq(0);
        if(length > multiple) {
            height = $li.height() * multiple;
            $li.parent().css({
                height: height,
                overflowX: 'hidden',
                overflowY: 'scroll'
            });
        }
    }   

    // 鼠标划过li元素
    function liHover($this, $li, options){
        var active = options.active;
        $li.each(function() {
            if ($(this).hasClass(active)) {
                    $(this).removeClass(active);
                    return false;
            }
        });      
        $this.addClass(active);  
    }

    // 单击li元素
    function liClicked(_, $this, options) {
        var value = $this.html(), htmlEscape = options.htmlEscape;
        $.each(htmlEscape, function(i){
            value = value.replace(new RegExp(i, 'igm'), this);
        }); 
        _.val(value);
        $this.parent().hide();
    }

    // 键盘按下
    function docKeydown($ul, key, options){
        var $li = $ul.find('li'), active = options.active;
        switch(key){ 
            case 38:
                liHoverMove($li, active, 'last'); 
                break;
            case 40:
                liHoverMove($li, active, 'first'); 
                break;
            case 13:
                $li.each(function(i){
                     liClicked($this, $(this), options);
                });
                break;
            default:
                break;
        } 
    }

    // 移动列表的hover
    function liHoverMove($li, active, position) {
        var sibling, count, flag = true;
        if(position == 'last') {
            sibling = 'prev';
            count = 0;
        } else {
            sibling = 'next';
            count = $li.length-1;   
        }
        $li.each(function(i){
            if ($(this).hasClass(active)) {
               flag = false;
               $(this).removeClass(active);
               if(i == count) {
                $li[position]().addClass(active);
               } else {
                $(this)[sibling]().addClass(active);
               }
               return false;
            }
        });
        if(flag) $li[position]().addClass(active);
    }
};