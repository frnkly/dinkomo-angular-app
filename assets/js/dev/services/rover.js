/**
 *
 */
angular.module('nkomo.rover', [])

.service('Rover', ['$window', '$sessionStorage', '$route', '$location',
    function($window, $sessionStorage, $route, $location) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal =
            (window.location.hostname == 'localhost' ||
                window.location.hostname.match(/.*\.local$/i) ||
                window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;

        // TODO: load this asynchronously from the API.
        $sessionStorage.definitionFormData =
        {
            types:
            {
                '0':
                {
                    title: 'word',
                    subTypes:
                    {
                        adj: 'adjective',
                        adv: 'adverb',
                        conn: 'connective',
                        ex: 'exclamation',
                        pre: 'preposition',
                        pro: 'pronoun',
                        n: 'noun',
                        v: 'verb'
                    }
                },
                '1':
                {
                    title: 'name',
                    subTypes:
                    {
                        fam: 'family',
                        given: 'given'
                    }
                },
                '10':
                {
                    title: 'phrase',
                    subTypes:
                    {
                        ex: 'expression',
                        prov: 'proverb',
                        saying: 'sayng'
                    }
                },
                '20':
                {
                    title: 'poem',
                    subTypes: {}
                },
                '30':
                {
                    title: 'story',
                    subTypes: {}
                }
            }
        };

        // Logs a message to the console.
        this.debug = function(msg) {
            if (this.isLocal && console) {
                console.log(msg);
            }
        };
    }
]);
