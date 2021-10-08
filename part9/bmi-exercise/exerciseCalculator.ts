interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number
    ratingDescription: string,
    target: number,
    average: number
}

interface Arguments {
    target: number, 
    trainingPeriod: Array<number>
}

const calculateExercises = (target: number, trainingPeriod: Array<number>): Result => {
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

const parseValues = (args: Array<string>): Arguments => {
    if (args.length < 4) throw new Error('Not enough values');
    
    let hours = []
    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers')
        } else {
            hours.push(Number(args[i]))
        }
    }
    return {
        target: hours.shift(),
        trainingPeriod: hours
    }
}

try {
    let input = parseValues(process.argv)
    console.log(calculateExercises(input.target, input.trainingPeriod))
} catch (e) {
    console.log('Error calculating exercises')
}
