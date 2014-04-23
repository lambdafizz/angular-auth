module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            source: {
                files: ['Gruntfile.js', 'src/**/*.js', 'specs/**/*.js'],
                tasks: ['jshint:all', 'karma:unit:run', 'build']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'examples/**/*.js']
        },
        docco: {
            docs: {
                src: ['src/**/*.js'],
                options: {
                    output: 'docs/'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['docco:docs']);

    grunt.registerTask('default', ['karma:unit:start',
                                   'watch:source']);
};
