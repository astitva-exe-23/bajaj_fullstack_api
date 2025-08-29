app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        const fullName = "Astitva Singh";
        const dob = "10032004"; // <-- TODO: REPLACE THIS WITH YOUR DOB
        const email = "astitva.singh2022b@vitstudent.ac.in";
        const rollNumber = "22BCE3624";
        
        // FIX 1: Changed comma to underscore
        const userId = `${fullName.toLowerCase().replace(" ", "_")}_${dob}`;

        let oddNumbers = [];
        let evenNumbers = [];
        let alphabets = [];
        let specialCharacters = [];
        let sum = 0;
        let alphaString = "";

        data.forEach(item => {
            if (isNaN(item)) {
                // FIX 2: Corrected the check for alphabets
                if (/^[a-zA-Z]+$/.test(item)) {
                    alphabets.push(item.toUpperCase());
                    alphaString += item;
                } else {
                    specialCharacters.push(item);
                }
            } else {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    evenNumbers.push(item.toString());
                } else {
                    oddNumbers.push(item.toString());
                }
            }
        });
        
        const reversedAlpha = alphaString.split('').reverse().join('');
        let concatString = "";
        for (let i = 0; i < reversedAlpha.length; i++) {
            if (i % 2 === 0) {
                concatString += reversedAlpha[i].toUpperCase();
            } else {
                concatString += reversedAlpha[i].toLowerCase();
            }
        }

        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ is_success: false, error: error.message });
    }
});