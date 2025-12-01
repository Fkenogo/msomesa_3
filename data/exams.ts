
import { Exam, Question } from '../types';

const examQuestions: Record<string, Question[]> = {
    'ple-m-15': [
        {
            id: 'ple-m-15-1',
            questionNumber: 1,
            text: '',
            parts: [{
                id: 'ple-m-15-1-a',
                text: 'Work out: 124 - 45',
                marks: 2,
                answer: '79',
                explanation: `Step-by-Step Explanation:\nLet's solve 124 minus 45 together, one step at a time.\nStep 1: Write the numbers in column form, lining up the digits:\n   124\n-   45\n------\nStep 2: Start with the units (ones) column. 4 minus 5. But 4 is less than 5, so we need to borrow.\nStep 3: Borrow 1 from the tens column in 124. The 2 in the tens place becomes 1, and the 4 in the ones place becomes 14.\nStep 4: Now subtract the ones: 14 - 5 = 9.\nStep 5: Move to the tens column. Now we have 1 (after borrowing) minus 4. But 1 is less than 4, so we need to borrow from the hundreds column.\nStep 6: Borrow 1 from the hundreds column. The 1 in the hundreds place becomes 0, and the 1 in the tens place becomes 11.\nStep 7: Now subtract the tens: 11 - 4 = 7.\nStep 8: Move to the hundreds column. 0 - 0 = 0.\nStep 9: Put it all together. So, the answer is 79.`
            }]
        },
        {
            id: 'ple-m-15-2',
            questionNumber: 2,
            text: '',
            parts: [{
                id: 'ple-m-15-2-a',
                text: 'Write in figures: Eighty thousand, ten.',
                marks: 2,
                answer: '80,010',
                explanation: `Step-by-Step Explanation:\nLet's turn the words into numbers.\nStep 1: "Eighty thousand” means 80,000.\nStep 2: "Ten” means 10.\nStep 3: Add the two numbers together: 80,000 + 10 = 80,010.\nStep 4: So, the number in figures is 80,010.`
            }]
        },
        {
            id: 'ple-m-15-3',
            questionNumber: 3,
            text: '',
            parts: [{
                id: 'ple-m-15-3-a',
                text: 'Simplify: 18x - 5(3x + 7)',
                marks: 2,
                answer: '3x - 35',
                explanation: `Step-by-Step Explanation:\nLet's simplify this algebraic expression step by step.\nStep 1: Look at the part inside the brackets: (3x + 7).\nStep 2: Multiply everything inside the brackets by -5.\n-5 × 3x = -15x\n-5 × 7 = -35\nStep 3: Rewrite the expression with these new terms: 18x - 15x - 35\nStep 4: Now, combine like terms (the x terms): 18x - 15x = 3x\nStep 5: So, the simplified expression is: 3x - 35`
            }]
        },
        {
            id: 'ple-m-15-4',
            questionNumber: 4,
            text: 'Given that set K = {g, m, v, z}, find the number of subsets in set K.',
            parts: [{
                id: 'ple-m-15-4-a',
                text: '',
                marks: 2,
                answer: '16',
                explanation: `Step-by-Step Explanation:\nLet's find out how many subsets a set has.\nStep 1: Count how many elements are in set K. Set K has 4 elements: g, m, v, z.\nStep 2: Use the formula for the number of subsets: Number of subsets = 2^n, where n is the number of elements.\nStep 3: Substitute n = 4: 2^4 = 2 × 2 × 2 × 2\nStep 4: Work it out step by step: 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16\nStep 5: So, set K has 16 subsets.`
            }]
        },
        {
            id: 'ple-m-15-5',
            questionNumber: 5,
            text: 'Work out 7 - 3 on the number line below.',
            imageUrl: 'https://i.ibb.co/hZ0g6cW/Q5-PLE-Maths-2015.png',
            parts: [{
                id: 'ple-m-15-5-a',
                text: '',
                marks: 2,
                answer: '4',
                explanation: `Step-by-Step Explanation:\nLet's use a number line to solve 7 minus 3.\nStep 1: Start at the number 7 on the number line.\nStep 2: Since we are subtracting, move to the left.\nStep 3: Make 1 jump left: 7 → 6. Make 2nd jump left: 6 → 5. Make 3rd jump left: 5 → 4.\nStep 4: After 3 jumps to the left, you land on 4.\nStep 5: So, 7 - 3 = 4.`
            }]
        },
        {
            id: 'ple-m-15-6',
            questionNumber: 6,
            text: '',
            parts: [{
                id: 'ple-m-15-6-a',
                text: 'Find the sum of the 5th and 8th prime numbers.',
                marks: 2,
                answer: '30',
                explanation: `Step-by-Step Explanation:\nLet's find the 5th and 8th prime numbers and add them.\nStep 1: List the prime numbers in order: 2, 3, 5, 7, 11, 13, 17, 19, ...\nStep 2: The 5th prime number is 11. The 8th prime number is 19.\nStep 3: Add them together: 11 + 19 = 30\nStep 4: So, the answer is 30.`
            }]
        },
        {
            id: 'ple-m-15-7',
            questionNumber: 7,
            text: '',
            parts: [{
                id: 'ple-m-15-7-a',
                text: 'Work out: 14/15 ÷ 2/5',
                marks: 2,
                answer: '7/3 or 2 1/3',
                explanation: `Step-by-Step Explanation:\nLet's divide these fractions step by step.\nStep 1: Write the problem: 14/15 ÷ 2/5\nStep 2: To divide by a fraction, multiply by its reciprocal. The reciprocal of 2/5 is 5/2.\nStep 3: Change the division to multiplication: 14/15 × 5/2\nStep 4: Multiply the numerators: 14 × 5 = 70\nStep 5: Multiply the denominators: 15 × 2 = 30\nStep 6: Write the new fraction: 70/30\nStep 7: Simplify the fraction. Both 70 and 30 can be divided by 10: 70 ÷ 10 = 7, 30 ÷ 10 = 3. So, 70/30 = 7/3.\nStep 8: As a mixed number: 7 divided by 3 is 2 with a remainder of 1, so it's 2 1/3.`
            }]
        },
        {
            id: 'ple-m-15-8',
            questionNumber: 8,
            text: 'A birthday party started at 4:30 p.m. and lasted 2 and 3/4 hours. At what time did the party end?',
            parts: [{
                id: 'ple-m-15-8-a',
                text: '',
                marks: 2,
                answer: '7:15 p.m.',
                explanation: `Step-by-Step Explanation:\nLet's add the time step by step.\nStep 1: The party starts at 4:30 p.m.\nStep 2: The party lasts 2 and 3/4 hours. First, add the 2 hours: 4:30 + 2 hours = 6:30 p.m.\nStep 3: Now, add 3/4 of an hour. 3/4 of an hour is 45 minutes (because 1 hour = 60 minutes, and 60 × 3/4 = 45).\nStep 4: Add 45 minutes to 6:30 p.m.: 6:30 + 45 minutes = 7:15 p.m.\nStep 5: So, the party ended at 7:15 p.m.`
            }]
        },
        {
            id: 'ple-m-15-9',
            questionNumber: 9,
            text: 'Show all the lines of folding symmetry in the figure below.',
            imageUrl: 'https://i.ibb.co/L95s219/Q9-PLE-Maths-2015.png',
            parts: [{
                id: 'ple-m-15-9-a',
                text: '',
                marks: 2,
                answer: '2 lines of folding symmetry',
                explanation: `Step-by-Step Explanation:\nLet's find the lines of symmetry.\nStep 1: A line of symmetry divides a shape into two matching parts.\nStep 2: Look at the shape and imagine folding it vertically (up and down). If both sides match, that's one line of symmetry.\nStep 3: Now, imagine folding it horizontally (side to side). If the top and bottom match, that's another line of symmetry.\nStep 4: In this figure, there are 2 lines where you can fold the shape and both halves will match exactly.\nStep 5: So, the answer is 2 lines of folding symmetry.`
            }]
        },
        {
            id: 'ple-m-15-10',
            questionNumber: 10,
            text: 'A trader sold a pair of shoes at sh32,800 making a profit of sh1,200. What was the cost price of the pair of shoes?',
            parts: [{
                id: 'ple-m-15-10-a',
                text: '',
                marks: 2,
                answer: 'sh31,600',
                explanation: `Step-by-Step Explanation:\nLet's find the cost price step by step.\nStep 1: The selling price is sh32,800.\nStep 2: The profit is sh1,200.\nStep 3: The cost price is the original price before profit. Cost price = Selling price - Profit\nStep 4: Subtract the profit from the selling price: 32,800 - 1,200 = 31,600\nStep 5: So, the cost price was sh31,600.`
            }]
        },
        {
            id: 'ple-m-15-11',
            questionNumber: 11,
            text: 'In a car park there are 192 cars. The probability that a car picked at random from the park is made in Japan is 5/8. How many cars are not made in Japan?',
            parts: [{
                id: 'ple-m-15-11-a',
                text: '',
                marks: 2,
                answer: '72',
                explanation: `Step-by-Step Explanation:\nLet's solve this probability problem step by step.\nStep 1: Total number of cars = 192\nStep 2: Probability a car is made in Japan = 5/8\nStep 3: To find the number of Japanese cars: Number of Japanese cars = (5/8) × 192\nStep 4: First, divide 192 by 8: 192 ÷ 8 = 24\nStep 5: Now, multiply by 5: 24 × 5 = 120\nStep 6: So, there are 120 cars made in Japan.\nStep 7: To find the number of cars not made in Japan: Total cars - Japanese cars = 192 - 120 = 72\nStep 8: So, 72 cars are not made in Japan.`
            }]
        },
        {
            id: 'ple-m-15-12',
            questionNumber: 12,
            text: 'How many packets of 200 grammes can be got from 2.6 kilogrammes of salt?',
            parts: [{
                id: 'ple-m-15-12-a',
                text: '',
                marks: 2,
                answer: '13',
                explanation: `Step-by-Step Explanation:\nLet's work this out step by step.\nStep 1: 1 kilogram = 1,000 grams\nStep 2: 2.6 kilograms = 2.6 × 1,000 = 2,600 grams\nStep 3: Each packet is 200 grams.\nStep 4: To find the number of packets: Number of packets = Total grams ÷ grams per packet\nStep 5: Divide: 2,600 ÷ 200 = 13\nStep 6: So, you can get 13 packets of 200 grams each.`
            }]
        },
        {
            id: 'ple-m-15-13',
            questionNumber: 13,
            text: 'Given that a = -2, b = 3 and c = 4, find the value of b(a² + c)',
            parts: [{
                id: 'ple-m-15-13-a',
                text: '',
                marks: 2,
                answer: '24',
                explanation: `Step-by-Step Explanation:\nLet's substitute the values and solve step by step.\nStep 1: Write the expression: b(a² + c)\nStep 2: Substitute the values: a = -2, b = 3, c = 4\nStep 3: Find a²: a² = (-2) × (-2) = 4\nStep 4: Add c: a² + c = 4 + 4 = 8\nStep 5: Multiply by b: b × (a² + c) = 3 × 8 = 24\nStep 6: So, the value is 24.`
            }]
        },
        {
            id: 'ple-m-15-14',
            questionNumber: 14,
            text: 'Work out: 1101₂ + 111₂',
            parts: [{
                id: 'ple-m-15-14-a',
                text: '',
                marks: 2,
                answer: '10100₂',
                explanation: `Step-by-Step Explanation:\nThis is addition in binary (base 2). Let's add the numbers just like we do in decimal, but remember: in binary, 1 + 1 = 10 (which is 0, carry 1).\nStep 1: Line up the numbers:\n  1101\n+ 0111\n-------\nStep 2: Add from right to left:\n- Rightmost column: 1 + 1 = 10 (write 0, carry 1).\n- Next column: 0 + 1 + carried 1 = 10 (write 0, carry 1).\n- Next column: 1 + 1 + carried 1 = 11 (write 1, carry 1).\n- Next column: 1 + 0 + carried 1 = 10 (write 0, carry 1).\n- If there's a carry left, write it at the front. (write 1).\nStep 3: Write the answer: 10100. So, 1101₂ + 111₂ = 10100₂.`
            }]
        },
        {
            id: 'ple-m-15-15',
            questionNumber: 15,
            text: 'Find the size of angle y in the figure below.',
            imageUrl: 'https://i.ibb.co/2vTfjsj/Q15-PLE-Maths-2015.png',
            parts: [{
                id: 'ple-m-15-15-a',
                text: '',
                marks: 2,
                answer: '80°',
                explanation: `Step-by-Step Explanation:\nStep 1: Find the interior angle adjacent to 130°. Angles on a straight line add up to 180°. So, the interior angle is 180° - 130° = 50°.\nStep 2: The triangle is isosceles (indicated by the marks on the sides). This means the base angles are equal. So, the other base angle is also 50°.\nStep 3: The sum of angles in a triangle is 180°. Angle y + 50° + 50° = 180°.\nStep 4: y + 100° = 180°.\nStep 5: y = 180° - 100° = 80°`
            }]
        },
        {
            id: 'ple-m-15-16',
            questionNumber: 16,
            text: 'The Venn diagram below shows the prime factors of 12 and 18. Find the lowest common multiple (LCM) of 12 and 18.',
            imageUrl: 'https://i.ibb.co/c2V7x0G/Q16-PLE-Maths-2015.png',
            parts: [{
                id: 'ple-m-15-16-a',
                text: '',
                marks: 2,
                answer: '36',
                explanation: `Step-by-Step Explanation:\nTo find the LCM from the Venn diagram, you multiply all the numbers in the diagram.\nStep 1: List the prime factors for each number: 12 = 2 × 2 × 3, 18 = 2 × 3 × 3\nStep 2: The Venn diagram shows the common factors (2 and 3) in the intersection, and the unique factors in the respective circles.\nStep 3: Multiply all the factors together: LCM = 2 × 2 × 3 × 3 = 36\nStep 4: So, the LCM of 12 and 18 is 36.`
            }]
        },
        {
            id: 'ple-m-15-17',
            questionNumber: 17,
            text: 'Find the median of the numbers: 8, 10, 4, 1, 6, 9',
            parts: [{
                id: 'ple-m-15-17-a',
                text: '',
                marks: 2,
                answer: '7',
                explanation: `Step-by-Step Explanation:\nThe median is the middle number when the numbers are arranged in order.\nStep 1: Arrange the numbers from smallest to largest: 1, 4, 6, 8, 9, 10\nStep 2: Count how many numbers there are: There are 6 numbers (an even number).\nStep 3: For an even number of items, the median is the average of the two middle numbers.\nStep 4: The two middle numbers are 6 and 8.\nStep 5: Add them: 6 + 8 = 14\nStep 6: Divide by 2: 14 ÷ 2 = 7\nStep 7: So, the median is 7.`
            }]
        },
        {
            id: 'ple-m-15-18',
            questionNumber: 18,
            text: 'Bbosa has goats and sheep in the ratio 3:2. If he has 24 goats, how many sheep does he have?',
            parts: [{
                id: 'ple-m-15-18-a',
                text: '',
                marks: 2,
                answer: '16 sheep',
                explanation: `Step-by-Step Explanation:\nLet's use the ratio to find the number of sheep.\nStep 1: The ratio of goats to sheep is 3:2.\nStep 2: 3 parts represent 24 goats.\nStep 3: To find the value of 1 part: 24 goats ÷ 3 = 8\nStep 4: Each part is 8 animals.\nStep 5: Sheep are 2 parts: 2 × 8 = 16\nStep 6: So, Bbosa has 16 sheep.`
            }]
        },
        {
            id: 'ple-m-15-19',
            questionNumber: 19,
            text: 'A bucket was full of water. When 4 litres were removed, it became ¾ full. What is the capacity of the bucket?',
            parts: [{
                id: 'ple-m-15-19-a',
                text: '',
                marks: 2,
                answer: '16 litres',
                explanation: `Step-by-Step Explanation:\nLet's call the total capacity of the bucket X litres.\nStep 1: The amount of water removed is the difference in the fraction of the bucket's capacity. The bucket went from full (4/4) to 3/4 full. The change is 4/4 - 3/4 = 1/4.\nStep 2: This 1/4 of the capacity is equal to the 4 litres that were removed. So, (1/4)X = 4 litres.\nStep 3: To find the full capacity (X), multiply both sides by 4: X = 4 × 4 = 16.\nStep 4: So, the bucket holds 16 litres.`
            }]
        },
        {
            id: 'ple-m-15-20',
            questionNumber: 20,
            text: 'In a poultry farm, eggs are packed into boxes which hold 144 eggs. How many boxes are needed to pack 1,008 eggs?',
            parts: [{
                id: 'ple-m-15-20-a',
                text: '',
                marks: 2,
                answer: '7 boxes',
                explanation: `Step-by-Step Explanation:\nLet's find out how many boxes are needed.\nStep 1: Each box holds 144 eggs.\nStep 2: There are 1,008 eggs to pack.\nStep 3: Divide the total eggs by the number of eggs per box: 1,008 ÷ 144\nStep 4: Work out the division: 1,008 ÷ 144 = 7\nStep 5: So, 7 boxes are needed.`
            }]
        },
        {
            id: 'ple-m-15-21',
            questionNumber: 21,
            text: "In a class, 31 pupils play tennis (T) and (d + 5) play volleyball (V) only. d pupils play both games while 3 play neither. If 27 pupils play volleyball altogether:",
            imageUrl: 'https://i.ibb.co/3cYj1j0/Q21-PLE-Maths-2015.png',
            parts: [
                { id: 'ple-m-15-21-a', text: "(a) Use the above information to complete the Venn diagram.", marks: 2, answer: "d in intersection, d+5 in V only, 3 outside", explanation: "The Venn diagram should show 'd+5' in the part for V only, 'd' in the intersection of T and V, and '31-d' in the part for T only (since 31 pupils play Tennis in total), with '3' outside both circles." },
                { id: 'ple-m-15-21-b', text: "(b) Find the value of d.", marks: 2, answer: "11", explanation: "Step-by-Step Explanation:\nLet's solve for d step by step.\nStep 1: The number of pupils who play volleyball altogether is 27.\nStep 2: Pupils who play volleyball = (those who play only volleyball) + (those who play both games).\nStep 3: From the text, Only volleyball = d + 5. Both games = d.\nStep 4: Form the equation: (d + 5) + d = 27\nStep 5: Simplify: 2d + 5 = 27\nStep 6: Subtract 5 from both sides: 2d = 22\nStep 7: Divide both sides by 2: d = 11" }
            ]
        },
        {
            id: 'ple-m-15-22',
            questionNumber: 22,
            text: "",
            parts: [
                { id: 'ple-m-15-22-a', text: "(a) What number has been expanded as (6 x 10³) + (2 x 10¹) + (7 x 10⁰) + (3 x 10⁻²)?", marks: 3, answer: "6027.03", explanation: "Step-by-Step Explanation:\nLet's work out each part and add them.\nStep 1: 6 × 10³ = 6 × 1,000 = 6,000\nStep 2: 2 × 10¹ = 2 × 10 = 20\nStep 3: 7 × 10⁰ = 7 × 1 = 7\nStep 4: 3 × 10⁻² = 3 × 0.01 = 0.03\nStep 5: Add them all together: 6,000 + 20 + 7 + 0.03 = 6,027.03" },
                { id: 'ple-m-15-22-b', text: "(b) Work out (8.5 x 14) + (8.5 x 16)", marks: 2, answer: "255", explanation: "Step-by-Step Explanation:\nLet's use the distributive property to make this easier.\nStep 1: Notice that 8.5 is multiplied by both 14 and 16. So, (8.5 x 14) + (8.5 x 16) = 8.5 x (14 + 16).\nStep 2: Add 14 and 16: 14 + 16 = 30\nStep 3: Now multiply by 8.5: 8.5 × 30\nStep 4: 8.5 × 30 = (8 × 30) + (0.5 × 30) = 240 + 15 = 255" }
            ]
        },
        {
            id: 'ple-m-15-23',
            questionNumber: 23,
            text: "The table below shows the rate at which different currencies were sold and bought in a commercial bank. Use it to answer the questions that follow.",
            table: {
                headers: ["Currency", "Selling in Ug.Sh.", "Buying in Ug.Sh."],
                rows: [
                    ["1 US dollar ($)", "3,600", "3,650"],
                    ["1 Euro (€)", "4,000", "4,020"],
                    ["1 Rwandese franc", "4.0", "5.0"]
                ]
            },
            parts: [
                { id: 'ple-m-15-23-a', text: "(a) How many Euros did Musa get for Ug. Sh. 603,000?", marks: 2, answer: "150 Euros", explanation: "Step-by-Step Explanation:\nTo find out how many Euros Musa can get, we need to see how many times the cost of one Euro fits into his total shillings. When Musa gets Euros, he is 'buying' them from the bank, so the bank is 'selling' them to him. We must use the bank's 'Buying in Ug.Sh.' rate for Euros.\nStep 1: The bank buys 1 Euro for shs. 4,020.\nStep 2: Musa has shs. 603,000.\nStep 3: Divide the total shillings by the cost of 1 Euro: 603,000 ÷ 4,020\nStep 4: Work out the division: 603,000 ÷ 4,020 = 150\nStep 5: So, Musa can get 150 Euros." },
                { id: 'ple-m-15-23-b', text: "(b)Amina came from Rwanda with 109,500 Rwandese francs and exchanged them for US dollars. How many US dollars did she get from the bank?", marks: 3, answer: "150 US dollars", explanation: "Step-by-Step Explanation:\nThis is a two-step conversion.\nStep 1: First, change Rwandese francs to Ugandan shillings. Amina is 'selling' francs to the bank, so the bank is 'buying' them. We use the 'Buying in Ug.Sh.' rate of 5.0 for Rwandese francs.\n109,500 × 5 = 547,500 shillings.\nStep 2: Now, use these shillings to get US dollars. Amina is 'buying' dollars from the bank, so the bank is 'selling' them. We use the 'Buying in Ug.Sh.' rate of 3,650 for US dollars.\nStep 3: Divide the total shillings by the cost of 1 US dollar: 547,500 ÷ 3,650\nStep 4: Work out the division: 547,500 ÷ 3,650 = 150\nStep 5: So, Amina gets 150 US dollars." }
            ]
        },
        {
            id: 'ple-m-15-24',
            questionNumber: 24,
            text: "Betty filled container A below with drinking water. She served visitors with the water using cups of size B shown in the diagram. Find the total number of full cups of water she served the visitors. (Use π = 22/7)",
            imageUrl: 'https://i.ibb.co/bJCqT5w/Q24-PLE-Maths-2015.png',
            parts: [{
                id: 'ple-m-15-24-a', text: '', marks: 6, answer: '80 cups', explanation: "Step-by-Step Explanation:\nTo solve this, we need to find the volume of the large container and divide it by the volume of one cup.\nStep 1: Find the volume of container A (a cylinder). The formula for the volume of a cylinder is V = π × r² × h. The diameter is 28 cm, so the radius (r) is half of that, which is 14 cm.\nVolume of A = (22/7) × 14² × 50 = (22/7) × 196 × 50 = 22 × 28 × 50 = 30,800 cm³\nStep 2: Find the volume of one cup (container B). The diameter is 7 cm, so the radius (r) is 3.5 cm.\nVolume of B = (22/7) × 3.5² × 10 = (22/7) × 12.25 × 10 = 22 × 1.75 × 10 = 385 cm³\nStep 3: Divide the total volume of container A by the volume of one cup: 30,800 ÷ 385 = 80\nStep 4: So, Betty served 80 full cups."
            }]
        },
        {
            id: 'ple-m-15-25',
            questionNumber: 25,
            text: 'A fruit seller sold the following number of mangoes in six days: 60,35,40,28, 42 and 35.',
            parts: [
                { id: 'ple-m-15-25-a', text: '(a) What is the modal number of mangoes sold?', marks: 1, answer: '35', explanation: 'The mode is the number that appears most often in a set of data. In the list 60, 35, 40, 28, 42, 35, the number 35 appears twice, while all other numbers appear only once. Therefore, the mode is 35.' },
                { id: 'ple-m-15-25-b', text: '(b) Work out the mean number of mangoes sold.', marks: 2, answer: '40', explanation: 'The mean is the average of the numbers. \nStep 1: Add all the numbers: 60 + 35 + 40 + 28 + 42 + 35 = 240. \nStep 2: Count how many numbers (days) there are: 6. \nStep 3: Divide the total by the number of days: 240 ÷ 6 = 40. \nSo, the mean is 40.' },
                { id: 'ple-m-15-25-c', text: '(c) By the end of the seventh day, the mean number of mangoes sold was 44. How many mangoes were sold on the seventh day?', marks: 2, answer: '68', explanation: 'Step 1: If the mean for 7 days is 44, the total number of mangoes sold over the 7 days is 44 × 7 = 308. \nStep 2: We already know the total for the first 6 days is 240. \nStep 3: To find the number of mangoes sold on the seventh day, subtract the 6-day total from the 7-day total: 308 - 240 = 68.' }
            ]
        },
        {
            id: 'ple-m-15-26',
            questionNumber: 26,
            text: 'In the figure below line AB is parallel to CD. Angle CTV=44° and Angle TQR = 56°. Find:',
            imageUrl: 'https://i.ibb.co/gJF0K2L/Q26-PLE-Maths-2015.png',
            parts: [
                { id: 'ple-m-15-26-a', text: '(a) angle k.', marks: 2, answer: '80°', explanation: 'Angle CTQ and Angle AQT are alternate interior angles, so Angle AQT = 44°. Angles AQT and TQR are on a straight line, but this is not helpful. Instead, consider that angle CTQ and angle RTQ are vertically opposite to angles formed by transversal V. A better method: Angle CTQ = Angle AQT (alternate interior) = 44°. In triangle QTR, the sum of angles is 180°. So k = 180 - 56 - (angle QTR). Angle CTD and Angle RTB are corresponding angles. The angle vertically opposite to CTV (44°) is angle RTD. So, angle QTR + angle RTD + angle g = 180 is not right. Let\'s find angle QTR. The line V is a transversal. Angle CTV = 44. The vertically opposite angle to that is RTD, which is also 44. Since AB is parallel to CD, the interior angles on the same side of the transversal RT add up to 180. So angle BRT + angle RTD = 180. That is not helpful. Let\'s use Z angles. Angle AQR + Angle QRC = 180. Angle AQT = 44 (alternate to CTV). In triangle QTR, the sum of angles is 180. k = 180 - 56 - angle QTR. Let\'s find angle QTR. The angle alternate to TQR (56) is angle QTC. So angle QTC = 56. Angle QTC + angle k + angle CTV = 180 (angles on a straight line). 56 + k + 44 = 180. k + 100 = 180. So k = 80°' },
                { id: 'ple-m-15-26-b', text: '(b) angle g.', marks: 2, answer: '44°', explanation: 'Angle g and Angle TQR (56) are consecutive interior angles, but this is incorrect. Angle g and Angle AQR are consecutive interior angles. A simpler way: Angle BRT and Angle CTV (44°) are corresponding angles. So, Angle BRT = 44°. Angle g and Angle BRT are supplementary angles on the line AB. So g = 180 - 44 = 136°. A different approach: Angle g and Angle QRC are the same. Angle QRC + Angle RQA = 180. Angle RQA = 56. So Angle QRC = 180-56=124. This is wrong. Let\'s re-examine. Angle g is vertically opposite to angle BRT. Angle BRT and angle RTV are alternate interior angles. Angle RTV = angle CTV + angle RTC = 44 + k = 44+80 = 124. This is too complicated. Let\'s find a simpler way. Angle g and angle CQR are alternate interior angles. No. Angle g and Angle RQC are alternate interior angles. No. Angle g is on line AB. The angle vertically opposite to g is angle A R T. Let\'s find angle CRT. In triangle QRT, angles are 56, 80, so angle QTR must be 180 - 56 - 80 = 44. Angle CRT = 180 - 44 = 136. Angle g and angle CRT are alternate interior angles. No. Let\'s try another way. Angle g and Angle RQC are consecutive interior angles. Angle RQC = Angle RQT + TQC = k + alternate angle to TQR(56) = 80+56=136. g + 136 = 180. g=44.' }
            ]
        },
        {
            id: 'ple-m-15-27',
            questionNumber: 27,
            text: "The table below shows how a motor cyclist travelled from town R through towns Q and S to town P. Study and use it to answer the questions that follow.",
            table: {
                headers: ["Town", "Arrival", "Departure"],
                rows: [
                    ["R", "", "9:00 a.m."],
                    ["Q", "9:30 a.m.", "9:42 a.m."],
                    ["S", "10:35 a.m.", "11:10 a.m."],
                    ["P", "1:30 p.m.", ""]
                ]
            },
            parts: [
                { id: 'ple-m-15-27-a', text: '(a) How long did the motor cyclist stay at town S?', marks: 1, answer: '35 minutes', explanation: 'To find the time spent at town S, subtract the arrival time from the departure time. Departure: 11:10 a.m. Arrival: 10:35 a.m. The difference is 35 minutes.' },
                { id: 'ple-m-15-27-b', text: '(b) Find the time the motor cyclist took to travel from town R to town P.', marks: 2, answer: '4 hours 30 minutes', explanation: 'The total time is the difference between the final arrival time at P and the initial departure time from R. Departure from R: 9:00 a.m. Arrival at P: 1:30 p.m. From 9:00 a.m. to 1:00 p.m. is 4 hours. From 1:00 p.m. to 1:30 p.m. is 30 minutes. Total time = 4 hours and 30 minutes.' },
                { id: 'ple-m-15-27-c', text: '(c) If the distance from town R to town P is 180 km, calculate the average speed of the motor cyclist for the whole journey.', marks: 2, answer: '40 km/hr', explanation: 'Average speed = Total distance ÷ Total time. \nDistance = 180 km. \nTime = 4 hours 30 minutes = 4.5 hours. \nAverage speed = 180 km / 4.5 hours = 40 km/hr.' }
            ]
        },
        {
            id: 'ple-m-15-28',
            questionNumber: 28,
            text: 'Madada sold his radio to Aguti at sh 63,000 making a loss of 10%. Aguti later sold the radio to Chebet at a profit of 15%.',
            parts: [
                { id: 'ple-m-15-28-a', text: '(a) Calculate the amount of money Madada paid for the radio.', marks: 3, answer: 'sh 70,000', explanation: 'If Madada made a 10% loss, he sold the radio for 100% - 10% = 90% of the price he paid. So, 90% of the original price is sh 63,000. To find the original price (100%), we calculate (63,000 / 90) * 100 = 70,000. So, Madada paid sh 70,000.' },
                { id: 'ple-m-15-28-b', text: '(b) For how much money did Aguti sell the radio?', marks: 2, answer: 'sh 72,450', explanation: 'Aguti bought the radio for sh 63,000 and sold it at a 15% profit. \nStep 1: Calculate the profit amount: 15% of 63,000 = 0.15 × 63,000 = 9,450. \nStep 2: Add the profit to the buying price: 63,000 + 9,450 = 72,450. So, Aguti sold the radio for sh 72,450.' }
            ]
        },
        {
            id: 'ple-m-15-29',
            questionNumber: 29,
            text: 'Study the figure below and use it to answer the questions that follow.',
            imageUrl: 'https://i.ibb.co/L8yGJj8/Q29-PLE-Maths-2015.png',
            parts: [
                { id: 'ple-m-15-29-a', text: '(a) Calculate the area of the figure.', marks: 3, answer: '69 m²', explanation: 'The figure can be split into a rectangle and a trapezoid, or a rectangle and a triangle. Let\'s split it into a rectangle at the bottom and a smaller rectangle and triangle on top. Rectangle: width = 7m, height = 9m. Area = 7 * 9 = 63 m². Triangle: base = 10m - 7m = 3m, height = 9m - 5m = 4m. Area = 1/2 * 3 * 4 = 6 m². Total Area = 63 + 6 = 69 m²' },
                { id: 'ple-m-15-29-b', text: '(b) Work out the perimeter of the figure.', marks: 3, answer: '36 m', explanation: 'The perimeter is the sum of the lengths of all the outside edges. \nStep 1: One side is missing (the slanted side). It is the hypotenuse of a right triangle with base = 10m - 7m = 3m and height = 9m - 5m = 4m. Using Pythagoras\' theorem (a² + b² = c²), we get 3² + 4² = c², so 9 + 16 = 25 = c². The length of the slanted side is √25 = 5m. \nStep 2: Add all the outside edges: 10m (top) + 5m (slanted) + 5m (right vertical) + 7m (bottom) + 9m (left) = 36m.' }
            ]
        },
        {
            id: 'ple-m-15-30',
            questionNumber: 30,
            text: 'Two taps F and E are connected to a water tank. Tap F can fill the tank in 2 hours while E can empty it in 3 hours. One day when the tank was 1/2 full of water, the taps were opened at the same time. How long did it take to fill the remaining part of the tank?',
            parts: [{
                id: 'ple-m-15-30-a', text: '', marks: 5, answer: '3 hours', explanation: `Step-by-Step Explanation:\nLet's find the combined rate.\nStep 1: Tap F's filling rate is 1/2 tank per hour.\nStep 2: Tap E's emptying rate is 1/3 tank per hour.\nStep 3: The net filling rate is the filling rate minus the emptying rate: 1/2 - 1/3. To subtract, find a common denominator (6): 3/6 - 2/6 = 1/6 tank per hour.\nStep 4: The tank is already half full, so only half of the tank (1/2) needs to be filled.\nStep 5: Time = Amount to fill / Rate = (1/2) / (1/6) = 1/2 × 6/1 = 3 hours.`
            }]
        },
        {
            id: 'ple-m-15-31',
            questionNumber: 31,
            text: 'A geometry set costs half as much as a book. A book costs sh 600 more than a fountain pen. If the total cost of the three items is sh 6,900,find the cost of the geometry set.',
            parts: [{
                id: 'ple-m-15-31-a',
                text: '',
                marks: 4,
                answer: 'sh 1,500',
                explanation: `Step-by-Step Explanation:\nLet's use algebra. Let 'g' be the cost of the geometry set.\nStep 1: Cost of geometry set = g\nStep 2: A book costs twice as much, so cost of book = 2g\nStep 3: A book costs sh 600 more than a fountain pen, so fountain pen = 2g - 600\nStep 4: The total cost is sh 6,900. Add all costs: g + 2g + (2g - 600) = 6,900\nStep 5: Combine like terms: 5g - 600 = 6,900\nStep 6: Add 600 to both sides: 5g = 7,500\nStep 7: Divide by 5: g = 1,500. The cost of the geometry set is sh 1,500.`
            }]
        },
        {
            id: 'ple-m-15-32',
            questionNumber: 32,
            text: 'A plane flew from airport K to airport T on a bearing of 120°.The distance between K and T is 600 km. It then left airport T for airport R on a bearing of 210°. The distance between T and R is 500 km.',
            parts: [
                { id: 'ple-m-15-32-a', text: '(a) Sketch the journey made by the plane.', marks: 1, answer: 'A sketch showing K, T, and R with bearings and distances.', explanation: 'A simple sketch should show a starting point K, a line going southeast to T at about 120°, and from T, a line going southwest to R at about 210°.' },
                { id: 'ple-m-15-32-b', text: '(b) Using a scale of 1 cm to represent 100 km draw an accurate diagram to show the journey made by the plane.', marks: 4, answer: 'An accurate scale drawing.', explanation: 'On paper, you would draw a 6cm line from K at 120°, then from the end of that line (T), you would draw a 5cm line at 210° to find point R.' },
                { id: 'ple-m-15-32-c', text: '(c)Find the bearing of airport R from airport K.', marks: 1, answer: '160°', explanation: 'After making an accurate scale drawing, you draw a line from K to R. Then, using a protractor at K, measure the clockwise angle from the North line to the line KR. The angle should be approximately 160°.' }
            ]
        }
    ]
};

