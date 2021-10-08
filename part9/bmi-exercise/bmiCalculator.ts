type Value = string;
interface CalculateValues {
    height: number,
    weight: number
}

export const calculateBmi = (height: number, weight: number): Value => {
    const bmi = (weight / height / height) * 10000;
    if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal (healthy weight)';
    }
    else if (bmi < 18.5) {
        return 'Underweight';
    }
    else if (bmi > 25) {
        return 'Overweight';
    }
    return 'Could not calculate bmi';
};

const parseArguments = (args: Array<string>): CalculateValues => {
    if (args.length != 4) throw new Error('Example input in cm and kg: 180 60');

    if (!isNaN(Number(args[2])) && (!isNaN(Number(args[3])))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error');
}