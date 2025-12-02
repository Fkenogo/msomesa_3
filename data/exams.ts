import { Exam, Question } from '../types';

const uceMath2024Questions: Question[] = [
    {
        id: 'uce-m-24-1',
        questionNumber: 1,
        text: `**ITEM 1: School Expenses and Distance**\n\n**Context:**\nYour guardian has a budget of Shs700,000 for your school expenses. To get to the school where your guardian wishes to take you for A-level, your guardian drove 4 km east from your home to the stage and then 8 km north to reach there. However, you realized later that there was a direct route from home to school your guardian could have used.\n\nOn reaching the school, you found out that, the school fees, admission fees and uniform fees are Shs900,000, Shs100,000 and Shs350,000 respectively. The school also offers a bursary of; 60% off school fees, free admission and eighty-seven thousand five hundred shillings off uniform fees to those who got first grade and according to your results, you qualify for this bursary.\n\nIt also has two payment plans on school fees that the guardians can choose from:\n- Paying in two instalments: two thirds of the school fees at the beginning of the term and the balance at either visitation day or end of term.\n- Paying in three equal instalments: at the beginning of the term, on visitation day and end of term respectively.`,
        parts: [
            { id: 'uce-m-24-1-a', text: 'How far is it from your home to school if you travel through the direct route?', marks: 4, answer: '8.94 km', answerType: 'numeric', explanation: `**Step 1: Recognize this is a right-angled triangle problem**
*   The journey creates a right-angled triangle.
*   Distance East = **4 km** (one side)
*   Distance North = **8 km** (other side)
*   The direct route is the **hypotenuse**.

**Step 2: Apply Pythagoras theorem**
*   The theorem states **a² + b² = c²**.
*   In this case, (Direct distance)² = 4² + 8².

**Step 3: Calculate**
*   (Direct distance)² = 16 + 64
*   (Direct distance)² = **80**

**Step 4: Find the square root**
*   Direct distance = √80
*   Direct distance ≈ **8.94 km**` },
            { id: 'uce-m-24-1-b-i', text: 'Since you qualify for the bursary, how much will you pay?', marks: 5, answer: 'Shs 622,500', answerType: 'numeric', explanation: `**Step 1: Calculate discounted school fees**
*   Original school fees = Shs 900,000
*   Discount = 60% off
*   Amount to pay = (100% - 60%) × 900,000
*   Amount to pay = 40/100 × 900,000
*   School fees after discount = **Shs 360,000**

**Step 2: Calculate uniform fees after discount**
*   Original uniform fees = Shs 350,000
*   Discount = Shs 87,500 off
*   Uniform fees after discount = 350,000 - 87,500
*   Uniform fees after discount = **Shs 262,500**

**Step 3: Calculate admission fees**
*   Admission = **Free (Shs 0)**

**Step 4: Calculate total amount to pay**
*   Total = School fees + Uniform fees + Admission
*   Total = 360,000 + 262,500 + 0
*   Total = **Shs 622,500**` },
            { id: 'uce-m-24-1-b-ii', text: 'Will your guardian afford the school expenses according to his budget?', marks: 2, answer: 'Yes', answerType: 'text', explanation: `**Step 1: Identify the guardian's budget**
*   Budget = **Shs 700,000**

**Step 2: Compare with total expenses**
*   Total expenses needed = **Shs 622,500**
*   Budget available = **Shs 700,000**

**Step 3: Make conclusion**
*   Since **622,500 < 700,000**, the guardian will afford the school expenses.` },
            { id: 'uce-m-24-1-c-i', text: 'How much will those who are to pay school fees of Shs900,000 pay per instalment, according to each of the payment plans?', marks: 4, answer: 'Payment Plan 1: First instalment = Shs 600,000; Second instalment = Shs 300,000. Payment Plan 2: Each instalment = Shs 300,000', answerType: 'text', explanation: `**Payment Plan 1 (Two instalments):**

**Step 1: Calculate first instalment**
*   First instalment = 2/3 of school fees
*   First instalment = 2/3 × 900,000
*   First instalment = **Shs 600,000**

**Step 2: Calculate second instalment**
*   Second instalment = Total - First instalment
*   Second instalment = 900,000 - 600,000
*   Second instalment = **Shs 300,000**

**Payment Plan 2 (Three equal instalments):**

**Step 1: Calculate each instalment**
*   Each instalment = 1/3 of school fees
*   Each instalment = 1/3 × 900,000
*   Each instalment = **Shs 300,000**` },
            { id: 'uce-m-24-1-c-ii', text: 'Which payment plan would you recommend for them and why?', marks: 2, answer: 'Open-ended (Accept either plan with valid reasoning)', answerType: 'open-ended', explanation: `**Option 1: Recommend Payment Plan 2 (Three instalments)**
*   **Reason:** It spreads the payment more evenly throughout the term, making it easier to manage cash flow. Each payment is smaller (**Shs 300,000**) compared to the large first payment in Plan 1 (**Shs 600,000**).

**Option 2: Recommend Payment Plan 1 (Two instalments)**
*   **Reason:** Fewer transactions mean less administrative work. If the guardian has the money available at the beginning, paying more upfront reduces the burden of remembering multiple payment dates.` }
        ]
    },
    {
        id: 'uce-m-24-2',
        questionNumber: 2,
        text: `**ITEM 2: Selling Cows and Goats**\n\n**Context:**\nYou have friends who rear cows and goats. During the festive season, they want to sell at most 10 of their cows and at least 8 of their goats. They also want to ensure that the number of goats they sell are less than twice the number of cows. They also do not want to sell more than 20 animals all together. They wish to maximise sales by selling each goat at Shs200,000 and each cow at Shs1.5 million but they do not know the number of goats and cows to sell to fulfil their wish.`,
        imageUrl: 'https://i.ibb.co/JqjJ04M/feasible-region-graph.png',
        parts: [
            { id: 'uce-m-24-2-a', text: 'Write mathematical statements that show the relation between the cows and goats.', marks: 4, answer: 'Let x = cows, y = goats. Then: x ≥ 0, y ≥ 0, x ≤ 10, y ≥ 8, x + y ≤ 20, y < 2x. Sales = 1,500,000x + 200,000y', answerType: 'open-ended', explanation: `**Step 1: Define variables**
*   Let **x** = number of cows to be sold
*   Let **y** = number of goats to be sold

**Step 2: Translate "at most 10 cows"**
*   **x ≤ 10**

**Step 3: Translate "at least 8 goats"**
*   **y ≥ 8**

**Step 4: Translate "goats less than twice the number of cows"**
*   **y < 2x**

**Step 5: Translate "not more than 20 animals together"**
*   **x + y ≤ 20**

**Step 6: Add non-negativity constraints**
*   You cannot sell a negative number of animals, so **x ≥ 0, y ≥ 0**.

**Step 7: Write objective function for sales**
*   Sales = (Price per cow × number of cows) + (Price per goat × number of goats)
*   **Sales = 1,500,000x + 200,000y**` },
            { id: 'uce-m-24-2-b', text: 'Show the feasible region of the relation on the Cartesian plane.', marks: 5, answer: 'See graph with shaded feasible region', answerType: 'open-ended', explanation: `**Step 1: Draw all constraint lines**
*   Draw **x = 10** (a vertical line passing through 10 on the x-axis).
*   Draw **y = 8** (a horizontal line passing through 8 on the y-axis).
*   Draw **x + y = 20** (a line from (0,20) to (20,0)).
*   Draw **y = 2x** (a line passing through the origin (0,0) with a slope of 2).

**Step 2: Identify the feasible region**
*   The feasible region is the area on the graph that satisfies ALL the inequalities at the same time: **x ≤ 10**, **y ≥ 8**, **x + y ≤ 20**, and **y < 2x**.
*   This is the shaded area bounded by all the constraint lines.` },
            { id: 'uce-m-24-2-c', text: 'Help your friends to determine the maximum amount of money they will possibly make from the sale of cows and goats.', marks: 3, answer: 'Shs 17,000,000 (by selling 10 cows and 10 goats)', answerType: 'text', explanation: `**Step 1: Identify corner points of the feasible region**
*   From the graph, the corner points (vertices) of the shaded feasible region are:
*   **(10, 10)**
*   **(9, 11)**
*   **(8, 12)**
*   **(7, 13)**

**Step 2: Calculate sales at each corner point**
*   Use the sales formula: **Sales = 1,500,000x + 200,000y**
*   **At (10, 10):** Sales = 1,500,000(10) + 200,000(10) = 15,000,000 + 2,000,000 = **Shs 17,000,000**
*   **At (9, 11):** Sales = 1,500,000(9) + 200,000(11) = 13,500,000 + 2,200,000 = **Shs 15,700,000**
*   **At (8, 12):** Sales = 1,500,000(8) + 200,000(12) = 12,000,000 + 2,400,000 = **Shs 14,400,000**
*   **At (7, 13):** Sales = 1,500,000(7) + 200,000(13) = 10,500,000 + 2,600,000 = **Shs 13,100,000**

**Step 3: Compare all values**
*   The maximum sales amount calculated is **Shs 17,000,000**.

**Step 4: State conclusion**
*   Your friends should sell **10 cows and 10 goats** to maximize their sales.` }
        ]
    },
    {
        id: 'uce-m-24-3',
        questionNumber: 3,
        text: `**ITEM 3: School Assembly Time**\n\n**Context:**\nA day school holds a weekly assembly every Monday starting at 8:00 AM. The Head teacher has noticed a trend of learners arriving late for assembly. Since the school gates are opened at 7:30 AM, he decided to collect data from a sample of learners on their arrival times in minutes past 7:30 AM to make an informed decision about the assembly's start time.\n\n**Data collected (minutes past 7:30 AM):** 15, 18, 20, 22, 17, 25, 23, 28, 26, 21, 30, 33, 35, 32, 36, 39, 42, 37, 41, 28, 45, 48, 29, 31, 26, 27, 30, 33, 34, 31, 28, 35, 40, 42, 37, 39, 36, 38, 29, 43, 46, 47, 30, 32, 31, 45, 27, 44, 46, 49, 52, 53, 55, 51, 50, 56, 57, 58, 59, 51`,
        parts: [
            { id: 'uce-m-24-3-a', text: 'Giving a reason, based on calculations using the data collected, suggest the time the assembly should always start.', marks: 3, answer: '8:07 AM (37 minutes after 7:30 AM)', answerType: 'text', explanation: `**Step 1: Organize data into a frequency table**
*   Group the data into class intervals (e.g., 15-19, 20-24) and find the mid-point (x) for each interval.

**Step 2: Calculate the mean**
*   The formula for the mean of grouped data is **Mean = Σfx / Σf**.
*   **Σfx** (sum of the product of frequency and mid-point) = **2220**.
*   **Σf** (total number of students) = **60**.

**Step 3: Calculate the mean value**
*   Mean = 2220 / 60
*   **Mean = 37 minutes**

**Step 4: Interpret the result**
*   The average arrival time is **37 minutes after 7:30 AM**.
*   This translates to **8:07 AM**.

**Step 5: State recommendation with reason**
*   The assembly should start at **8:07 AM** because this is when the average student arrives, ensuring most students can attend from the beginning.` },
            { id: 'uce-m-24-3-b', text: 'The deputy Head teacher advised the Head teacher to always start the assembly when at least 75% of the students are present. Based on the advise, determine the time the assembly should start.', marks: 3, answer: '8:16 AM (46 minutes after 7:30 AM)', answerType: 'text', explanation: `**Step 1: Understand what 75% means**
*   "At least 75% of students present" means finding the time by which 75% of students have arrived. This is the **75th percentile**.

**Step 2: Calculate the position in the cumulative frequency**
*   Position = (75 / 100) × N (where N is the total number of students)
*   Position = (75 / 100) × 60
*   Position = **45th student**

**Step 3: Find the 75th percentile from an ogive or by calculation**
*   By creating a cumulative frequency table, we find the 45th position falls in the **45-49 minutes** class.
*   Using an ogive (cumulative frequency graph), the value corresponding to the 45th student is **46 minutes**.

**Step 4: Convert to actual time**
*   46 minutes after 7:30 AM is **8:16 AM**.

**Step 5: State recommendation**
*   The assembly should start at **8:16 AM** to ensure at least 75% of students are present.` },
            { id: 'uce-m-24-3-c', text: 'If you were the Head teacher, which of the two suggested assembly start times from (a) and (b) would you consider more appropriate and why?', marks: 2, answer: 'Open-ended (Accept either with valid reasoning)', answerType: 'open-ended', explanation: `**Option 1: Choose 8:07 AM (Mean)**
*   **Reason 1:** This is the average arrival time, so it's fair to most students.
*   **Reason 2:** Starting earlier encourages punctuality.

**Option 2: Choose 8:16 AM (75th Percentile)**
*   **Reason 1:** Ensures 75% of students don't miss the assembly start, which is more inclusive.
*   **Reason 2:** Reduces frustration among students who arrive between 8:07 and 8:16.
*   **Reason 3:** Creates a more positive school culture by not penalizing students for circumstances beyond their control.` }
        ]
    },
    {
        id: 'uce-m-24-4',
        questionNumber: 4,
        text: `**ITEM 4: Malaria Survey**\n\n**Context:**\nThe Ministry of Health in Uganda is conducting a survey about the existence of malaria in three districts: A, B and C. The ministry will then come up with control measures if the chance of a person testing positive having visited at least one of the districts is above 50%.\n\n**Survey Results:**\n- 50 people who visited district A tested positive\n- 60 people who visited district B tested positive\n- 40 people who visited district C tested positive\n- 20 people who visited both districts A and B tested positive\n- 10 people who visited districts A and C tested positive\n- 15 people who visited districts B and C tested positive\n- 20 people who only visited district C tested positive\n- 40 people who visited all three districts tested negative`,
        parts: [
            { id: 'uce-m-24-4-a', text: 'Determine the number of people that were tested for malaria by the ministry of health.', marks: 4, answer: '150 people', answerType: 'numeric', explanation: `**Step 1: Let x = number who visited all three districts and tested positive**
*   Use a Venn diagram to organize the data for districts A, B, and C.

**Step 2: Use the information about district C to find x**
*   Total who tested positive in C = (A and C only) + (B and C only) + (All three) + (C only)
*   We know that People who tested positive in C = (10-x) + (15-x) + x + 20
*   **40** = 10 - x + 15 - x + x + 20
*   40 = 45 - x
*   **x = 5** (So, 5 people visited all three districts and tested positive).

**Step 3: Calculate people in A only**
*   n(A only) = Total A - [(A and B only) + (A and C only) + (All three)]
*   n(A only) = 50 - [(20 - 5) + (10 - 5) + 5]
*   n(A only) = 50 - (15 + 5 + 5) = 50 - 25 = **25**

**Step 4: Calculate people in B only**
*   n(B only) = Total B - [(A and B only) + (B and C only) + (All three)]
*   n(B only) = 60 - [(20 - 5) + (15 - 5) + 5]
*   n(B only) = 60 - (15 + 10 + 5) = 60 - 30 = **30**

**Step 5: Calculate total who tested positive**
*   Total positive = (A only) + (B only) + (C only) + (A∩B only) + (A∩C only) + (B∩C only) + (A∩B∩C)
*   Total positive = 25 + 30 + 20 + (20-5) + (10-5) + (15-5) + 5
*   Total positive = 25 + 30 + 20 + 15 + 5 + 10 + 5 = **110**

**Step 6: Add those who tested negative**
*   Total tested = Total positive + Total negative
*   Total tested = 110 + 40 = **150 people**` },
            { id: 'uce-m-24-4-b', text: 'Calculate the probability of a person testing positive having visited at least one of the three districts.', marks: 2, answer: '0.733 or 73.3%', answerType: 'numeric', explanation: `**Step 1: Identify required values from part (a)**
*   Number who tested positive after visiting at least one district = **110**
*   Total number tested = **150**

**Step 2: Apply probability formula**
*   P(positive) = (Number of positive cases) / (Total tested)

**Step 3: Calculate**
*   P = 110 / 150
*   P ≈ **0.733**

**Step 4: Convert to percentage**
*   P = 0.733 × 100%
*   P = **73.3%**` },
            { id: 'uce-m-24-4-c', text: 'Advise the Ministry of health, with a reason based on calculation, whether to come up with control measures or not.', marks: 2, answer: 'Yes, come up with control measures', answerType: 'text', explanation: `**Step 1: Recall the ministry's criterion**
*   Control measures are needed if the probability of testing positive is **> 50%**.

**Step 2: Compare calculated probability with the criterion**
*   Calculated probability = **73.3%**
*   Criterion = **50%**
*   **73.3% > 50%**

**Step 3: State conclusion and give advice**
*   Since the chance of testing positive (73.3%) is significantly higher than the 50% threshold, the Ministry **should come up with control measures**. This indicates a high malaria prevalence in these districts.` }
        ]
    },
    {
        id: 'uce-m-24-5',
        questionNumber: 5,
        text: `**ITEM 5: Journey to Birthday Party**\n\n**Context:**\nYour uncle has offered to drive you to your friend's birthday party. He normally drives his car at an average speed of 50 km/h. The party starts at 2:00 PM.\n\n**Directions:**\n1. From your home, take the north eastern direction and reach the supermarket that is 20 km away.\n2. Then take the road that is south of the supermarket and it will take you 45 minutes to reach the junction.\n3. From the junction, take the southwestern road and drive 25 km to reach the party reception.\nOn reaching the party reception, your friend remembers that there is a direct route from your home to the reception but does not know how long it is.`,
        parts: [
            { id: 'uce-m-24-5-a-i', text: 'Describe the direction of your home from the party reception.', marks: 2, answer: 'N 045° E or North-East 045° (Accept: 045° or Northeast)', answerType: 'text', explanation: `**Step 1: Understand the journey segments**
*   Home to Supermarket: **Northeast (Bearing 045°)**
*   Supermarket to Junction: **South (Bearing 180°)**
*   Junction to Reception: **Southwest (Bearing 225°)**

**Step 2: Understand reverse direction**
*   The question asks for the direction **of Home from the Reception**.
*   This is the reverse of the direction **of the Reception from Home**.
*   By sketching the journey, the direct route from Home to Reception is generally in a Southwesterly direction.

**Step 3: Calculate the reverse bearing**
*   The reverse of a Southwest direction is a **Northeast** direction.
*   Therefore, the direction from Reception to Home is approximately Northeast, or a bearing of **N 045° E**.` },
            { id: 'uce-m-24-5-a-ii', text: 'How far is the party reception from your home using the direct route?', marks: 3, answer: '40.5 km', answerType: 'numeric', explanation: `**Step 1: Calculate distance from supermarket to junction**
*   Speed = 50 km/h
*   Time = 45 minutes = 45/60 hours = 0.75 hours
*   Distance = Speed × Time = 50 × 0.75 = **37.5 km**

**Step 2: Set up a scale drawing**
*   Use a scale, for example: **1 cm = 5 km**.
*   Home to Supermarket: 20 km = **4 cm at 045°**
*   Supermarket to Junction: 37.5 km = **7.5 cm South (180°)**
*   Junction to Reception: 25 km = **5 cm at 225° (Southwest)**

**Step 3: Draw accurately and measure**
*   Draw the journey accurately using a ruler and protractor.
*   Measure the direct distance from the starting point (Home) to the end point (Reception).
*   The direct route on the drawing measures approximately **8.1 cm**.

**Step 4: Convert back to kilometers**
*   Actual distance = Drawing distance × Scale
*   Actual distance = 8.1 × 5 = **40.5 km**` },
            { id: 'uce-m-24-5-b', text: 'What time would you have to leave home for you to reach the party reception on time, if you used the direct route?', marks: 3, answer: '1:11 PM', answerType: 'text', explanation: `**Step 1: Identify given information**
*   Distance = **40.5 km** (from part a(ii))
*   Speed = **50 km/h**
*   Party start time = **2:00 PM**

**Step 2: Calculate travel time**
*   Time = Distance / Speed
*   Time = 40.5 / 50 = **0.81 hours**

**Step 3: Convert travel time to minutes**
*   Time in minutes = 0.81 × 60 minutes
*   Time ≈ **49 minutes**

**Step 4: Calculate departure time**
*   Departure time = Arrival time - Travel time
*   Departure time = 2:00 PM - 49 minutes
*   Departure time = **1:11 PM**` }
        ]
    },
    {
        id: 'uce-m-24-6',
        questionNumber: 6,
        text: `**ITEM 6: Roofing a Building**\n\n**Context:**\nYour neighbour has a building structure that is at a roofing stage with the roof frame installed, as shown in the diagram.`,
        imageUrl: 'https://i.ibb.co/C0wZxqP/roof-frame.png',
        parts: [
            { id: 'uce-m-24-6-a', text: 'Help your neighbour to estimate the amount of money to be borrowed from the bank for either type of iron sheets.\n\n**Roof specifications:**\n- Rectangular base: 20 m by 6 m\n- Ridge board: 14 m (centrally placed)\n- Triangular faces are equilateral\n\n**Iron sheet specifications:**\n- Type A: Shs 33,000 each\n- Type B: Shs 42,000 each\n- Each sheet: length = 10 ft, usable width = 2.623 ft\n- Conversion: 1 ft = 0.3 m\n\n**Discounts:**\n- Type A: 6% discount on every 50 sheets\n- Type B: 10% discount on every 70 sheets', marks: 6, answer: 'Type A: Shs 2,838,000; Type B: Shs 3,444,000', answerType: 'text', explanation: `### PART 1: Calculate total roof area

**Step 1: Calculate area of the two triangular sides**
*   The triangular faces are equilateral with a base of 6 m.
*   Height of triangle = √(6² - 3²) = √(36 - 9) = √27 ≈ **5.196 m**.
*   Area of one triangle = ½ × base × height = ½ × 6 × 5.196 = **15.588 m²**.
*   Area of both triangles = 2 × 15.588 = **31.176 m²**.

**Step 2: Calculate area of the two trapezium sides**
*   The trapezium sides have parallel lengths of 14 m and 20 m.
*   The height of the trapezium is the same as the height of the triangle: **5.196 m**.
*   Area of one trapezium = ½ × h × (a + b) = ½ × 5.196 × (14 + 20) = **88.332 m²**.
*   Area of both trapeziums = 2 × 88.332 = **176.664 m²**.

**Step 3: Calculate total roof area**
*   Total area = Area of triangles + Area of trapeziums
*   Total area = 31.176 + 176.664 = **207.84 m²**.

### PART 2: Calculate number of iron sheets needed

**Step 4: Calculate usable area of one iron sheet**
*   Length = 10 ft = 10 × 0.3 = **3 m**.
*   Width = 2.623 ft = 2.623 × 0.3 = **0.787 m**.
*   Usable area = 3 × 0.787 = **2.361 m²**.

**Step 5: Calculate number of sheets needed**
*   Number of sheets = Total roof area / Usable area per sheet
*   Number of sheets = 207.84 / 2.361 ≈ 88.04
*   Round up to the next whole number: **89 sheets needed**.

### PART 3: Calculate cost for each type

**FOR TYPE A:**
*   **First 50 sheets with 6% discount:**
    *   Cost before discount = 50 × 33,000 = 1,650,000
    *   Discount = 6% of 1,650,000 = 99,000
    *   Cost after discount = 1,650,000 - 99,000 = **1,551,000**
*   **Remaining 39 sheets (no discount):**
    *   Cost = 39 × 33,000 = **1,287,000**
*   **Total for Type A** = 1,551,000 + 1,287,000 = **Shs 2,838,000**

**FOR TYPE B:**
*   **First 70 sheets with 10% discount:**
    *   Cost before discount = 70 × 42,000 = 2,940,000
    *   Discount = 10% of 2,940,000 = 294,000
    *   Cost after discount = 2,940,000 - 294,000 = **2,646,000**
*   **Remaining 19 sheets (no discount):**
    *   Cost = 19 × 42,000 = **798,000**
*   **Total for Type B** = 2,646,000 + 798,000 = **Shs 3,444,000**` },
            { id: 'uce-m-24-6-b', text: 'Give your neighbour advice, with reason(s), on the type of iron sheets to buy.', marks: 2, answer: 'Open-ended (Accept either Type A or Type B with valid reasoning)', answerType: 'open-ended', explanation: `**OPTION 1: Recommend Type A**
*   **Reason 1 (Cost Savings):** Type A is **Shs 606,000 cheaper** than Type B (3,444,000 - 2,838,000).
*   **Reason 2 (Lower Loan Amount):** Borrowing less money means lower interest payments and less financial burden.
*   **Conclusion:** Buy Type A to minimize costs.

**OPTION 2: Recommend Type B**
*   **Reason 1 (Quality):** A higher price often indicates better quality and durability, meaning Type B may last longer and reduce long-term costs.
*   **Reason 2 (Weather Resistance):** More expensive sheets may have better coating against rust and leaks.
*   **Reason 3 (Aesthetics):** Premium sheets may look better and add value to the property.
*   **Conclusion:** Buy Type B for potentially better quality and durability, even though it costs more upfront.` }
        ]
    }
];


