const {Kafka} = require("kafkajs")

run();
async function run(){
    try
    {
        // Create kafka object so that we can connect to Kafka broker
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["184.72.82.167:9092"]  //Thats the IP of my EC2 server running kafka broker
        })   

        // Create consumer 
        const consumer = kafka.consumer({"groupId": "test"});
        console.log("Connecting ...")
        await consumer.connect()
        console.log("Connected!!")

        await consumer.subscribe({
            "topic": "Employees",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received msg ${result.message.value} on partition ${result.partition}`)
            }
        })

    }
    catch(ex){
        console.error(`Something terrible happened ${ex}`)
    }

    finally{}
}