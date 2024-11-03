ace.define('ace/mode/pic_highlight_rules', function(require, exports, module) {
    var oop = require('ace/lib/oop');
    var TextHighlightRules = require('ace/mode/text_highlight_rules').TextHighlightRules;

    var PicHighlightRules = function() {
        // Definir palavras-chave e comandos (como anteriormente)
        var keywords = (
            'above|abs|aligned|and|as|assert|at|behind|below|between|big|bold|bot|bottom|' +
            'ccw|center|chop|close|color|cos|cw|dashed|define|diameter|dist|dotted|down|' +
            'end|even|fill|first|fit|from|go|heading|height|ht|in|int|invis|invisible|' +
            'italic|last|left|ljust|max|min|mono|monospace|of|previous|print|' +
            'rad|radius|right|rjust|same|sin|small|solid|sqrt|start|the|' +
            'then|thick|thickness|thin|this|to|top|until|up|vertex|way|wid|width|' +
            'with'
        );

        var commands = (
            'arc|arrow|box|circle|cylinder|diamond|dot|ellipse|file|line|move|oval|spline|text|noop'
        );

        var directions = (
            'c|e|n|ne|nw|s|se|sw|t|w|east|north|south|west'
        );

        var specialSymbols = (
            '\\[\\]'
        );

        var builtinConstants = (
            'PI|E'
        );

        this.$rules = {
            'start': [
                {
                    token: 'comment.line', // Comentários de linha única
                    regex: '#.*$'
                },
                {
                    token: 'comment.start', // Início de comentário de múltiplas linhas
                    regex: '/\\*',
                    next: 'comment'
                },
                {
                    token: 'string', // Strings
                    regex: '".*?"'
                },
                {
                    token: 'string', // Strings
                    regex: "'.*?'"
                },
                {
                    token: 'constant.numeric', // Números
                    regex: '[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?'
                },
                {
                    token: 'constant.language', // Constantes internas
                    regex: '\\b(?:' + builtinConstants + ')\\b'
                },
                {
                    token: 'keyword.operator', // Símbolos especiais
                    regex: specialSymbols
                },
                {
                    token: 'support.function', // Comandos
                    regex: '\\b(?:' + commands + ')\\b'
                },
                {
                    token: 'keyword', // Palavras-chave
                    regex: '\\b(?:' + keywords + ')\\b'
                },
                {
                    token: 'variable.parameter', // Direções
                    regex: '\\b(?:' + directions + ')\\b'
                },
                {
                    token: 'paren.lparen', // Parênteses esquerdo
                    regex: '[\\(]'
                },
                {
                    token: 'paren.rparen', // Parênteses direito
                    regex: '[\\)]'
                },
                {
                    token: 'identifier', // Identificadores genéricos
                    regex: '\\b\\w+\\b'
                },
                {
                    token: 'text', // Espaços em branco
                    regex: '\\s+'
                }
            ],
            'comment': [
                {
                    token: 'comment.end', // Fim de comentário de múltiplas linhas
                    regex: '\\*/',
                    next: 'start'
                },
                {
                    defaultToken: 'comment'
                }
            ]
        };

        this.normalizeRules();
    };

    oop.inherits(PicHighlightRules, TextHighlightRules);
    exports.PicHighlightRules = PicHighlightRules;
}), 
ace.define('ace/mode/pic', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/pic_highlight_rules'], function (require, exports, module) {
    var oop = require('ace/lib/oop');
    var TextMode = require('ace/mode/text').Mode;
    var PicHighlightRules = require('ace/mode/pic_highlight_rules').PicHighlightRules;

    var Mode = function () {
        this.HighlightRules = PicHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function () {
        this.lineCommentStart = "#";
        this.$id = 'ace/mode/pic';
    }).call(Mode.prototype);

    exports.Mode = Mode;
})