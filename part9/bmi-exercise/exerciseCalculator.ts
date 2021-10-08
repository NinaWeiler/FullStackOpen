interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (trainingPeriod: Array<number>, target: number): Result => {
    let rating
    let ratingDescription
    const trainingDays = trainingPeriod.filter(p => p > 0)
    const average = trainingPeriod.reduce((a, b) => a + b) / trainingPeriod.length
    const success = (average >= target) ? true : false
    if (success) {
        rating = 3
        ratingDescription = 'Well done, you reached your target'
    } else if ((target - average) < 0.5) {
        rating = 2
        ratingDescription = 'You nearly reached your target'
    } else {
        rating = 1
        ratingDescription = 'You have some catching up to do'
    }

    return {
        periodLength: trainingPeriod.length,
        trainingDays: trainingDays.length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))