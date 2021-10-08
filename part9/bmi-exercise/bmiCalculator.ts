type Result = string

const calculateBmi = (height: number, weight: number): Result => {
    let bmi = (weight / height / height) * 10000
    if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal (healthy weight)'
    }
    else if (bmi < 18.5) {
        return 'Underweight'
    }
    else if (bmi > 25) {
        return 'Overweight'
    }
    return 'Could not calculate bmi'
}

console.log(calculateBmi(180, 74))
