const {Kafka} = require("kafkajs")

async function run(){
    try {
        const kafka =new Kafka({
            clientId : "myapp",
            brokers : ["localhost:29092"],
            connectionTimeout: 30000,
        })

        const admin = kafka.admin();
        console.log("Connecting to Kafka broker........")
 
        await admin.connect();
        console.log("Connected to Kafka broker!")

        // const createTopicResult = await admin.createTopics({
        //     "topics" : [{
        //         topic : "testing",
        //         numPartitions : 2,
        //     }]
        // })

        // if (createTopicResult) {
        //     console.log("Created Successfully!");
        // } else {
        //     console.log("Topic already exists or no topic created.");
        // }

        // await admin.disconnect();

    } catch (error) {
       console.error(`Something bad happened ${error}`) 
    }
    finally{
        process.exit(0);
    }
}

run();