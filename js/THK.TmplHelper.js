/*****************************************************************************
The MIT License (MIT)
Copyright © 2013 BoRu Su (kilfu0701), https://github.com/kilfu0701,
                                      http://kilfu0701.blogspot.tw/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*****************************************************************************/
/**
 * == template generate helper script ==
 *
 * @Dependency: 
 *   THK.js
 *   tmpl.js
 *
 * @note:
 *   Avoid using any jquery in this js.
 *
 * @Author:
 *   kilfu0701
 */

/**
 * @options:
 *   url: '/aa/bb/'             # path to your javascript tmpls.
 *   delay: 20                  # default 20 ms.
 *   timeout: 10                # request timeout, default 10 sec.
 *   tmpl-prefix: 'template-'   # template's prefix in 'id'.
 *   ext: '.js'                 # your template's extension, default '.js'.
 */
THK.TmplHelper = function(options) {
    var _version = '0.0.1',
        _release = '2013/10/24',
        _this = this;

    this.opts = options || {};

    var default_opts = {
        url: '/js/tmpl/',
        delay: 20,   // 20 ms
        timeout: 10, // 10 secs
        tmpl_prefix: 'template-',
        ext: '.js',
        type: 'text/x-tmpl'
    };
    for(var k in default_opts) {
        if(typeof(this.opts[k]) != typeof(default_opts[k])) {
            this.opts[k] = default_opts[k];
        }
    }

    this.tmpl_rendered = [];
    this.TS = THK.getTimestamp();
};

THK.TmplHelper.prototype._import_tmpl = function(fn, cb) {
    if(typeof cb != "function") {
        cb = function() {};
    }

    var _this = this;

    if(_this.tmpl_rendered[fn]) {
        cb('done');
    } else {
        THK.request({
            url: _this.opts['url'] + fn + '.js',
            async: true,
            done: function(r) {
                var elem = THK.newElement(
                    'script', {
                        'id': _this.opts['tmpl_prefix'] + fn,
                        'type': _this.opts['type']
                    }, r, true
                );
                document.body.appendChild(elem);
                _this.tmpl_rendered[fn] = 1;
                cb('done');
            },
            error: function(r) {
                cb('error');
            }
        });
    }
};


THK.TmplHelper.prototype.import_tmpl = function(fn, cb) {
    var _this = this;
    var _counter = 0;
    var _done = 0;
    var _times = 0;
    var _max_times = _this.opts['timeout'] * (1000 / _this.opts['delay']);

    if(typeof cb != "function") {
        cb = function() {};
    }

    if(THK) {
        if(typeof fn=="string") {
            _counter = 1;
            _this._import_tmpl(fn, function(r) {
                _done++;
            });
        } else if(typeof fn=="object") {
            _counter = fn.length;

            for(var i in fn) {
                _this._import_tmpl(fn[i], function(r) {
                    _done++;
                });
            }
        }

        var wait_si = window.setInterval(function() {
            _times++;
            if((_times > _max_times) || (_counter == _done)) {
                window.clearTimeout(wait_si);
                cb('finish');
            }
        }, 20);

    } else {
        console.log('THK not loaded.');
    }
};

THK.TmplHelper.prototype.import_render_tmpl = function(tpl, vars, render_to, cb) {
    var _this = this;

    this._import_tmpl(tpl, function(r) {
        var elem = THK.get('id', render_to);
        if(elem) {
            var range, sel;
            if (document.createRange && window.getSelection) {
                range = document.createRange();
                sel = window.getSelection();
                sel.removeAllRanges();
                try {
                    range.selectNodeContents(elem);
                    sel.addRange(range);
                } catch (e) {
                    range.selectNode(elem);
                    sel.addRange(range);
                }
            } else if (document.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(elem);
                range.select();
            }

            //var range = document.createRange();
            //range.selectNode(document.body);
            var parsedHTML;
            if(range.createContextualFragment) {
                parsedHTML = range.createContextualFragment(tmpl(_this.opts['tmpl_prefix']+tpl, vars));
            } else {
                parsedHTML = document.createDocumentFragment(tmpl(_this.opts['tmpl_prefix']+tpl, vars));
            }

            elem.appendChild(parsedHTML);
        }

        if(typeof cb == "function") 
            cb('finish');
    });
}

THK.TmplHelper.prototype.render_pagitor2 = function(total, per_limit, cb) {
    var limit = per_limit || 15;
    var range = 5;
    var page = THK.get('id', 'FormPage').value || 1;

    THK.request({
        url: '/admin/api/get_pagitor2',
        data: {
            page: page,
            limit: limit,
            total: total,
            range: range,
            info: 'true'
        },
        async: true,
        done: function(r) {
            if(typeof cb=="function") 
                cb(r);
        },
        error: function(r) {
            console.log(r)
        }
    });
};