const allPastPapers: Omit<Exam, 'questions' | 'difficulty' | 'explanationPdfUrl'>[] = [
    { id: 'ple-m-15', title: 'Mathematics', subject: 'Mathematics', year: 2015, level: 'PLE', isFree: true, type: 'Past Paper', timeLimit: 150, questionCount: 32, avgScore: 70, description: 'Official UNEB paper for 2015, covering the full curriculum from arithmetic to geometry.' },
    { id: 'ple-m-23', title: 'Mathematics', subject: 'Mathematics', year: 2023, level: 'PLE', isFree: true, type: 'Past Paper', timeLimit: 150, questionCount: 0, avgScore: 65, description: 'The most recent official PLE Mathematics exam.' },
    { id: 'ple-e-23', title: 'English Language', subject: 'English', year: 2023, level: 'PLE', isFree: true, type: 'Past Paper', timeLimit: 120, questionCount: 0, avgScore: 72, description: 'Official PLE English exam focusing on grammar, comprehension, and composition.' },
    { id: 'ple-s-22', title: 'Science', subject: 'Science', year: 2022, level: 'PLE', isFree: true, type: 'Practice Paper', timeLimit: 150, questionCount: 0, avgScore: 68, description: 'Practice exam covering the entire primary science curriculum.' },
    { id: 'ple-sst-22', title: 'Social Studies', subject: 'SST', year: 2022, level: 'PLE', isFree: true, type: 'Practice Paper', timeLimit: 150, questionCount: 0, avgScore: 75, description: 'A comprehensive practice paper for Social Studies and Religious Education.' },
    { id: 'uce-m-23', title: 'Mathematics Paper 1', subject: 'Mathematics', year: 2023, level: 'UCE', isFree: true, type: 'Past Paper', timeLimit: 180, questionCount: 0, avgScore: 55, description: 'Official UCE Mathematics Paper 1 from 2023.' },
    { id: 'uce-p-23', title: 'Physics Paper 2', subject: 'Physics', year: 2023, level: 'UCE', isFree: false, type: 'Past Paper', timeLimit: 150, questionCount: 0, avgScore: 61, description: 'Challenging physics problems from the official 2023 UCE exam.' },
    { id: 'uace-c-22', title: 'Chemistry Paper 1', subject: 'Chemistry', year: 2022, level: 'UACE', isFree: false, type: 'Past Paper', timeLimit: 180, questionCount: 0, avgScore: 58, description: 'UACE Chemistry Paper 1, focusing on physical and inorganic chemistry.' },
    { id: 'uace-b-22', title: 'Biology Paper 2', subject: 'Biology', year: 2022, level: 'UACE', isFree: false, type: 'Past Paper', timeLimit: 180, questionCount: 0, avgScore: 63, description: 'In-depth biological concepts from the official 2022 UACE exam.' },
];

export const mockExams: Exam[] = allPastPapers.map((exam, index) => {
    const questions = examQuestions[exam.id] || [];
    const difficulties: Array<'Easy' | 'Medium' | 'Hard'> = ['Easy', 'Medium', 'Hard'];
    const difficulty = exam.isFree ? 'Easy' : difficulties[index % difficulties.length];
    
    return {
        ...exam,
        difficulty,
        explanationPdfUrl: exam.id === 'ple-m-15' ? 'https://www.unece.org/fileadmin/DAM/stats/documents/ece/ces/2013/1-Methodology.pdf' : undefined,
        questionCount: questions.length,
        questions: questions
    };
});