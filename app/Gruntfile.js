module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.initConfig({
        concat: {
            options: {
                separator: ''
            },

            js: {
                src: ['js/*.js', 'js/templates.js', '!js/vendor'],
                dest: '../web/js/app.min.js'
            },

            jsVendor: {
                src: ['js/vendor/angular.min.js', 'js/vendor/*.js'],
                dest: '../web/js/libs.min.js'
            },

            css: {
                src: ['css/reset.css', 'css/normalize.css', 'css/*.css'],
                dest: '../web/css/styles.min.css'
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    protocol: 'http',
                    hostname: 'localhost',
                    base: '../web/'
                }
            }
        },

        ngtemplates:  {
            app: {
                src: 'template/*.html',
                dest: 'js/templates.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ['js/*.js'],
                tasks: ['concat:js', 'concat:jsVendor'],
                options: {
                    interrupt: true
                }
            },

            css: {
                files: ['css/*.css'],
                tasks: ['concat:css'],
                options: {
                    interrupt: true
                }
            },

            template: {
                files: ['template/*.html'],
                tasks: ['ngtemplates'],
                options: {
                    interrupt: true
                }
            },

            html: {
                files: ['../web/*.html'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['concat']);

};
