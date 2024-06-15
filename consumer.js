const {Kafka} = require("kafkajs")

async function run(){
    process.env.KAFKAJS_NO_PARTITIONER_WARNING = "1";
    try {
        const kafka =new Kafka({
            "clientId" : "myapp",
            "brokers" : ["localhost:29092"],
            connectionTimeout: 30000,
        })

        const consumer = kafka.consumer({groupId:"test"});
        console.log("Connecting.....")

        await consumer.connect();
        console.log("Connected!");

        consumer.subscribe({
            topic : "topic-test",
            fromBeginning:true
        })

        await consumer.run({
            eachMessage : async result =>{
                console.log(`RVD msg ${result.message.value} on ${result.partition}`)
            }
        })

    } catch (error) {
       console.error(`Something bad happened ${error}`) 
    }
    finally{
        // process.exit(0);
    }
}

run();