const pleScience2000Questions: Question[] = [
    {
        id: 'ple-s-00-1',
        questionNumber: 1,
        text: 'Which substance can exist in all of the three states of matter?',
        parts: [{
            id: 'ple-s-00-1-a',
            text: '',
            marks: 2,
            answer: 'Water',
            explanation: `Let's break this down together! Matter is anything that takes up space and has weight. Everything around us is made up of matter, and matter can exist in three main forms, called "states": solid, liquid, and gas.
- Solid: This is when the particles are packed closely together and don't move around much. Solids have a fixed shape.
- Liquid: Here, the particles are close but can move around each other, so liquids can flow and take the shape of their container.
- Gas: In this state, the particles are far apart and move freely. Gases spread out to fill any space they are in.
Water is a special substance because we see it in all three states in our daily life:
- As a solid, water is called ice (like ice cubes in your drink or frost in the freezer).
- As a liquid, it's the water we drink, bathe with, or see in rivers and lakes.
- As a gas, it's called water vapor or steam (like the mist you see when boiling water).
Most substances don't easily change between all three states at temperatures we experience every day, but water does! That's why water is the best example of a substance that can exist as a solid, liquid, and gas.
Alternative answers: None as common as water, but carbon dioxide (CO2) and iodine can also exist in all three states under certain conditions.`
        }]
    },
    {
        id: 'ple-s-00-2',
        questionNumber: 2,
        text: 'How does a millipede protect itself from danger?',
        parts: [{
            id: 'ple-s-00-2-a',
            text: '',
            marks: 2,
            answer: 'It coils its body.',
            explanation: `Let's think about how animals protect themselves. When a millipede feels threatened, it curls its long body into a tight spiral or coil. This is a clever trick! By coiling up, the millipede protects its softer, more vulnerable underside and presents its harder, tougher outer shell to anything that might want to eat it. This makes it harder for predators to bite or harm it.
Some millipedes have an extra trick—they can release a stinky or even mildly poisonous liquid from their bodies. This liquid can taste bad or irritate the mouth of an animal trying to eat them, making the predator spit them out. But the most common and first line of defense is coiling up.
So, if you see a millipede curl into a spiral, it's just trying to stay safe!
Alternative answers: Some millipedes also release a smelly or toxic fluid to scare away predators.`
        }]
    },
    {
        id: 'ple-s-00-3',
        questionNumber: 3,
        text: 'Why is a mushroom not a true plant?',
        parts: [{
            id: 'ple-s-00-3-a',
            text: '',
            marks: 2,
            answer: 'It does not have chlorophyll and does not manufacture its own food.',
            explanation: `Let's talk about what makes a plant a plant! Most plants have a green substance called chlorophyll. Chlorophyll helps plants make their own food from sunlight, water, and air—a process called photosynthesis.
Mushrooms, however, are not green and don't have chlorophyll. Instead of making their own food, mushrooms get their food by breaking down dead plants and animals. This is why mushrooms are classified as fungi, not plants. They act more like recyclers in nature, helping to break down and clean up dead things.
So, mushrooms are not true plants because they can't make their own food and don't have chlorophyll.
Alternative answers: Mushrooms are fungi, not plants, because they get their food from other things instead of making it themselves.`
        }]
    },
    {
        id: 'ple-s-00-4',
        questionNumber: 4,
        text: 'Why are canine teeth suitable for tearing food?',
        parts: [{
            id: 'ple-s-00-4-a',
            text: '',
            marks: 2,
            answer: 'They are sharp and pointed.',
            explanation: `Let's look at our teeth! We have different types of teeth for different jobs. Canine teeth are the pointy ones next to your front teeth. They are shaped like little fangs—sharp and pointed. This shape helps them to grip and tear food, especially meat. When you bite into something tough, like a piece of meat or an apple, your canine teeth help you cut and tear it apart. Animals like dogs and cats have very big canines because they need to tear meat often.
So, the sharp and pointed shape of canine teeth makes them perfect for tearing food.
Alternative answers: Their shape and position help them grip and tear food.`
        }]
    },
    {
        id: 'ple-s-00-5',
        questionNumber: 5,
        text: 'Give one of the secondary sex characteristics that is common in both adolescent boys and girls.',
        parts: [{
            id: 'ple-s-00-5-a',
            text: '',
            marks: 2,
            answer: 'Growth of pubic hair.',
            explanation: `When children become teenagers, their bodies go through changes called puberty. These changes are called secondary sex characteristics. They are not directly related to having babies, but they show that a person is becoming an adult.
Both boys and girls start to grow hair in new places, like under their arms (armpits) and around their private parts (pubic hair). Another change is that sweat glands become more active, so teenagers may sweat more and sometimes get body odor. These changes happen to both boys and girls, showing that their bodies are growing up.
Alternative answers: Growth of armpit hair, increased sweating, body odor.`
        }]
    },
    {
        id: 'ple-s-00-6',
        questionNumber: 6,
        text: 'How is the function of motor nerves different from those of sensory nerves?',
        parts: [{
            id: 'ple-s-00-6-a',
            text: '',
            marks: 2,
            answer: 'Motor nerves carry impulses from the central nervous system to the body, while sensory nerves carry impulses from the body to the central nervous system.',
            explanation: `Think of your body as a busy city with lots of messages going back and forth. Nerves are like the roads that carry these messages. There are two main types: sensory nerves and motor nerves.
- Sensory nerves are like messengers that bring information from your body (like your skin, eyes, ears) to your brain and spinal cord. For example, if you touch something hot, sensory nerves send a message to your brain saying, "Ouch! That's hot!"
- Motor nerves do the opposite. They carry instructions from your brain and spinal cord out to your muscles and body parts, telling them what to do. So, when your brain decides to move your hand away from something hot, motor nerves carry that message to your muscles.
In short, sensory nerves bring information in, and motor nerves send instructions out.
Alternative Answers: No significant alternatives; this is the main difference.`
        }]
    },
    {
        id: 'ple-s-00-7',
        questionNumber: 7,
        text: 'Why is a dry season most suitable for crop harvesting?',
        parts: [{
            id: 'ple-s-00-7-a',
            text: '',
            marks: 2,
            answer: 'There is enough heat to dry the crops.',
            explanation: `When farmers harvest crops, they want them to be dry so they don't spoil. During the dry season, there is lots of sunshine and little rain. This helps to dry out the crops, like maize or beans, making them easier to store and less likely to rot or grow mold. If crops are harvested during the rainy season, they can get wet and spoil quickly. That's why the dry season is the best time for harvesting.
Alternative Answers: Crops are less likely to rot or get moldy in dry weather.`
        }]
    },
    {
        id: 'ple-s-00-8',
        questionNumber: 8,
        text: 'What is the importance of de-beaking in poultry?',
        parts: [{
            id: 'ple-s-00-8-a',
            text: '',
            marks: 2,
            answer: 'It stops poultry from eating eggs.',
            explanation: `De-beaking means cutting off the sharp tip of a chicken's beak. Chickens sometimes peck at each other or at their own eggs. This can hurt other chickens or break the eggs, which is bad for farmers. By trimming the beak, chickens are less likely to hurt each other or eat the eggs. This helps keep the chickens safe and increases the number of eggs the farmer can collect.
Alternative Answers: It also prevents chickens from injuring each other by pecking.`
        }]
    },
    {
        id: 'ple-s-00-9',
        questionNumber: 9,
        text: 'State any one sign of a dehydrated child.',
        parts: [{
            id: 'ple-s-00-9-a',
            text: '',
            marks: 2,
            answer: 'Sunken eyes.',
            explanation: `Dehydration means the body does not have enough water. When a child is dehydrated, you might notice their eyes look sunken (like they are deeper in the face), their skin may look pale, and their mouth may be dry. They might also have very little urine or cry without tears. These are warning signs that the child needs to drink fluids quickly to stay healthy.
Alternative Answers: Pale body, dry mouth, little or no tears when crying, very little urine.`
        }]
    },
    {
        id: 'ple-s-00-10',
        questionNumber: 10,
        text: 'In the diagram below, burning charcoal was removed from the stove (sigiri) and it was covered by a dry saucepan as shown. After a short time, it stopped burning.',
        imageUrl: 'https://i.ibb.co/Xz9H0cv/PLE-Science-2000-Q10.png',
        parts: [{
            id: 'ple-s-00-10-a',
            text: 'Explain why the charcoal stopped burning.',
            marks: 2,
            answer: 'Oxygen that supports burning was cut off from the burning charcoal.',
            explanation: `For something to burn, it needs three things: heat, fuel, and oxygen. This is called the fire triangle. When you cover burning charcoal with a saucepan, you block the flow of fresh air (oxygen) to the charcoal. Without oxygen, the charcoal cannot keep burning, so the fire goes out. This is why covering a fire can put it out—it removes the oxygen that the fire needs.
Alternative Answers: No significant alternatives; the main reason is lack of oxygen.`
        }]
    },
    {
        id: 'ple-s-00-11',
        questionNumber: 11,
        text: 'Give one sign you would use to identify a compound fracture.',
        parts: [{
            id: 'ple-s-00-11-a',
            text: '',
            marks: 2,
            answer: 'Bone breaks and comes out of the skin.',
            explanation: `A compound fracture is a serious type of broken bone. Normally, when a bone breaks, it stays inside the skin. But in a compound fracture, the broken bone pushes through the skin and can be seen outside the body. This is dangerous because it can lead to bleeding and infection. If you ever see a bone sticking out of someone's skin after an accident, it's a compound fracture and needs urgent medical help.
Alternative Answers: You may also see bleeding and the bone visibly sticking out, but the main sign is the bone breaking through the skin.`
        }]
    },
    {
        id: 'ple-s-00-12',
        questionNumber: 12,
        text: 'Why is the spacing of children important to a family?',
        parts: [{
            id: 'ple-s-00-12-a',
            text: '',
            marks: 2,
            answer: 'It makes it easier to plan for the family.',
            explanation: `Spacing children means having enough time between the birth of one child and the next. This helps parents to give each child enough attention, food, and care. It also helps the mother's body recover before having another baby. When children are spaced out, families can plan better for things like school fees, food, and clothing, making life easier for everyone.
Alternative Answers: It allows parents to provide better care, enough food, and education for each child.`
        }]
    },
    {
        id: 'ple-s-00-13',
        questionNumber: 13,
        text: 'State one external physical feature one would use to identify a cock in poultry.',
        parts: [{
            id: 'ple-s-00-13-a',
            text: '',
            marks: 2,
            answer: 'A cock has a bigger crown (comb) than a hen.',
            explanation: `In chickens, the male is called a cock and the female is a hen. One easy way to tell them apart is by looking at the comb—the red, fleshy part on top of the head. Cocks have much bigger and brighter combs than hens. They also have larger wattles (the fleshy part under the beak) and sometimes more colorful feathers. These features help you quickly spot a cock in a group of chickens.
Alternative Answers: A cock also has a larger wattle (the fleshy part under the beak), brighter feathers, and sometimes longer tail feathers.`
        }]
    },
    {
        id: 'ple-s-00-14',
        questionNumber: 14,
        text: 'What is soil erosion?',
        parts: [{
            id: 'ple-s-00-14-a',
            text: '',
            marks: 2,
            answer: 'Soil erosion is the washing away of topsoil by agents such as wind and running water.',
            explanation: `Soil erosion happens when the top layer of soil, which is rich in nutrients and good for growing plants, is carried away by wind or water. This can happen when it rains heavily or when strong winds blow over bare land. Soil erosion is bad because it removes the best soil for farming, making it harder for plants to grow.
Alternative Answers: No significant alternatives; the main idea is the removal of topsoil by natural forces.`
        }]
    },
    {
        id: 'ple-s-00-15',
        questionNumber: 15,
        text: 'Give a reason why water passes through sandy soil fastest.',
        parts: [{
            id: 'ple-s-00-15-a',
            text: '',
            marks: 2,
            answer: 'Sandy soil has big particles and air spaces.',
            explanation: `Soil is made up of different-sized particles. Sandy soil has large grains with lots of space between them. When you pour water on sandy soil, it quickly runs through these spaces, so the soil doesn't hold water for long. That's why sandy soil dries out faster than clay or loamy soil, which have smaller particles and hold water better.
Alternative Answers: It has large pores that let water flow through quickly.`
        }]
    },
    {
        id: 'ple-s-00-16',
        questionNumber: 16,
        text: 'Alex keeps his left-over food covered. Why does it go bad after some time?',
        parts: [{
            id: 'ple-s-00-16-a',
            text: '',
            marks: 2,
            answer: 'Due to the presence of bacteria.',
            explanation: `Even if you cover food, tiny living things called bacteria can still be present. Bacteria are so small you can't see them, but they can grow on food and make it spoil. They break down the food, causing it to smell bad, change color, or even grow mould. Covering food helps slow down bacteria, but it doesn't stop them completely. That's why food can still go bad after some time.
Alternative Answers: Other germs like fungi (mould) can also spoil food, but bacteria are the main reason.`
        }]
    },
    {
        id: 'ple-s-00-17',
        questionNumber: 17,
        text: 'Give one main difference between plants and animals.',
        parts: [{
            id: 'ple-s-00-17-a',
            text: '',
            marks: 2,
            answer: 'Plants manufacture their food whereas animals do not.',
            explanation: `Plants are special because they can make their own food using sunlight, water, and air. This process is called photosynthesis, and it happens because plants have a green substance called chlorophyll. Animals, on the other hand, cannot make their own food. They have to eat plants or other animals to get energy. So, the main difference is that plants make their own food, but animals must find food to eat.
Alternative Answers: Plants have chlorophyll; animals do not.`
        }]
    },
    {
        id: 'ple-s-00-18',
        questionNumber: 18,
        text: 'Why is carbon dioxide used as a fire extinguisher?',
        parts: [{
            id: 'ple-s-00-18-a',
            text: '',
            marks: 2,
            answer: 'Carbon dioxide does not support burning.',
            explanation: `Fires need oxygen to keep burning. Carbon dioxide (CO2) is a gas that does not help things burn. When you spray CO2 on a fire, it covers the flames and pushes away the oxygen. Without oxygen, the fire goes out. That's why CO2 is used in fire extinguishers, especially for electrical or oil fires.
Alternative Answers: Carbon dioxide is denser than air, so it pushes away oxygen from the fire.`
        }]
    },
    {
        id: 'ple-s-00-19',
        questionNumber: 19,
        text: "Mukasa's baby has these signs: very underweight, always hungry, pot belly, bony face, wasted muscles. What disease is the baby likely to be suffering from?",
        parts: [{
            id: 'ple-s-00-19-a',
            text: '',
            marks: 2,
            answer: 'Kwashiorkor',
            explanation: `Kwashiorkor is a disease caused by not getting enough protein in the diet. It mostly affects young children who don't eat enough foods like beans, milk, eggs, or meat. The signs include a swollen belly (pot belly), thin arms and legs, a bony face, and always feeling hungry. The body's muscles waste away because it doesn't have enough building blocks (protein) to stay healthy.
Alternative Answers: No significant alternatives for these symptoms; kwashiorkor is the correct answer.`
        }]
    },
    {
        id: 'ple-s-00-20',
        questionNumber: 20,
        text: 'Besides use of seeds, what other part of a flowering plant can be used for propagation?',
        parts: [{
            id: 'ple-s-00-20-a',
            text: '',
            marks: 2,
            answer: 'Stem cutting (such as sweet potatoes), stem tuber (such as Irish potatoes), or leaves (such as bryophyllum).',
            explanation: `Propagation means making new plants from parts of an existing plant. Besides seeds, you can use other parts like stems, roots, or leaves. For example, you can plant a piece of sweet potato stem or a potato tuber, and it will grow into a new plant. Some plants, like bryophyllum, can even grow from their leaves. This is a way for farmers to grow more plants quickly and easily.
Alternative Answers: Roots (like cassava), bulbs (like onions), and runners (like strawberries) can also be used.`
        }]
    },
    {
        id: 'ple-s-00-21',
        questionNumber: 21,
        text: 'The diagram below shows a chalk box. Find its volume.',
        imageUrl: 'https://i.ibb.co/M7y4BvN/PLE-Science-2000-Q21.png',
        parts: [{
            id: 'ple-s-00-21-a',
            text: '',
            marks: 2,
            answer: '24 cm³',
            explanation: `To find the volume of a box (which is a rectangular prism), you just multiply its length, width, and height. The formula is: Volume = length × width × height.
For this chalk box: Volume = 4 cm × 2 cm × 3 cm = 24 cm³.
Imagine you have a box that is 4 cm long, 2 cm wide, and 3 cm high. If you fill it with little 1 cm cubes, you'd fit 4 in one direction, 2 in another, and 3 in the last direction. So, 4 × 2 × 3 = 24 cubes. That means the box can hold 24 cubic centimeters!
Alternative answers: None; this is the standard way to find the volume of a box.`
        }]
    },
    {
        id: 'ple-s-00-22',
        questionNumber: 22,
        text: 'State one of the characteristics of the objects that float on water.',
        parts: [{
            id: 'ple-s-00-22-a',
            text: '',
            marks: 2,
            answer: 'They are less dense than water.',
            explanation: `Have you ever wondered why some things float and others sink? It's all about density! If an object is less dense than water, it will float. For example, a piece of wood floats, but a stone sinks. That's because wood is less dense than water, while stone is more dense.
Alternative answers: They are light for their size; they displace enough water to support their weight.`
        }]
    },
    {
        id: 'ple-s-00-23',
        questionNumber: 23,
        text: 'Why is the moon not regarded as a star?',
        parts: [{
            id: 'ple-s-00-23-a',
            text: '',
            marks: 2,
            answer: 'It does not give out its own light.',
            explanation: `Stars, like our sun, make their own light. The moon, on the other hand, just reflects sunlight. That's why it shines at night, but it's not a star. If you look at the moon through a telescope, you'll see it's a big ball of rock, not a burning ball of gas like a star.
Alternative answers: The moon reflects light from the sun; stars produce their own light.`
        }]
    },
    {
        id: 'ple-s-00-24',
        questionNumber: 24,
        text: 'How do animals in list A (fish, bird, frog) differ from those in list B (man, whale, bat) as regards reproduction?',
        parts: [{
            id: 'ple-s-00-24-a',
            text: '',
            marks: 2,
            answer: 'Animals in list A reproduce by laying eggs, while animals in list B produce live young ones.',
            explanation: `Some animals lay eggs, and the babies hatch out later. Others, like humans and most mammals, give birth to live babies. For example, a frog lays eggs in water, but a bat gives birth to a baby bat. That's a big difference in how they start life!
Alternative answers: Some fish and frogs lay eggs in water, while mammals (like man, whale, bat) give birth to live babies.`
        }]
    },
    {
        id: 'ple-s-00-25',
        questionNumber: 25,
        text: 'How are animals in list A similar to those in list B?',
        parts: [{
            id: 'ple-s-00-25-a',
            text: '',
            marks: 2,
            answer: 'They are all vertebrates.',
            explanation: `Vertebrates are animals with backbones. Fish, birds, frogs, humans, whales, and bats all have a backbone running down their back. That's what makes them vertebrates, even though they look very different!
Alternative answers: They all have backbones.`
        }]
    },
    {
        id: 'ple-s-00-26',
        questionNumber: 26,
        text: 'What is the source of energy in thermal electricity?',
        parts: [{
            id: 'ple-s-00-26-a',
            text: '',
            marks: 2,
            answer: 'Fuel',
            explanation: `Thermal electricity is made by burning something (like coal or oil) to make heat. The heat is used to boil water, which makes steam, and the steam turns a machine called a turbine to make electricity. So, the energy comes from the fuel that is burned.
Alternative answers: Coal, oil, gas, or any material that can be burned to produce heat.`
        }]
    },
    {
        id: 'ple-s-00-27',
        questionNumber: 27,
        text: 'Give one way in which friction is useful to a person riding a bicycle.',
        parts: [{
            id: 'ple-s-00-27-a',
            text: '',
            marks: 2,
            answer: 'Slows down the speed of the bicycle during braking.',
            explanation: `Friction is the force that stops things from sliding. When you press the brakes on a bicycle, friction between the brake pads and the wheels slows you down. Friction between the tires and the road also helps you stay upright and not slip, especially when turning.
Alternative answers: Helps the tires grip the road so the bicycle doesn't slip.`
        }]
    },
    {
        id: 'ple-s-00-28',
        questionNumber: 28,
        text: 'Josephine could only read her notes when the book was at a distance of not more than one metre from her eyes. What advice would you give Josephine?',
        parts: [{
            id: 'ple-s-00-28-a',
            text: '',
            marks: 2,
            answer: 'Use a concave lens spectacle to correct her short-sighted defect.',
            explanation: `If someone can see things up close but not far away, they are short-sighted (myopic). Concave lenses help focus distant objects onto the retina so they can see clearly. It's important to get the right glasses from an eye doctor!
Alternative answers: Visit an eye doctor (optician) for proper glasses.`
        }]
    },
    {
        id: 'ple-s-00-29',
        questionNumber: 29,
        text: 'In the diagram, Moses is pulling a load on the ground surface, as shown below.',
        imageUrl: 'https://i.ibb.co/nMS3k2K/PLE-Science-2000-Q29.png',
        parts: [{
            id: 'ple-s-00-29-a',
            text: 'How could Moses make his work easier?',
            marks: 2,
            answer: 'By using rollers.',
            explanation: `Pulling a heavy load on the ground is hard because of friction. If you put rollers (like round sticks or pipes) under the load, it rolls instead of slides, making it much easier to move. That's why cars and carts have wheels!
Alternative answers: Use wheels, reduce friction by using a smooth surface.`
        }]
    },
    {
        id: 'ple-s-00-30',
        questionNumber: 30,
        text: 'What is the First Aid for high fever?',
        parts: [{
            id: 'ple-s-00-30-a',
            text: '',
            marks: 2,
            answer: 'Sponging with wet lukewarm cloth.',
            explanation: `If someone has a high fever, you can help cool them down by wiping their skin with a cloth dipped in lukewarm (not cold!) water. This helps bring the temperature down gently. It's also important to give them water to drink and see a doctor if the fever doesn't go away.
Alternative answers: Give the person plenty of fluids, keep them cool, seek medical help if the fever is very high.`
        }]
    },
    {
        id: 'ple-s-00-31',
        questionNumber: 31,
        text: 'In terms of machines, how is the hammer similar to the human arm?',
        parts: [{
            id: 'ple-s-00-31-a',
            text: '',
            marks: 2,
            answer: 'Both make work easy.',
            explanation: `A hammer is a simple machine called a lever. Your arm is also like a lever! Both help you do work more easily. For example, a hammer helps you pull out nails with less effort, and your arm helps you lift things. Machines and body parts often work in similar ways to make tasks easier.
Alternative answers: Both act as levers to help lift or move things.`
        }]
    },
    {
        id: 'ple-s-00-32',
        questionNumber: 32,
        text: 'What should be done to a clinical thermometer before taking the temperature of a person?',
        parts: [{
            id: 'ple-s-00-32-a',
            text: '',
            marks: 2,
            answer: 'It should be shaken to take the mercury back to the bulb.',
            explanation: `A clinical thermometer has a thin column of mercury inside. After it's used, the mercury might still be high from the last reading. Shaking the thermometer brings the mercury back down to the bulb, so you get an accurate new reading. Always clean the thermometer before and after use!
Alternative answers: Make sure it is clean and at a lower temperature than the person's body.`
        }]
    },
    {
        id: 'ple-s-00-33',
        questionNumber: 33,
        text: 'How can a child acquire artificial immunity?',
        parts: [{
            id: 'ple-s-00-33-a',
            text: '',
            marks: 2,
            answer: 'Through vaccination.',
            explanation: `Artificial immunity means your body is protected from diseases because you got a vaccine. Vaccines are special medicines that help your body learn how to fight certain germs. When you get vaccinated, your body is ready to protect you if you meet those germs in real life!
Alternative answers: By getting immunization shots.`
        }]
    },
    {
        id: 'ple-s-00-34',
        questionNumber: 34,
        text: 'How does a vent help to reduce smell in a VIP latrine?',
        parts: [{
            id: 'ple-s-00-34-a',
            text: '',
            marks: 2,
            answer: 'It allows the air to flow through, taking bad smell with it outside.',
            explanation: `A VIP latrine has a vent pipe that goes from the toilet pit up above the roof. Smelly air rises and escapes through the pipe, so the bad smell doesn't stay inside. Sometimes, a mesh is put on top to keep flies out, too!
Alternative answers: The vent pipe lets smelly air escape above the latrine, away from people.`
        }]
    },
    {
        id: 'ple-s-00-35',
        questionNumber: 35,
        text: 'What is one possible danger of buying drugs from local shops or markets?',
        parts: [{
            id: 'ple-s-00-35-a',
            text: '',
            marks: 2,
            answer: 'May buy expired drugs.',
            explanation: `Buying medicine from places that are not real pharmacies can be risky. The drugs might be old (expired), fake, or not the right kind for your sickness. Taking the wrong medicine can make you sicker or even be dangerous. Always get medicine from a trusted pharmacy or clinic!
Alternative answers: May take the wrong dose, may get fake or unsafe drugs, may not get the right medicine for your illness.`
        }]
    },
    {
        id: 'ple-s-00-36',
        questionNumber: 36,
        text: 'What is near drowning?',
        parts: [{
            id: 'ple-s-00-36-a',
            text: '',
            marks: 2,
            answer: 'Near drowning is when a person swallows water in a water body, becomes unconscious but does not die.',
            explanation: `Near drowning means someone almost drowned but was saved in time. They might have swallowed water and even passed out, but they didn't die. It's very serious and the person needs to see a doctor right away, because water in the lungs can cause problems later.
Alternative answers: Surviving after almost drowning; a person is rescued before dying.`
        }]
    },
    {
        id: 'ple-s-00-37',
        questionNumber: 37,
        text: 'What feature enables a housefly to spread germs?',
        parts: [{
            id: 'ple-s-00-37-a',
            text: '',
            marks: 2,
            answer: 'Hairy body.',
            explanation: `Houseflies have tiny hairs all over their bodies and legs. When they land on dirty things like garbage or poop, germs stick to these hairs. Then, when the fly lands on your food, it leaves the germs behind. That's why it's important to cover food and keep things clean!
Alternative answers: Sticky feet, feeding on dirty things.`
        }]
    },
    {
        id: 'ple-s-00-38',
        questionNumber: 38,
        text: 'Why is budgeting in a family useful?',
        parts: [{
            id: 'ple-s-00-38-a',
            text: '',
            marks: 2,
            answer: 'To prevent over-expenditure.',
            explanation: `Budgeting means planning how to spend money. If a family makes a budget, they can make sure there's enough money for food, school fees, clothes, and even some savings. It helps everyone get what they need and stops the family from running out of money.
Alternative answers: To plan for the needs of the family fairly, to allow saving.`
        }]
    },
    {
        id: 'ple-s-00-39',
        questionNumber: 39,
        text: 'Give one example where bacteria are useful to man.',
        parts: [{
            id: 'ple-s-00-39-a',
            text: '',
            marks: 2,
            answer: 'Bacteria decompose organic wastes to form humus.',
            explanation: `Not all bacteria are bad! Some help break down dead plants and animals, turning them into rich soil called humus. Others live in your stomach and help you digest food or make vitamins. Some bacteria are even used to make foods like yogurt and cheese.
Alternative answers: Bacteria help make vitamin K in the intestines, help in fermentation (like making yogurt or butter).`
        }]
    },
    {
        id: 'ple-s-00-40',
        questionNumber: 40,
        text: 'In the space below, draw a diagram to show self-pollination in a flower.',
        imageUrl: 'https://i.ibb.co/z5pB0vJ/PLE-Science-2000-Q40.png',
        parts: [{
            id: 'ple-s-00-40-a',
            text: '',
            marks: 2,
            answer: 'A drawing is required, but the answer is: pollen moves from the anther to the stigma of the same flower.',
            explanation: `Self-pollination happens when pollen (the powder that helps make seeds) moves from the anther (the part that makes pollen) to the stigma (the part that receives pollen) of the same flower. You can draw a flower and show an arrow from the anther to the stigma to show this process. This helps the plant make seeds even if there are no insects or wind to carry the pollen.
Alternative answers: None; self-pollination always means pollen from the same flower.`
        }]
    },
    {
        id: 'ple-s-00-41',
        questionNumber: 41,
        text: '',
        parts: [
            {
                id: 'ple-s-00-41-a',
                text: '(a) Give two characteristics of insect-pollinated flowers.',
                marks: 2,
                answer: '(i) Brightly colored petals, (ii) They have a strong scent.',
                explanation: `Insect-pollinated flowers are like little advertisements for insects! They have bright colors and strong smells to attract bees, butterflies, and other insects. Some also have sweet nectar as a reward. The sticky stigma helps catch pollen from the insects' bodies. All these features help the flower get pollinated.
Alternative answers: They have nectar, sticky stigma, large petals.`
            },
            {
                id: 'ple-s-00-41-b',
                text: '(b) Why is a moth able to pollinate plants at night?',
                marks: 1,
                answer: 'They detect strong scent from flowers.',
                explanation: `Moths are night-time pollinators. They can smell flowers from far away, even in the dark! Many flowers that open at night have a strong scent to attract moths. Some are also white or pale, which makes them easier to see in the moonlight.
Alternative answers: Moths have good night vision and are attracted to pale or white flowers that are easy to see at night.`
            },
            {
                id: 'ple-s-00-41-c',
                text: '(c) State the difference between self-pollination and cross-pollination.',
                marks: 2,
                answer: 'Self-pollination is the transfer of pollen grains from the anther to the stigma of the same flower, while cross-pollination is the transfer of pollen from the anther of one flower to the stigma of another flower of the same kind.',
                explanation: `Self-pollination is like a flower helping itself—pollen moves within the same flower. Cross-pollination is like sharing—pollen goes from one flower to another. Cross-pollination usually makes stronger plants because it mixes genes from different parents.
Alternative answers: None; this is the standard definition.`
            }
        ]
    },
    {
        id: 'ple-s-00-42',
        questionNumber: 42,
        text: 'The diagram below shows the structure of a kidney. Use it to answer question (a) (b) and (c)',
        imageUrl: 'https://i.ibb.co/GcJt6N1/PLE-Science-2000-Q42.png',
        parts: [
            {
                id: 'ple-s-00-42-a',
                text: '(a) Name the part labelled with letter A in the kidney diagram.',
                marks: 1,
                answer: 'Cortex',
                explanation: `The kidney has different parts. The cortex is the outer layer, where blood is filtered. It's like the skin of the kidney, doing the first step in cleaning your blood.
Alternative answers: None; the cortex is the outer part of the kidney.`
            },
            {
                id: 'ple-s-00-42-b',
                text: '(b) What substance goes through the part labelled C?',
                marks: 1,
                answer: 'Urine',
                explanation: `After the kidney filters your blood, the waste and extra water become urine. This urine travels through tubes (ureters) to the bladder, where it's stored until you pee. Part C is the ureter.
Alternative answers: None; urine is the waste liquid made by the kidneys.`
            },
            {
                id: 'ple-s-00-42-c',
                text: '(c) State any two functions of the kidney that are similar to those of the skin.',
                marks: 2,
                answer: '(i) Removal of urea, (ii) Removal of excess water.',
                explanation: `Your kidneys and skin both help get rid of waste. The kidneys filter out urea (a waste from breaking down protein) and extra water, which you pee out. Your skin also removes some waste and water when you sweat.
Alternative answers: Both help remove waste from the body.`
            }
        ]
    },
    {
        id: 'ple-s-00-43',
        questionNumber: 43,
        text: '',
        parts: [
            {
                id: 'ple-s-00-43-a',
                text: '(a) State any one characteristic of social insects.',
                marks: 1,
                answer: 'Live and move together, such as ants and bees.',
                explanation: `Social insects, like ants and bees, live in big groups called colonies. They work together, help each other, and have special jobs. Some gather food, some protect the group, and some lay eggs.
Alternative answers: Work together in groups, have different roles (like workers, soldiers, queens).`
            },
            {
                id: 'ple-s-00-43-b',
                text: '(b) Give any two characteristics of flowers which attract bees to visit them.',
                marks: 2,
                answer: 'Good scent, brightly colored petals, contains nectar.',
                explanation: `Bees love flowers that smell nice and look bright. The scent and color help bees find the flowers. Nectar is a sweet liquid that bees drink, and while they do, they pick up pollen and help pollinate the flowers.
Alternative answers: Large or open shape, patterns that guide bees to nectar.`
            },
            {
                id: 'ple-s-00-43-c',
                text: '(c) Why is a worker bee not able to reproduce?',
                marks: 1,
                answer: 'They are sterile.',
                explanation: `In a bee colony, only the queen bee lays eggs. Worker bees are female, but their bodies are not made for laying eggs—they are sterile. Their job is to gather food, care for the young, and protect the hive.
Alternative answers: Worker bees do not have developed reproductive organs.`
            }
        ]
    },
    {
        id: 'ple-s-00-44',
        questionNumber: 44,
        text: 'The diagram below is a method of measuring an irregular object. Study it and answer questions that follow.',
        imageUrl: 'https://i.ibb.co/dK5Qz3S/PLE-Science-2000-Q44.png',
        parts: [
            {
                id: 'ple-s-00-44-a',
                text: '(a) Calculate the volume of the stone using the displacement method.',
                marks: 2,
                answer: '20 cm³',
                explanation: `To find the volume of an irregular object like a stone, you can use water displacement. Fill a measuring cylinder with water and note the level (in this case, 25 cm³). Drop in the stone and note the new level (45 cm³). The difference is the volume of the stone.
Volume of stone = volume of water + stone – volume of water without stone = 45 cm³ - 25 cm³ = 20 cm³.
Alternative answers: None; this is the standard method.`
            },
            {
                id: 'ple-s-00-44-b',
                text: '(b) Name the method used to find the volume.',
                marks: 1,
                answer: 'Displacement method',
                explanation: `This method is called the displacement method because the stone “displaces” or pushes aside some water. The amount of water pushed aside is equal to the volume of the stone.
Alternative answers: Water displacement method.`
            }
        ]
    },
    {
        id: 'ple-s-00-45',
        questionNumber: 45,
        text: 'The diagram below is of a burning candle. Use it to answer question(a) (b) and (c).',
        imageUrl: 'https://i.ibb.co/h7WdZJk/PLE-Science-2000-Q45.png',
        parts: [
            {
                id: 'ple-s-00-45-a',
                text: '(a) What two forms of energy are given off at Q (the burning candle)?',
                marks: 2,
                answer: 'Light and heat.',
                explanation: `When a candle burns, it gives off light (so you can see) and heat (it feels warm). That's why candles are used for light and sometimes for warmth.
Alternative answers: None; these are the main forms.`
            },
            {
                id: 'ple-s-00-45-b',
                text: '(b) What gas is supporting the process?',
                marks: 1,
                answer: 'Oxygen',
                explanation: `Fire needs oxygen to keep burning. The air around us has oxygen, which helps the candle flame stay lit.
Alternative answers: None; oxygen is needed for burning.`
            },
            {
                id: 'ple-s-00-45-c',
                text: '(c) What other process in living things produces the same gas as the candle?',
                marks: 1,
                answer: 'Respiration, germination.',
                explanation: `When you breathe, your body uses oxygen and gives out carbon dioxide, just like a burning candle. Plants also give out carbon dioxide when they germinate (start to grow).
Alternative answers: Breathing out (exhalation) in animals and humans.`
            }
        ]
    },
    {
        id: 'ple-s-00-46',
        questionNumber: 46,
        text: 'Use the list of food stuffs given below and answer the following questions: BEANS, RICE, CABBAGE, MILK, ORANGES.',
        parts: [
            {
                id: 'ple-s-00-46-a',
                text: '(a) Give two foodstuffs that are a source of proteins from the list.',
                marks: 2,
                answer: 'Beans, milk.',
                explanation: `Proteins help your body grow and repair itself. Beans and milk are rich in protein. Rice and oranges give you energy and vitamins, but not much protein.
Alternative answers: None from the list; these are the main protein sources.`
            },
            {
                id: 'ple-s-00-46-b',
                text: "(b) How are cabbages useful in one's diet?",
                marks: 1,
                answer: 'Add roughages to prevent constipation.',
                explanation: `Cabbage is a vegetable that gives you roughage (fiber). Fiber helps your stomach and intestines work well, so you don't get constipated. It also has vitamins to keep you healthy.
Alternative answers: Provide vitamins and minerals.`
            },
            {
                id: 'ple-s-00-46-c',
                text: '(c) Why would you regard a list of the foods given above as a balanced diet?',
                marks: 1,
                answer: 'It contains all the necessary food nutrients.',
                explanation: `A balanced diet means eating different kinds of foods so your body gets everything it needs. Beans and milk give protein, rice gives energy, cabbage gives fiber and vitamins, and oranges give vitamin C. Eating all these together keeps you healthy!
Alternative answers: It has proteins, carbohydrates, vitamins, and minerals.`
            }
        ]
    },
    {
        id: 'ple-s-00-47',
        questionNumber: 47,
        text: 'In the diagram below, when the nail was brought nearer to the magnet it was attracted as shown. Use the diagram to answer questions (a) to (d) below.',
        imageUrl: 'https://i.ibb.co/9vY0r9h/PLE-Science-2000-Q47.png',
        parts: [
            {
                id: 'ple-s-00-47-a',
                text: '(a) How does the nail get magnetized when brought near a magnet?',
                marks: 1,
                answer: 'By induction.',
                explanation: `When you bring a nail close to a magnet, the magnet's force makes the tiny particles inside the nail line up in a special way. This turns the nail into a magnet too! This process is called induction. The nail will stay magnetized for a short time, but if you take it away from the magnet, it will lose its magnetism.
Alternative answers: The nail becomes a temporary magnet because the magnet's force lines up the tiny particles inside the nail.`
            },
            {
                id: 'ple-s-00-47-b',
                text: '(b) Name the pole marked L.',
                marks: 1,
                answer: 'North pole.',
                explanation: `Magnets have two ends, called poles: north and south. If the magnet's north pole (N) is facing the nail, the end of the nail closest to the magnet becomes a south pole, and the far end (L) becomes a north pole. This is because opposite poles attract and like poles repel.`
            },
            {
                id: 'ple-s-00-47-c',
                text: '(c) Which other method can be used to magnetize the nail without using a magnet?',
                marks: 1,
                answer: 'Electrical method.',
                explanation: `You can also make a nail into a magnet by wrapping a wire around it and passing electricity through the wire. This is called an electromagnet. The electric current makes a magnetic field, turning the nail into a magnet as long as the current is flowing.
Alternative answers: Stroking method (rubbing the nail with another magnet), but the electrical method is the main alternative.`
            },
            {
                id: 'ple-s-00-47-d',
                text: '(d) Name the type of magnet in (c).',
                marks: 1,
                answer: 'Electromagnet.',
                explanation: `An electromagnet is a magnet that works only when electricity is flowing. It's used in things like electric bells, cranes for lifting metal, and even in some toys!
Alternative answers: None; an electromagnet is a magnet made using electricity.`
            }
        ]
    },
    {
        id: 'ple-s-00-48',
        questionNumber: 48,
        text: '',
        parts: [
            {
                id: 'ple-s-00-48-a',
                text: '(a) What is the use of a First Aid box?',
                marks: 1,
                answer: 'To store First Aid tools.',
                explanation: `A First Aid box is like a little emergency kit. It has things like bandages, plasters, scissors, and medicine. If someone gets hurt, you can quickly find what you need to help them.
Alternative answers: To keep bandages, medicines, and other emergency supplies.`
            },
            {
                id: 'ple-s-00-48-b',
                text: '(b) What is meant by drug abuse?',
                marks: 1,
                answer: "Taking unprescribed drugs that put a person's life in danger.",
                explanation: `Drug abuse means using medicine or drugs in a way that is not safe. This could be taking medicine that wasn't given to you by a doctor, taking too much, or using drugs that are illegal. Drug abuse can make you very sick or even cause death.
Alternative answers: Using drugs in a way that is harmful, taking too much medicine, or using illegal drugs.`
            },
            {
                id: 'ple-s-00-48-c',
                text: '(c) Give any two pieces of advice to a person who is on drug abuse.',
                marks: 2,
                answer: '1. Sensitize him/her on the bad effects of drug abuse. 2. Get activities that can keep him/her busy during free time.',
                explanation: `If someone is abusing drugs, it's important to help them understand the dangers. Keeping busy with sports or hobbies can help them stay away from drugs. Sometimes, they need special help from a doctor or a place called a rehabilitation center, where they can get better.
Alternative answers: Take him/her to a rehabilitation center. Talk to a trusted adult, join a support group, seek counseling.`
            }
        ]
    },
    {
        id: 'ple-s-00-49',
        questionNumber: 49,
        text: 'The diagram below is an illustration of a blood circulation system in a mammal. Study it carefully and use it to answer questions (a), (b) and (c) below.',
        imageUrl: 'https://i.ibb.co/xHqQJj2/PLE-Science-2000-Q49.png',
        parts: [
            {
                id: 'ple-s-00-49-a',
                text: '(a) What body organ does part T represent in the blood circulation diagram?',
                marks: 1,
                answer: 'Heart.',
                explanation: `The heart is like a pump that keeps blood moving around your body. It sends blood to your lungs to get oxygen and then to the rest of your body to deliver that oxygen.
Alternative answers: None; the heart is the main organ that pumps blood.`
            },
            {
                id: 'ple-s-00-49-b',
                text: '(b) What is the difference in the blood carried by blood vessels marked b and c?',
                marks: 1,
                answer: 'b carries deoxygenated blood, whereas c carries oxygenated blood.',
                explanation: `Blood vessels marked b bring blood back to the heart after it has delivered oxygen to the body (so it's low in oxygen). Vessels marked c carry fresh, oxygen-rich blood from the heart to the body.
Alternative answers: b is a vein (to the heart), c is an artery (from the heart).`
            },
            {
                id: 'ple-s-00-49-c',
                text: '(c) Give the difference between an artery and a vein.',
                marks: 1,
                answer: 'Arteries have thick walls, veins have thin walls.',
                explanation: `Arteries are strong and thick because they carry blood under high pressure from the heart. Veins are thinner and have valves to keep blood moving in the right direction as it returns to the heart. Also, arteries carry blood from the heart to the body, while veins carry blood from the body to the heart.
Alternative answers: Arteries have a pulse, veins have valves to stop blood flowing backward.`
            }
        ]
    },
    {
        id: 'ple-s-00-50',
        questionNumber: 50,
        text: 'Complete the table below which shows some diseases and how they are spread among people.',
        table: {
            headers: ["Disease", "How it is spread"],
            rows: [["Gonorrhea", "Having unprotected sex"], ["Rabies", "Infected dog bite"], ["Tetanus", "Through dirty wounds and cuts"], ["Tuberculosis", "Through air by coughing"]]
        },
        parts: [{
            id: 'ple-s-00-50-a',
            text: 'Fill in the table provided.',
            marks: 4,
            answer: 'See table',
            explanation: `Different diseases spread in different ways. Some, like gonorrhea, are spread through sexual contact. Rabies comes from animal bites. Tetanus bacteria enter through cuts, especially if the wound is dirty. Tuberculosis spreads through the air when someone coughs or sneezes.
Alternative answers:
- Gonorrhea: Any sexual contact with an infected person.
- Rabies: Bite or scratch from an infected animal.
- Tetanus: Contact with soil or objects contaminated with the bacteria.
- Tuberculosis: Breathing in droplets from a cough or sneeze.`
        }]
    },
    {
        id: 'ple-s-00-51',
        questionNumber: 51,
        text: '',
        parts: [
            {
                id: 'ple-s-00-51-a',
                text: '(a) What first aid will you give to an accident victim?',
                marks: 2,
                answer: 'Check the person\'s pulse to see if they are alive.',
                explanation: `First aid is the help you give someone before a doctor arrives. Check if they are breathing and have a pulse. If they are bleeding, press on the wound to stop the blood. If a bone is broken, keep it still with a splint (a straight object tied to the limb).
Alternative answers: Stop bleeding. Put a splint on a broken part of the body. Call for help, keep the person calm, do not move them if you think they have a broken bone or neck injury.`
            },
            {
                id: 'ple-s-00-51-b',
                text: '(b) Explain how you will administer first aid for nose bleeding.',
                marks: 2,
                answer: '1. Pinch the nose to stop bleeding. 2. Bend the head forward. 3. Breathe through the mouth.',
                explanation: `If someone's nose is bleeding, pinch the soft part of their nose and have them lean forward. This stops the blood and keeps it from going down their throat. Breathing through the mouth helps them stay calm.
Alternative answers: Apply a cold cloth to the nose, do not tilt the head back.`
            }
        ]
    },
    {
        id: 'ple-s-00-52',
        questionNumber: 52,
        text: '',
        parts: [
            {
                id: 'ple-s-00-52-a',
                text: '(a) Name two agents of soil erosion.',
                marks: 2,
                answer: 'Wind, running water.',
                explanation: `Soil erosion happens when soil is carried away by things like wind and water. Animals and people can also cause erosion by walking or farming on the land.
Alternative answers: Animals, human activities.`
            },
            {
                id: 'ple-s-00-52-b',
                text: '(b) How do trees stop soil erosion?',
                marks: 2,
                answer: '1. They reduce the speed of wind. 2. Their roots hold the soil particles together.',
                explanation: `Trees are like nature's protectors. Their roots hold the soil in place, and their leaves slow down rain and wind, so the soil doesn't wash or blow away.
Alternative answers: Leaves slow down rain, roots make the soil stronger.`
            },
            {
                id: 'ple-s-00-52-c',
                text: '(c) How does tree-cutting in an area lead to soil erosion?',
                marks: 1,
                answer: 'Exposes the soil to agents of soil erosion.',
                explanation: `When trees are cut down, the soil is left bare. Wind and rain can then easily move the soil, causing erosion. That's why it's important to plant trees and protect forests.
Alternative answers: Without trees, wind and rain can easily carry away the soil.`
            }
        ]
    },
    {
        id: 'ple-s-00-53',
        questionNumber: 53,
        text: '',
        parts: [
            {
                id: 'ple-s-00-53-a',
                text: '(a) What is water pollution?',
                marks: 1,
                answer: 'Adding substances to water which make it unsafe for drinking and unable to support life.',
                explanation: `Water pollution happens when dirty things like chemicals, rubbish, or germs get into water. Polluted water can make people and animals sick.
Alternative answers: Contamination of water by harmful chemicals, waste, or germs.`
            },
            {
                id: 'ple-s-00-53-b',
                text: '(b) Suggest any two ways in which a community can improve on a water source.',
                marks: 2,
                answer: '1. Fence it to prevent stray animals from contaminating it. 2. Dig around the water source to keep it clean.',
                explanation: `To keep water clean, communities can put a fence around wells or springs to keep animals out. Digging around the source helps stop dirty water from flowing in.
Alternative answers: Cover the water source, build a proper drainage system.`
            },
            {
                id: 'ple-s-00-53-c',
                text: '(c) Why is borehole water safer to drink than well water?',
                marks: 1,
                answer: "Borehole water is not exposed like a well's water.",
                explanation: `Boreholes are deep holes drilled into the ground, so the water is protected from dirt and germs on the surface. Wells are often open, so things can fall in and make the water dirty.
Alternative answers: Boreholes are deeper and less likely to be contaminated.`
            }
        ]
    },
    {
        id: 'ple-s-00-54',
        questionNumber: 54,
        text: '',
        parts: [
            {
                id: 'ple-s-00-54-a',
                text: '(a) Suggest any two methods that can promote the idea of PHC (Primary Health Care) in a school.',
                marks: 2,
                answer: '1. Regular cleaning of the latrine. 2. Sweeping the compounds.',
                explanation: `Primary Health Care means keeping everyone healthy by preventing sickness. Cleaning toilets, sweeping, and washing dishes all help stop the spread of germs in school.
Alternative answers: Washing plates after food, electing health prefects.`
            },
            {
                id: 'ple-s-00-54-b',
                text: '(b) What element is promoted in PHC?',
                marks: 1,
                answer: 'Sanitation and hygiene.',
                explanation: `PHC is all about keeping things clean and healthy. Sanitation means proper waste disposal, and hygiene means keeping yourself and your surroundings clean.
Alternative answers: Cleanliness, disease prevention.`
            },
            {
                id: 'ple-s-00-54-c',
                text: '(c) Identify any two activities that committees should do in your village.',
                marks: 2,
                answer: '1. Organizing people for immunization. 2. Educating people about health and its advantages.',
                explanation: `Village committees can help keep everyone healthy by teaching about good habits, organizing vaccinations, and making sure there's clean water for everyone.
Alternative answers: Improving the source of clean water, organizing community clean-up sessions.`
            }
        ]
    },
    {
        id: 'ple-s-00-55',
        questionNumber: 55,
        text: "The table below shows part of a child's immunization card. Use it to answer the questions.",
        table: {
            headers: ["", "1", "2", "3"],
            rows: [
                ["BCG", "12/8/88", "", ""],
                ["POLIO", "11/8/88", "16/12/88", "13/01/89"],
                ["DPT", "11/8/88", "16/12/88", "13/01/89"],
                ["MEASLES", "9/5/89", "COMPLETED", ""],
            ]
        },
        parts: [
            {
                id: 'ple-s-00-55-a',
                text: '(a) When was this child born?',
                marks: 1,
                answer: '12/8/88',
                explanation: `The BCG vaccine is usually given right after a baby is born. So, the date of the first BCG shot is the child's birth date.
Alternative answers: The date of the first BCG vaccine, which is given at birth.`
            },
            {
                id: 'ple-s-00-55-b',
                text: '(b) Give a reason to support your answer in (a) above.',
                marks: 1,
                answer: 'BCG is given soon after birth.',
                explanation: `Doctors give the BCG vaccine to protect babies from tuberculosis, and it's given right after birth.
Alternative answers: None; this is the standard reason.`
            },
            {
                id: 'ple-s-00-55-c',
                text: '(c) At what age was the immunization completed?',
                marks: 1,
                answer: '9 months',
                explanation: `The last vaccine (measles) was given on 9/5/89, which is 9 months after birth (12/8/88), so the child's immunization was completed at 9 months old.
Alternative answers: The time between the first and last vaccine dates.`
            },
            {
                id: 'ple-s-00-55-d',
                text: '(d) Give a reason for your answer in (c) above.',
                marks: 1,
                answer: '9 months is the difference between the dates of completion of vaccination and that of commencement of vaccination.',
                explanation: `The child started getting vaccines at birth and finished at 9 months, so the full schedule was completed in that time.
Alternative answers: The immunization schedule is designed to finish by 9 months.`
            }
        ]
    }
];

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
            text: 'A fruit seller sold the following number of mangoes in six days: 60,35,40,28, 42 and 35.',
            parts: [
                { id: 'ple-m-15-24-a', text: '(a) What is the modal number of mangoes sold?', marks: 1, answer: '35', explanation: 'The mode is the number that appears most often in a set of data. In the list 60, 35, 40, 28, 42, 35, the number 35 appears twice, while all other numbers appear only once. Therefore, the mode is 35.' },
                { id: 'ple-m-15-24-b', text: '(b) Work out the mean number of mangoes sold.', marks: 2, answer: '40', explanation: 'The mean is the average of the numbers. \nStep 1: Add all the numbers: 60 + 35 + 40 + 28 + 42 + 35 = 240. \nStep 2: Count how many numbers (days) there are: 6. \nStep 3: Divide the total by the number of days: 240 ÷ 6 = 40. \nSo, the mean is 40.' },
                { id: 'ple-m-15-24-c', text: '(c) By the end of the seventh day, the mean number of mangoes sold was 44. How many mangoes were sold on the seventh day?', marks: 2, answer: '68', explanation: 'Step 1: If the mean for 7 days is 44, the total number of mangoes sold over the 7 days is 44 × 7 = 308. \nStep 2: We already know the total for the first 6 days is 240. \nStep 3: To find the number of mangoes sold on the seventh day, subtract the 6-day total from the 7-day total: 308 - 240 = 68.' }
            ]
        },
        {
            id: 'ple-m-15-25',
            questionNumber: 25,
            text: 'In the figure below line AB is parallel to CD. Angle CTV=44° and Angle TQR = 56°. Find:',
            imageUrl: 'https://i.ibb.co/gJF0K2L/Q26-PLE-Maths-2015.png',
            parts: [
                { id: 'ple-m-15-25-a', text: '(a) angle k.', marks: 2, answer: '80°', explanation: 'Angle CTQ and Angle AQT are alternate interior angles, so Angle AQT = 44°. In triangle QTR, the sum of angles is 180°. So k = 180 - 56 - (angle QTR). Angle CTD and Angle RTB are corresponding angles. The angle vertically opposite to CTV (44°) is angle RTD. So, angle QTR + angle RTD + angle g = 180 is not right. Let\'s find angle QTR. The line V is a transversal. Angle CTV = 44. The vertically opposite angle to that is RTD, which is also 44. Since AB is parallel to CD, the interior angles on the same side of the transversal RT add up to 180. So angle BRT + angle RTD = 180. That is not helpful. Let\'s use Z angles. Angle AQR + Angle QRC = 180. Angle AQT = 44 (alternate to CTV). In triangle QTR, the sum of angles is 180. k = 180 - 56 - angle QTR. Let\'s find angle QTR. The angle alternate to TQR (56) is angle QTC. So angle QTC = 56. Angle QTC + angle k + angle CTV = 180 (angles on a straight line). 56 + k + 44 = 180. k + 100 = 180. So k = 80°' },
                { id: 'ple-m-15-25-b', text: '(b) angle g.', marks: 2, answer: '44°', explanation: 'Angle g and Angle TQR (56) are consecutive interior angles, but this is incorrect. Angle g and Angle AQR are consecutive interior angles. A simpler way: Angle BRT and Angle CTV (44°) are corresponding angles. So, Angle BRT = 44°. Angle g and Angle BRT are supplementary angles on the line AB. So g = 180 - 44 = 136°. A different approach: Angle g and Angle QRC are the same. Angle QRC + Angle RQA = 180. Angle RQA = 56. So Angle QRC = 180-56=124. This is wrong. Let\'s re-examine. Angle g is vertically opposite to angle BRT. Angle BRT and angle RTV are alternate interior angles. Angle RTV = angle CTV + angle RTC = 44 + k = 44+80 = 124. This is too complicated. Let\'s find a simpler way. Angle g and angle RQC are consecutive interior angles. Angle RQC = Angle RQT + TQC = k + alternate angle to TQR(56) = 80+56=136. g + 136 = 180. g=44.' }
            ]
        },
        {
            id: 'ple-m-15-26',
            questionNumber: 26,
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
                { id: 'ple-m-15-26-a', text: '(a) How long did the motor cyclist stay at town S?', marks: 1, answer: '35 minutes', explanation: 'To find the time spent at town S, subtract the arrival time from the departure time. Departure: 11:10 a.m. Arrival: 10:35 a.m. The difference is 35 minutes.' },
                { id: 'ple-m-15-26-b', text: '(b) Find the time the motor cyclist took to travel from town R to town P.', marks: 2, answer: '4 hours 30 minutes', explanation: 'The total time is the difference between the final arrival time at P and the initial departure time from R. Departure from R: 9:00 a.m. Arrival at P: 1:30 p.m. From 9:00 a.m. to 1:00 p.m. is 4 hours. From 1:00 p.m. to 1:30 p.m. is 30 minutes. Total time = 4 hours and 30 minutes.' },
                { id: 'ple-m-15-26-c', text: '(c) If the distance from town R to town P is 180 km, calculate the average speed of the motor cyclist for the whole journey.', marks: 2, answer: '40 km/hr', explanation: 'Average speed = Total distance ÷ Total time. \nDistance = 180 km. \nTime = 4 hours 30 minutes = 4.5 hours. \nAverage speed = 180 km / 4.5 hours = 40 km/hr.' }
            ]
        },
        {
            id: 'ple-m-15-27',
            questionNumber: 27,
            text: 'Madada sold his radio to Aguti at sh 63,000 making a loss of 10%. Aguti later sold the radio to Chebet at a profit of 15%.',
            parts: [
                { id: 'ple-m-15-27-a', text: '(a) Calculate the amount of money Madada paid for the radio.', marks: 3, answer: 'sh 70,000', explanation: 'If Madada made a 10% loss, he sold the radio for 100% - 10% = 90% of the price he paid. So, 90% of the original price is sh 63,000. To find the original price (100%), we calculate (63,000 / 90) * 100 = 70,000. So, Madada paid sh 70,000.' },
                { id: 'ple-m-15-27-b', text: '(b) For how much money did Aguti sell the radio?', marks: 2, answer: 'sh 72,450', explanation: 'Aguti bought the radio for sh 63,000 and sold it at a 15% profit. \nStep 1: Calculate the profit amount: 15% of 63,000 = 0.15 × 63,000 = 9,450. \nStep 2: Add the profit to the buying price: 63,000 + 9,450 = 72,450. So, Aguti sold the radio for sh 72,450.' }
            ]
        },
        {
            id: 'ple-m-15-28',
            questionNumber: 28,
            text: 'Study the figure below and use it to answer the questions that follow.',
            imageUrl: 'https://i.ibb.co/L8yGJj8/Q29-PLE-Maths-2015.png',
            parts: [
                { id: 'ple-m-15-28-a', text: '(a) Calculate the area of the figure.', marks: 3, answer: '69 m²', explanation: 'The figure can be split into a rectangle and a trapezoid, or a rectangle and a triangle. Let\'s split it into a rectangle at the bottom and a smaller rectangle and triangle on top. Rectangle: width = 7m, height = 9m. Area = 7 * 9 = 63 m². Triangle: base = 10m - 7m = 3m, height = 9m - 5m = 4m. Area = 1/2 * 3 * 4 = 6 m². Total Area = 63 + 6 = 69 m²' },
                { id: 'ple-m-15-28-b', text: '(b) Work out the perimeter of the figure.', marks: 3, answer: '36 m', explanation: 'The perimeter is the sum of the lengths of all the outside edges. \nStep 1: One side is missing (the slanted side). It is the hypotenuse of a right triangle with base = 10m - 7m = 3m and height = 9m - 5m = 4m. Using Pythagoras\' theorem (a² + b² = c²), we get 3² + 4² = c², so 9 + 16 = 25 = c². The length of the slanted side is √25 = 5m. \nStep 2: Add all the outside edges: 10m (top) + 5m (slanted) + 5m (right vertical) + 7m (bottom) + 9m (left) = 36m.' }
            ]
        },
        {
            id: 'ple-m-15-29',
            questionNumber: 29,
            text: 'Two taps F and E are connected to a water tank. Tap F can fill the tank in 2 hours while E can empty it in 3 hours. One day when the tank was 1/2 full of water, the taps were opened at the same time. How long did it take to fill the remaining part of the tank?',
            parts: [{
                id: 'ple-m-15-29-a', text: '', marks: 5, answer: '3 hours', explanation: `Step-by-Step Explanation:\nLet's find the combined rate.\nStep 1: Tap F's filling rate is 1/2 tank per hour.\nStep 2: Tap E's emptying rate is 1/3 tank per hour.\nStep 3: The net filling rate is the filling rate minus the emptying rate: 1/2 - 1/3. To subtract, find a common denominator (6): 3/6 - 2/6 = 1/6 tank per hour.\nStep 4: The tank is already half full, so only half of the tank (1/2) needs to be filled.\nStep 5: Time = Amount to fill / Rate = (1/2) / (1/6) = 1/2 × 6/1 = 3 hours.`
            }]
        },
        {
            id: 'ple-m-15-30',
            questionNumber: 30,
            text: 'A geometry set costs half as much as a book. A book costs sh 600 more than a fountain pen. If the total cost of the three items is sh 6,900,find the cost of the geometry set.',
            parts: [{
                id: 'ple-m-15-30-a',
                text: '',
                marks: 4,
                answer: 'sh 1,500',
                explanation: `Step-by-Step Explanation:\nLet's use algebra. Let 'g' be the cost of the geometry set.\nStep 1: Cost of geometry set = g\nStep 2: A book costs twice as much, so cost of book = 2g\nStep 3: A book costs sh 600 more than a fountain pen, so fountain pen = 2g - 600\nStep 4: The total cost is sh 6,900. Add all costs: g + 2g + (2g - 600) = 6,900\nStep 5: Combine like terms: 5g - 600 = 6,900\nStep 6: Add 600 to both sides: 5g = 7,500\nStep 7: Divide by 5: g = 1,500. The cost of the geometry set is sh 1,500.`
            }]
        },
        {
            id: 'ple-m-15-31',
            questionNumber: 31,
            text: 'A plane flew from airport K to airport T on a bearing of 120°.The distance between K and T is 600 km. It then left airport T for airport R on a bearing of 210°. The distance between T and R is 500 km.',
            parts: [
                { id: 'ple-m-15-31-a', text: '(a) Sketch the journey made by the plane.', marks: 1, answer: 'A sketch showing K, T, and R with bearings and distances.', explanation: 'A simple sketch should show a starting point K, a line going southeast to T at about 120°, and from T, a line going southwest to R at about 210°.' },
                { id: 'ple-m-15-31-b', text: '(b) Using a scale of 1 cm to represent 100 km draw an accurate diagram to show the journey made by the plane.', marks: 4, answer: 'An accurate scale drawing.', explanation: 'On paper, you would draw a 6cm line from K at 120°, then from the end of that line (T), you would draw a 5cm line at 210° to find point R.' },
                { id: 'ple-m-15-31-c', text: '(c)Find the bearing of airport R from airport K.', marks: 1, answer: '160°', explanation: 'After making an accurate scale drawing, you draw a line from K to R. Then, using a protractor at K, measure the clockwise angle from the North line to the line KR. The angle should be approximately 160°.' }
            ]
        }
    ],
    'ple-s-00': pleScience2000Questions,
    'uce-m-24': uceMath2024Questions,
};

const allPastPapers: Omit<Exam, 'questions' | 'difficulty' | 'explanationPdfUrl'>[] = [
    { id: 'ple-m-15', title: 'Mathematics', subject: 'Mathematics', year: 2015, level: 'PLE', isFree: true, type: 'Past Paper', timeLimit: 150, questionCount: 32, avgScore: 70, description: 'Official UNEB paper for 2015, covering the full curriculum from arithmetic to geometry.' },
    { id: 'ple-s-00', title: 'Science', subject: 'Science', year: 2000, level: 'PLE', isFree: true, type: 'Past Paper', timeLimit: 135, questionCount: 55, avgScore: 68, description: 'Official UNEB PLE Science paper from the year 2000, covering a wide range of biology, chemistry, and physics topics.' },
    { id: 'uce-m-24', title: 'Mathematics Paper 1', subject: 'Mathematics', year: 2024, level: 'UCE', isFree: false, type: 'Past Paper', timeLimit: 150, questionCount: 6, avgScore: 50, description: 'Official UNEB UCE Mathematics Paper 1 from 2024, focusing on a range of topics from algebra to geometry and statistics.' },
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
