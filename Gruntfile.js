"use strict";

module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    livereload: true,
                    base: './',
                    port: 9009
                }
            }
        },

        cssmin: {
            build: {
                src: ['dist/components/normalize-css/normalize.css', 'dist/components/chico/dist/**/**.css', 'dist/css/mesh.min.css', 'dist/css/stylesheet.css'],
                dest: 'build/css/app.css'
            }
        },

        sass: {
            build: {
                files: {
                    'dist/css/stylesheet.css': 'dist/sass/stylesheets.sass'
                }
            }
        },

        cssc: {
            build: {
                files: {
                    'dist/css/stylesheet.css': 'dist/css/stylesheet.css'
                }
            }
        },

        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['dist/js/app.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['dist/sass/**/*.sass'],
                tasks: ['build']
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'head-script-disabled': true,
                },
                src: ['index.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'build/js/app.min.js': ['dist/components/jquery/dist/jquery.min.js', 'dist/components/tiny.js/dist/tiny.min.js', 'dist/components/chico/dist/**/*.js', 'dist/js/app.js']
                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'build/css/maps/' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'build/css/*.css'
            }
        }

    });

    grunt.registerTask('default',   ['connect:server', 'watch', 'uglify:build']);
    grunt.registerTask('build',  ['sass', 'postcss', 'cssmin']);

};