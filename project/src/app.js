(function () {

	/*To Do:
		1. figure out how to store muscle tags
		2. crack local storage
		3. expand exercise entries to include history, weights, reps
		4. add graphs
		5. add review page where you can view exercise history
		
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

				removeExercise: function ( event, id ){
					fitness.removeExercise( id );
				},

				generate: function ( event, form ){
					fitness.generate( form );
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
			if(!localStorage.exercises){
					fitness.exercises = [];

			}else{
					localStorage.exercises = fitness.exercises;
				}

				fitness.view.set({
					greeting: false,
					exercises: true
				});
			},

			//takes the html form inputs and creates a new exercise
			saveExercise: function ( form ){
				
				var name = myForm.exerciseName.value;
				var muscles = myForm.targetAreas.value;

				function Exercise (name, muscles) {

					this.name = name;
					this.muscles = muscles;
					this.id = fitness.exercises.length;
					this.history = function (date, weight, reps){
						this.date = date;
						this.weight = weight;
						this.reps = reps;
					}


				}
				if(name ==""){
					alert("You must give the exercise a name")
				}else{
				var newExercise = new Exercise (name, muscles);

					//adds the new exercise to the array
					fitness.exercises.push(newExercise);

					//saves the exercises locally- NO CHECK for browser compatibility as 
					//it's not going to be public
					for(var i = 0; i < fitness.exercises.length; i++){
					localStorage.exercises[i] = fitness.exercises[i];
				}

					

					alert ("Exercise saved");

					//update the ractive table
				fitness.view.set({
						exerciseList: fitness.exercises
					});
				}
			},

			//removes exercise when user clicks delete
			removeExercise: function ( id ){
				
				var a = fitness.exercises.indexOf(id);

				//localStorage.removeItem(a);

				fitness.exercises.splice(a, 1);

				alert("deleted: " + a);

			fitness.view.set({
					exerciseList: fitness.exercises
				});


			},

			generate: function( form ) {
				



				if(!fitness.view.data.generate){
			fitness.view.set({
					generate: true,
					greeting: false
				});


				} else{
					fitness.workout = [];
					var max = 11;
					var min = 8;
					var workoutNumber = myForm.workoutOptions.value;
					var workoutLength = Math.floor(Math.random() * (1 + max - min) + min);
					for(var i = 0; i < workoutLength; i++){
						fitness.workout[i] = fitness.exercises[Math.floor(Math.random() * fitness.exercises.length)];
					}

					fitness.view.set({
							workoutList: fitness.workout
							
						});
						
						
					}


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