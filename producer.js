const {Kafka} = require("kafkajs")


const msg =process.argv[2];


async function run(){
    try {
        process.env.KAFKAJS_NO_PARTITIONER_WARNING = "1";

        const kafka =new Kafka({
            "clientId" : "myapp",
            "brokers" : ["localhost:29092"],
            connectionTimeout: 30000,
        })

        const producer = kafka.producer();
        console.log("Connecting.....")

        await producer.connect();
        console.log("Connected!");

        const partition = msg[0] < "N" ? 0 : 1

        const result = await producer.send({
            "topic":"topic-test",
            "messages":[
                {
                value: msg,
                partitioner: partition
            }
        ]
        })

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();

    } catch (error) {
       console.error(`Something bad happened ${error}`) 
    }
    finally{
        process.exit(0);
    }
}

run();