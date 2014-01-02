(function () {

	/*To Do:
		1. figure out how to store muscle tags
	*/
	'use strict';

	var fitness = {


		//initialise the view

		render: function ( template ) {
			fitness.view = new Ractive({
				el: 'container',
				template: template,
				data: {
					greeting: true
				}
			});

			fitness.view.on({

				enterExercises: function ( event ){
					fitness.enterExercises();
				},

				saveExercise: function ( event, form ){
					fitness.saveExercise( form );
				},

				generate: function ( event, muscleGroup ){
					fitness.generate( muscleGroup );
				},

				record: function ( event ){
					fitness.record();
				},

				reset: function ( event ){
					fitness.reset();
				}
			});

		},

			reset: function () {
				fitness.view.set({
					greeting: true,
					exercises: false,
					generate: false,
					record: false
				});
			},
		
			//first part, entering exercises. user fills in fields which records exercises
			//as an array

			enterExercises: function () {

			//the array of exercises
			fitness.exercises = [];

				fitness.view.set({
					greeting: false,
					exercises: true
				});
			},

			//takes the html form inputs and creates a new exercise
			saveExercise: function ( form ){
				
				var name = myForm.exerciseName.value;
				var muscles = myForm.exerciseMuscles.value;

				function Exercise (name, muscles) {

					this.name = name;
					this.muscles = muscles;

				}
				
				var newExercise = new Exercise (name, muscles);

				//adds the new exercise to the array
				fitness.exercises.push(newExercise);


				

				alert ("Exercise saved");
				/*fitness.exercises = [];

				this.name = name;
				this.muscles = muscles;*/
			fitness.view.set({
					exerciseList: fitness.exercises
				});

			}


	};

	// load template
	get( 'template.html', function ( template ) {
		fitness.render( template );
	});

	// helper functions
	function  get ( url, callback ) {
		var xhr = new XMLHttpRequest();

		xhr.open( 'get', url );
		xhr.onload = function () {
			callback( xhr.responseText )
		};

		xhr.send();
	}

	window.fitness = fitness;
}());