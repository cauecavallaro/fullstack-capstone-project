const connectToDatabase = require("../models/db");


router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        // Task 2: use the collection() method to retrieve the gift collection
        // {{insert code here}}
        let collection = await db.collection("gifts");

        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        // const gifts = {{insert code here}}
        let gifts = collection.find({}).toArray();

        // Task 4: return the gifts using the res.json method
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        // Task 2: use the collection() method to retrieve the gift collection
        // {{insert code here}}
        const collection = await db.collection("gifts");


        const id = req.params.id;

        // Task 3: Find a specific gift by ID using the collection.fineOne method and store in constant called gift
        // {{insert code here}}
        let gift = collection.find({id: id}).toArray();

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});



// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
