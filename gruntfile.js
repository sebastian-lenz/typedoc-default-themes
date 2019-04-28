module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            themeDefault: {
                tsconfig: './tsconfig.json'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseDir: './',
                    name: 'node_modules/almond/almond',
                    out: 'bin/default/assets/js/main.js',
                    include: ['src/default/assets/js/main', 'jquery', 'backbone', 'underscore', 'lunr'],
                    paths: {
                        'jquery': 'node_modules/jquery/dist/jquery.min',
                        'underscore': 'node_modules/underscore/underscore-min',
                        'backbone': 'node_modules/backbone/backbone-min',
                        'lunr': 'node_modules/lunr/lunr.min'
                    },
                    insertRequire: ['~bootstrap'],
                    shim: {
                        backbone: {
                            //These script dependencies should be loaded before loading
                            //backbone.js
                            deps: ['underscore', 'jquery'],
                            //Once loaded, use the global 'Backbone' as the
                            //module value.
                            exports: 'Backbone'
                        },
                        underscore: {
                            exports: '_'
                        },
                        lunr: {
                            exports: 'lunr'
                        }
                    },
                    optimize: 'none' // TODO: Replace grunt uglify with this
                }
            }
        },
        uglify: {
            themeDefault: {
                options: {
                    mangle: false
                },
                files: {
                    'bin/default/assets/js/main.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/underscore/underscore-min.js',
                        'node_modules/backbone/backbone-min.js',
                        'node_modules/lunr/lunr.min.js',
                        'src/default/assets/js/main.js'
                    ]
                }
            }
        },
        'string-replace': {
            themeMinimal: {
                files: {
                    'bin/minimal/layouts/default.hbs': ['src/minimal/layouts/default.hbs']
                },
                options: {
                    replacements: [{
                        pattern: /{{ CSS }}/g,
                        replacement: function() {
                            var css = grunt.file.read('bin/default/assets/css/main.css');
                            return css.replace(/url\(([^\)]*)\)/g, function(match, file) {
                                if (match.indexOf(':') != -1) return match;
                                var path = require('path'), fs = require('fs');
                                var file = path.resolve('bin/default/assets/css', file);
                                var data = fs.readFileSync(file, 'base64');
                                return 'url(data:image/png;base64,' + data + ')';
                            });
                        }
                    }, {
                        pattern: /{{ JS }}/g,
                        replacement: function() {
                            return grunt.file.read('bin/default/assets/js/main.js').replace('{{', '{/**/{');
                        }
                    }]
                }
            }
        },
        sass: {
            options: {
                style: 'compact',
                unixNewlines: true
            },
            themeDefault: {
                files: [{
                    expand: true,
                    cwd: 'src/default/assets/css',
                    src: '**/*.sass',
                    dest: 'bin/default/assets/css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                cascade: false
            },
            themeDefault: {
                expand: true,
                src: 'bin/**/*.css',
                dest: './'
            }
        },
        copy: {
            plugin: {
              files: [{
                expand: true,
                cwd: 'src',
                src: ['*.js'],
                dest: 'bin'
              }]
            },
            themeDefault: {
                files: [{
                    expand: true,
                    cwd: 'src/default',
                    src: ['**/*.hbs', '**/*.png'],
                    dest: 'bin/default'
                }]
            },
            themeDefault2Minimal: {
                files: [{
                    expand: true,
                    cwd: 'src/default/partials',
                    src: ['**/*.hbs'],
                    dest: 'bin/minimal/partials'
                }]
            },
            themeMinimal: {
                files: [{
                    expand: true,
                    cwd: 'src/minimal',
                    src: ['**/*.hbs'],
                    dest: 'bin/minimal'
                }]
            }
        },
        watch: {
            js: {
                files: ['src/default/assets/js/src/**/*.ts'],
                tasks: ['js']
            },
            css: {
                files: ['src/default/assets/css/**/*'],
                tasks: ['css']
            },
            default: {
                files: ['src/default/**/*.hbs'],
                tasks: ['copy', 'string-replace']
            },
            minimal: {
                files: ['src/minimal/partials/**/*.hbs', 'src/minimal/templates/**/*.hbs'],
                tasks: ['copy:themeMinimal']
            },
            minimalLayout: {
                files: ['src/minimal/layouts/default.hbs'],
                tasks: ['string-replace:themeMinimal']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('css', ['sass', 'autoprefixer']);
    grunt.registerTask('js', ['ts:themeDefault', 'requirejs']);
    grunt.registerTask('default', ['copy', 'css', 'js', 'string-replace']);
};
