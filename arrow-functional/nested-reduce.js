/*
 data is a list of workouts
 each workout has a name and a list of exercises
 each exercise has a duration
 */
const data = [
    {
        name: "data1",
        exercises: [
            {
                "duration": 1,
                "weight": 10
            }
        ]
    },
    {
        name: "data2",
        exercises: [
            {
                "duration": 5,
                "weight": 20
            }
        ]
    },
    {
        name: "data2",
        exercises: [
            {
                "duration": 5,
                "weight": 20
            }
        ]
    }
]

/*
 given a list of workouts, get total duration
 using nested reduce

 acc stands for accumulator. The `0`'s are the initial value
 The inner reduce will sum each workout exercises duration (1)
 The outer reduce will sum each result from above's sum (2)
 */
let totalDuration = data.reduce(
    (acc1, workout) => acc1 + workout.exercises.reduce(    // (2)
        (acc2, exercise) => acc2 + exercise.duration, 0),  // (1)
    0)

console.log(totalDuration) // 11